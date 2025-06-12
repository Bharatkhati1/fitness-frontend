import React, { useEffect, useState } from "react";
import addtobagbg from "../../../public/assets/img/addtobagbg.png";
import osproductimg1 from "../../../public/assets/img/osproductimg1.png";
import deleteicon from "../../../public/assets/img/deleteicon.png";
import discoutimg from "../../../public/assets/img/discoutimg.png";
import userAxios from "../../utils/Api/userAxios";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AddToBag() {
  const { user } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [apliedCode, setAppliedCode] = useState("")
  const [discountPrice, setDiscountPrice] = useState(null);
  const [discountGet, setDiscounGet] = useState(0);

  const fetchCartitems = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_cart_item);
      setCartItems(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromCart = async (id) => {
    try {
      const res = await userAxios.delete(userApiRoutes.remove_from_cart(id));
      fetchCartitems();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Server Error");
    }
  };

  const applyCoupon = async () => {
    try {
      const res = await userAxios.post(userApiRoutes.apply_coupon, {
        couponCode: coupon,
      });
      setTotal(res.data.data.totalAmount);
      setDiscountPrice(res.data.data.discountedAmount);
      setDiscounGet(res.data.data.discountApplied);
      setAppliedCode(res.data.data.coupon.code)
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid Coupon");
    }
  };

  const handlePayment = async () => {
    if (cartItems.length == 0) {
      toast.error("No item in the cart !");
      return;
    }
    try {
      const res = await userAxios.post(userApiRoutes.create_order_razorpay, {
        amount: discountPrice || total,
      });

      const { orderId, amount, currency } = res.data.data;
      const options = {
        key: "rzp_test_ENoX7bkuXjQBZc",
        amount,
        currency,
        name: "Smart Health",
        description: "Service Purchase",
        image: "/assets/img/logo.png",
        order_id: orderId,
        handler: async function (response) {
          try {
            console.log("after payment response:", response);
            const verifyRes = await userAxios.post(
              userApiRoutes.cart_checkout,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );
            toast.success("Payment successful!");
            fetchCartitems();
          } catch (err) {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: "#528FF0",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Payment initiation failed!");
    }
  };

  const removeCoupon = async () => {
    try {
      const res = await userAxios.delete(userApiRoutes.remove_coupon(apliedCode));
      setCoupon("");
      setDiscountPrice(null);
      setDiscounGet(0);
      toast.success(res.data.message || "Coupon removed");
      fetchCartitems();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to remove coupon");
    }
  };
  

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item?.PackagePlan?.price || 0);
      const qty = item?.quantity || 1;
      sum += price * qty;
    });
    setTotal(sum);
  }, [cartItems]);

  useEffect(() => {
    fetchCartitems();
  }, []);

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={addtobagbg} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>add to bag</h2>
          </div>
        </div>
      </section>

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
                      First Name<span className="validation">*</span>
                    </label>
                    <input
                      type="text"
                      value={user.firstName}
                      className="form-control"
                      readOnly
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Email ID<span className="validation">*</span>
                    </label>
                    <input
                      type="text"
                      value={user.email}
                      className="form-control"
                      readOnly
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Phone Number<span className="validation">*</span>
                    </label>
                    <input
                      value={user.phone}
                      className="form-control"
                      readOnly
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Select Country<span className="validation">*</span>
                    </label>
                    <select className="form-select">
                      <option selected>India</option>
                      <option value="1">USA</option>
                      <option value="2">UK</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 ms-auto">
              <div className="addtobagright">
                <div className="addtobaghead">
                  <h4>order summary - {cartItems.length} Item</h4>
                </div>

                <div className="addtobabody">
                  <ul className="ordersummarylist">
                    {cartItems.map((item) => (
                      <li key={item.id}>
                        <figure>
                          <img src={osproductimg1} />
                        </figure>
                        <figcaption>
                          <h4>
                            {item?.PackagePlan?.Package?.Service?.name} -{" "}
                            {item?.PackagePlan?.duration} Months
                          </h4>
                          <span className="price-text">
                            ₹ {item?.PackagePlan?.price}
                          </span>
                          <a
                            onClick={() => removeFromCart(item.id)}
                            className="Deleteicon cursor-pointer"
                          >
                            <img src={deleteicon} />
                          </a>
                        </figcaption>
                      </li>
                    ))}
                    {cartItems.length === 0 && (
                      <li>
                        <b>No item found!</b>
                      </li>
                    )}
                  </ul>

                  <div className="">
                    <div className="discoutBox mb-4 d-block">
                      {!discountPrice ? (
                        <>
                          <input
                            className="form-control"
                            placeholder="Add discount code"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                          />
                          <img className="tagicon" src={discoutimg} />
                          <button className="applybtn" onClick={applyCoupon}>
                            Apply
                          </button>
                        </>
                      ) : (
                        <div className="applied-coupon-box d-flex align-items-center justify-content-between px-3 py-2 rounded bg-light">
                          <span className="text-success fw-bold">
                            Coupon Applied: {coupon}
                          </span>
                          <button
                            className="btn btn-sm btn-primary btn-outline-danger py-1 h-auto"
                            onClick={removeCoupon}
                          >
                            &times;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="Pricebrnkdownlist">
                    <li>
                      <span>Subtotal:</span>
                      <b>₹ {total}</b>
                    </li>
                    <li>
                      <span>Discount:</span>
                      <b className="red-text ">- ₹{discountGet || 0}</b>
                    </li>
                    <li>
                      <span>Total:</span>
                      <b>₹ {discountPrice || total}</b>
                    </li>
                  </ul>

                  <div className="btnbox mt-4 text-center">
                    <button
                      className="btn btn-primary max-width hvr-shutter-out-horizontal"
                      onClick={handlePayment}
                    >
                      proceed to pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
