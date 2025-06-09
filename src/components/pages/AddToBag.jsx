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
  const {user} = useSelector((state)=> state.auth)
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [coupon , setCoupon] = useState("")
  const discount = 0;

  const fetchCartitems = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_cart_item);
      setCartItems(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await userAxios.delete(userApiRoutes.remove_from_cart(id));
      toast.success(res.data.message);
      fetchCartitems();
    } catch (error) {
      toast.error(error.response.data.error || "Server Error");
    }
  };

  const applyCoupon=async()=>{
    try {
      const res = await userAxios.post(userApiRoutes.apply_coupon, {couponCode:coupon});
    } catch (error) {
      toast.error(error.response.data.error || "Server Error");
    }
  }

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item?.PackagePlan?.price || 0);
      const qty = item?.quantity || 1;
      sum += price * qty;
    });

    setSubtotal(sum);
    setTotal(sum - discount);
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
          <div class="InnerPageTitle ">
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
                    ></input>
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Last Name<span className="validation">*</span>
                    </label>

                    <input
                      type="text"
                      value={user.lastName}
                      className="form-control"
                    ></input>
                  </div>
                  <div className="form-group mb-3">
                    <label>
                      Email ID<span className="validation">*</span>
                    </label>

                    <input
                      type="text"
                      value={user.email}
                      className="form-control"
                    ></input>
                  </div>
                  <div className="form-group mb-3">
                    <label>
                      Phone Number<span className="validation">*</span>
                    </label>

                    <input
                        value={user.phone}
                      className="form-control"
                    ></input>
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Select Country<span className="validation">*</span>
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>India</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
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
                      <li>
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
                            className="Deleteicon"
                          >
                            <img src={deleteicon}></img>
                          </a>
                        </figcaption>
                      </li>
                    ))}
                    {cartItems.length == 0 && (
                      <li>
                        <b>No item found !</b>
                      </li>
                    )}
                  </ul>

                  <div className="discoutBox mb-4">
                    <input
                      className="form-control"
                      placeholder="Add discount code"
                      value={coupon}
                      onChange={(e)=> setCoupon(e.target.value)}
                    ></input>
                    <img className="tagicon" src={discoutimg}></img>
                    <button className="applybtn" onClick={()=> applyCoupon()}>Apply</button>
                  </div>

                  <ul className="Pricebrnkdownlist">
                    <li>
                      <span>Subtotal:</span>
                      <b>₹ {total}</b>
                    </li>
                    <li>
                      <span>Discount:</span>
                      <b className="red-text pe-4">-₹ 0</b>
                    </li>
                    <li>
                      <span>Total:</span>
                      <b>₹ {total}</b>
                    </li>
                  </ul>

                  <div className="btnbox mt-4 text-center">
                    <a className="btn btn-primary max-width hvr-shutter-out-horizontal">
                      proceed to pay
                    </a>
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
