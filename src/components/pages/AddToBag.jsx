import React, { useEffect, useRef, useState } from "react";
import addtobagbg from "../../../public/assets/img/addtobagbg.png";
import discoutimg from "../../../public/assets/img/discoutimg.png";
import userAxios from "../../utils/Api/userAxios";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Thankyouimg from "../../../public/assets/img/Thankyouimg.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { formatINRCurrency } from "../../utils/constants";

export default function AddToBag() {
  const { type } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    age: "",
    gender: "",
    pincode: "",
    weight: "",
    height: "",
    chest: "",
    waistCirumference: "",
    neckCirumference: "",
    dietPreference: "",
    workoutPreference: "",
    medicalCanditions: [],
    medicalConditionDescription: "",
    sportInjury: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [thankYouContent, setThankYouContent] = useState({
    title: "Thank You !",
    message:
      "Your order has been placed successfully. We appreciate your support. Your order is being processed — stay tuned for updates!",
    buttonText: "Back to Home",
    redirectUrl: "/",
  });
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [apliedCode, setAppliedCode] = useState("");
  const [isDiscountapplied, setIsDiscountApllied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appliedCouponDetails, setAppliedCouponDetails] = useState("");
  const [discountPrice, setDiscountPrice] = useState(null);
  const [discountGet, setDiscounGet] = useState(0);
  const [appointmentData, setAppointmentData] = useState(null);
  const [ispaymentSuccessfull, setIsPaymentSuccessfull] = useState(false);
  const phoneDefault = useRef("");

  const fetchProfileDetails = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_profile_details);
      const data = res.data.data;
      setFormData((prev) => ({ ...prev, ...data }));
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const fetchCartitems = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_cart_item);
      setCartItems(res.data.data);
      dispatch(authActions.setCartItems(res.data.data));
    } catch (error) {
      setCartItems([]);
      dispatch(authActions.setCartItems([]));
      console.log(error);
    }
  };

  const updateDiscountedPrice = (data) => {
    if (type == "cart") {
      const updatedCartItem = cartItems.map((item) => ({
        ...item,
        ...(data[item.PackagePlan.packageId] || {}),
        discountApplied: data.hasOwnProperty(item.PackagePlan.packageId)
          ? true
          : false,
      }));

      setCartItems(updatedCartItem);
    } else {
      const updatesAppintmentData = {
        ...appointmentData,
        ...(data[appointmentData?.packageId] || {}),
        discountApplied: data.hasOwnProperty(appointmentData?.packageId)
          ? true
          : false,
      };
      setDiscountPrice(data[appointmentData?.packageId]?.discountedAmount);
      setDiscounGet(data[appointmentData?.packageId]?.discountValue);
      setAppointmentData(updatesAppintmentData);
    }
  };

  const applyCoupon = async () => {
    try {
      const body =
        type == "cart"
          ? {
              couponCode: coupon,
              type: "order",
            }
          : {
              couponCode: coupon,
              type: "appointment",
              pid: appointmentData.packageId,
              totalAmount: appointmentData.consultantFees,
            };
      const res = await userAxios.post(userApiRoutes.apply_coupon, body);
      updateDiscountedPrice(res.data.data);
      const firstEntry = Object.entries(res?.data?.data)[0];
      setAppliedCouponDetails(firstEntry[1]?.couponInfo || "");
      setAppliedCode(firstEntry[1]?.couponInfo?.couponCode);
      setIsDiscountApllied(true);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Invalid Coupon"
      );
    }
  };

  console.log(appointmentData);
  const handlePayment = async () => {
    if (type === "cart" && cartItems.length === 0) {
      toast.error("No item in the cart!");
      return;
    }

    if (type === "appointment" && !appointmentData) {
      toast.error("No appointment details found!");
      return;
    }

    // Calculate final amount after discount
    const amountToPay =
      type === "cart"
        ? discountPrice || total
        : discountPrice || appointmentData.consultantFees;

    try {
      setLoading(true);
      const res = await userAxios.post(userApiRoutes.create_order_razorpay, {
        amount: amountToPay,
      });

      const { orderId, amount, currency } = res.data.data;
      const options = {
        key: "rzp_test_ENoX7bkuXjQBZc",
        amount,
        currency,
        name: type === "cart" ? "Smart Health" : "Appointment Booking",
        description: type === "cart" ? "Service Purchase" : "Consultation",
        image: "/assets/img/logo.png",
        order_id: orderId,
        handler: async function (response) {
          const toastId = toast.loading("Please wait...");
          try {
            if (type === "cart") {
              await userAxios.post(userApiRoutes.cart_checkout, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                couponCode: discountPrice ? coupon : undefined,
              });
            } else {
              const payload = {
                ...appointmentData,
                bookingCharge: discountPrice || appointmentData?.bookingCharge,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                couponAppliedId: appliedCouponDetails?.couponAppliedId,
                pid: appointmentData.packageId || 1,
                couponCode: discountPrice ? coupon : undefined,
              };
              await userAxios.post(userApiRoutes.appointment_booking, payload);
              localStorage.removeItem("appointmentData");
            }
            toast.update(toastId, {
              render: "Payment successful!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            setThankYouContent({
              title: type === "cart" ? "Thank You!" : "Appointment Confirmed!",
              message:
                type === "cart"
                  ? "Your order has been placed successfully. We appreciate your support. Your order is being processed – stay tuned for updates!"
                  : "Your consultation has been successfully booked. We’ll notify you shortly. Thank you for choosing us!",
              buttonText: "Back to Home",
              redirectUrl: "/",
            });
            setLoading(false);
            setIsPaymentSuccessfull(true);
            fetchCartitems();
          } catch (err) {
            console.error(err);
            toast.update(toastId, {
              render: "Payment verification failed!",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
            setLoading(false);
          }
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
          contact: user?.phone,
        },
        theme: {
          color: "#528FF0",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Payment initiation failed!");
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = async () => {
    try {
      setCoupon("");
      setDiscountPrice(null);
      setDiscounGet(0);
      setIsDiscountApllied(false);
      const updatedItems = cartItems.map((item) => ({
        ...item,
        discountApplied: false,
        discountedAmount: null,
      }));
      setCartItems(updatedItems);
      fetchCartitems();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to remove coupon");
    }
  };

  useEffect(() => {
    let sum = 0;
    let discountget = 0;
    let totalsum = 0;
    cartItems.forEach((item) => {
      const price = item.discountApplied
        ? parseFloat(
            item?.PackagePlan?.price -
              Number(appliedCouponDetails?.value || 0) || 0
          )
        : parseFloat(item?.PackagePlan?.price || 0);

      const dig = item.discountApplied
        ? parseFloat(item?.discountValue || 0)
        : 0;

      discountget += dig;
      sum += price;
      totalsum += parseFloat(item?.PackagePlan?.price || 0);
    });
    setTotal(totalsum);
    setDiscounGet(discountget);
    setDiscountPrice(sum);
  }, [cartItems]);

  useEffect(() => {
    fetchProfileDetails();
    if (type === "cart") {
      fetchCartitems();
    } else {
      const storedData = localStorage.getItem("appointmentData");
      if (storedData) {
        setAppointmentData(JSON.parse(storedData));
      }
    }
  }, []);

  const renderCouponBox = () => (
    <div className="discoutBox mb-4 ">
      {!isDiscountapplied ? (
        <>
          <input
            className="form-control"
            placeholder="Add discount code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
          />
          <img className="tagicon" src={discoutimg} />
          <button
            className="applybtn"
            onClick={applyCoupon}
            disabled={
              (type === "cart" && cartItems.length === 0) ||
              (type !== "cart" && !appointmentData)
            }
          >
            Apply
          </button>
        </>
      ) : (
        <div className="applied-coupon-box d-flex align-items-center justify-content-between px-3 py-2 rounded bg-light">
          <span className="text-success fw-bold">Coupon Applied: {coupon}</span>
          <button
            className="btn btn-sm btn-primary btn-outline-danger py-1 h-auto"
            onClick={removeCoupon}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { firstName, phone } = formData;

    if (!firstName?.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!phone?.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      await userAxios.put(userApiRoutes.update_profile('order'), formData);
      toast.success("Profile updated successfully");
      fetchProfileDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={addtobagbg} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>checkout page</h2>
          </div>
        </div>
      </section>

      {ispaymentSuccessfull ? (
        <div className="ThankyouModal">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-10 col-sm-12 m-auto">
                <figure className="Thnkyouimg mb-4">
                  <img src={Thankyouimg} alt="Thank You" />
                </figure>
                <h4>{thankYouContent.title}</h4>
                <p>{thankYouContent.message}</p>
                <Link
                  to={thankYouContent.redirectUrl}
                  className="btn btn-primary max-width mt-4 hvr-shutter-out-horizontal"
                >
                  {thankYouContent.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section className="sectionSpace addtobag">
          <div className="container">
            <div className="InnerPageTitle">
              <h4>billing details</h4>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="addtobagleft">
                  <div className="addtobaghead">
                    <h4>contact details</h4>
                  </div>

                  <div className="addtobabody">
                    <div className="form-group mb-3">
                      <label>
                        Name<span className="validation">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>
                        Email ID<span className="validation">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={true}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>
                        Phone Number<span className="validation">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        className="form-control"
                        onInput={e => {
                          const input = e.target.value;
                          const regex = /^[0-9]*$/; 
                          if (regex.test(input) && input.length <= 10) {
                            phoneDefault.current = input;
                            setFormData(prev => ({ ...prev, phone: input }));
                          } else {
                            e.target.value = phoneDefault.current;
                          }
                        }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <form onSubmit={handleSave}>
                      <button type="submit" className="btn btn-primary mt-2">
                        Upadte Details
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-5 ms-auto">
                <div className="addtobagright">
                  <div className="addtobaghead">
                    <h4>order summary - {cartItems.length} Item</h4>
                  </div>

                  <div className="addtobabody ">
                    {type === "cart" ? (
                      <>
                        <ul className="ordersummarylist">
                          {cartItems.map((item) => (
                            <li key={item.id}>
                              <figure>
                                <img
                                  crossorigin="anonymous"
                                  src={item?.PackagePlan?.image_url}
                                  alt="Product"
                                />
                              </figure>
                              <figcaption>
                                <h4>
                                  {item?.PackagePlan?.Package?.Service?.name || item?.PackagePlan?.Package?.name} 
                                  {item?.PackagePlan?.duration? ` - ${item?.PackagePlan?.duration} Months` : ``}
                                </h4>

                                <span className="price-text">
                                  {item.discountApplied ? (
                                    <>
                                      <span className="text-muted text-decoration-line-through me-2">
                                        {formatINRCurrency(
                                          item?.PackagePlan?.price
                                        )}
                                      </span>
                                      <span className="text-success fw-bold">
                                        ₹
                                        {item?.PackagePlan?.price -
                                          Number(
                                            appliedCouponDetails?.value || 0
                                          ) || 0}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      {formatINRCurrency(
                                        item?.PackagePlan?.price
                                      )}
                                    </>
                                  )}
                                </span>
                              </figcaption>
                            </li>
                          ))}

                          {cartItems.length === 0 && (
                            <li>
                              <b>No item found!</b>
                            </li>
                          )}
                        </ul>

                        {/* Coupon for Cart */}
                        {renderCouponBox()}

                        <ul className="Pricebrnkdownlist">
                          <li>
                            <span>Subtotal:</span>
                            <b>₹ {total}</b>
                          </li>
                          <li>
                            <span>Discount:</span>
                            <b className="red-text ">
                              - ₹{discountGet?.toFixed(2) || 0}
                            </b>
                          </li>
                          <li>
                            <span>Total:</span>
                            <b>₹ {discountPrice || total}</b>
                          </li>
                        </ul>
                      </>
                    ) : appointmentData ? (
                      <>
                        <ul className="ordersummarylist">
                          <li>
                            <figure>
                              <img
                                src={appointmentData.consultantImage}
                                alt="Consultant"
                                crossOrigin="anonymous"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  borderRadius: "8px",
                                }}
                              />
                            </figure>
                            <figcaption>
                              <h4>{appointmentData.consultantName}</h4>
                              <p className="mb-1">
                                Date: {appointmentData.selectedDate}
                              </p>
                              <p className="mb-1">
                                Time: {appointmentData.selectedSlot?.start} -{" "}
                                {appointmentData.selectedSlot?.end}
                              </p>
                              {appointmentData.discountApplied ? (
                                <>
                                  <span className="text-muted text-decoration-line-through me-2">
                                    ₹ {appointmentData.consultantFees}
                                  </span>
                                  <span className="text-success fw-bold">
                                    ₹{appointmentData?.discountedAmount}
                                  </span>
                                </>
                              ) : (
                                <p className="price-text">
                                  ₹ {appointmentData.consultantFees}
                                </p>
                              )}
                            </figcaption>
                          </li>
                        </ul>
                        {/* {!appointmentData.isFollowUp && appointmentData.type != "doctor"  && renderCouponBox()} */}
                        <ul className="Pricebrnkdownlist mt-3">
                          <li>
                            <span>Consultation Fees:</span>
                            <b>₹ {appointmentData.consultantFees}</b>
                          </li>
                          <li>
                            <span>Duration:</span>
                            <b>{appointmentData.consultantDuration} mins</b>
                          </li>
                          {!appointmentData.isFollowUp && (
                            <li>
                              <span>Discount:</span>
                              <b className="red-text ">
                                - ₹{discountGet.toFixed(2) || 0}
                              </b>
                            </li>
                          )}
                          <li>
                            <span>Total:</span>
                            <b>
                              ₹{" "}
                              {appointmentData.discountedAmount ||
                                appointmentData.consultantFees}
                            </b>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <p>No appointment data available.</p>
                    )}

                    {/* Payment Button */}
                    <div className="btnbox mt-4 text-center">
                      <button
                        className="btn btn-primary max-width hvr-shutter-out-horizontal"
                        onClick={handlePayment}
                        disabled={loading}
                      >
                        {loading ? "Please wait..." : "proceed to pay"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
