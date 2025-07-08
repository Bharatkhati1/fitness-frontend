import React, { useEffect, useState } from "react";
import addtobagbg from "../../../public/assets/img/addtobagbg.png";
import osproductimg1 from "../../../public/assets/img/osproductimg1.png";
import deleteicon from "../../../public/assets/img/deleteicon.png";
import userAxios from "../../utils/Api/userAxios";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { formatINRCurrency } from "../../utils/constants";

export default function CartBag() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCartitems = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_cart_item);
      setCartItems(res.data.data);
      return res.data.data
    } catch (error) {
      setCartItems([]);
      console.log(error);
    }
  };
  const removeFromCart = async (id) => {
    try {
      const res = await userAxios.delete(userApiRoutes.remove_from_cart(id));
      const result   = await fetchCartitems();
      dispatch(authActions.setCartItems(result))
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Server Error");
    }
  };

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item?.PackagePlan?.price || 0);
      sum += price;
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
            <h2>Bag</h2>
          </div>
        </div>
      </section>

      <section className="sectionSpace addtobag">
        <div className="container">
          <div className="row">
            <div className="addtobag">
              <div className="addtobagh">
                <h4>order List - {cartItems.length} Item</h4>
              </div>

              <div className="addtobabody ps-0 pe-0">
                <ul className="ordersummarylist">
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <figure>
                        <img  crossorigin="anonymous" src={item?.PackagePlan?.image_url} />
                      </figure>
                      <figcaption>
                        <h4>
                          {item?.PackagePlan?.Package?.Service?.name} -{" "}
                          {item?.PackagePlan?.duration} Months
                        </h4>
                        <span className="price-text">
                         <span style={{color:"black", fontSize:"13px"}}>Price :</span>   {formatINRCurrency(item?.PackagePlan?.price)}
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

                <div className="btnbox mt-4 text-end">
                  {cartItems.length > 0 && (
                    <p>
                      Sub Total ( {cartItems.length} items ) :
                      <span style={{ color: "green", fontWeight: "600" }}>
                        {" "}
                        ₹ {total}
                      </span>
                    </p>
                  )}
                  <button
                  onClick={()=> navigate("/checkout/cart")}
                    disabled={!cartItems.length > 0}
                    className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
                  >
                    proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
