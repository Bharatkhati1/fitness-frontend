import React from "react";
import trialImage from "./Trial.avif";
import { toast } from "react-toastify";
import { AddToCart } from "../../../../store/auth/AuthExtraReducers";
import { authActions } from "../../../../store/auth";
import userAxios from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Trial = () => {
  const { cartItems = [], isLoggedIn } = useSelector((state) => state.auth);
  const cartItemIds = cartItems?.map((item) => item.packagePlanId);
  const dispatch = useDispatch();
  const fetchCartitems = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_cart_item);
      dispatch(authActions.setCartItems(res?.data?.data));
    } catch (error) {
      console.log(error);
      dispatch(authActions.setCartItems([]));
      toast.error(error.response.data.error);
    }
  };

  const handleAddToCart = async (plainId) => {
    if (!isLoggedIn) {
      toast.info("Please login first.");
      return;
    }
    dispatch(AddToCart(plainId, false));
    setTimeout(() => {
      fetchCartitems();
    }, 700);
  };
  return (
    <div
      className="container"
      style={{ marginTop: "170px", marginBottom: "89px" }}
    >
      <div className="row align-items-center pt-6">
        <div className="col-md-5">
          <figure>
            <img crossOrigin="anonymous" src={trialImage} alt="Trial offer" />
          </figure>
        </div>

        <div className="col-md-6 Diabetespageright">
          <h1>TRIAL-7 days</h1>
          <p>₹799.00</p>
          <button
            className="btn btn-primary mb-4"
            onClick={() => handleAddToCart(1)}
          >
            {" "}
            {cartItemIds.includes(1) ? `Go to cart` : `add to bag`}
          </button>

          <ul className="list-unstyled">
            <li className="mb-3">
              Gain access to an exciting variety of workouts, including yoga,
              high-intensity interval training (HIT), and strength training, all
              led by certified fitness instructors.
            </li>
            <li className="mb-3">
              Our interactive platform allows you to join live sessions or
              choose from an extensive library of pre-recorded classes that fit
              your schedule
            </li>
            <li className="mb-3">
              Get a generalised diet plan aimed at meeting your goals.
            </li>
            <li className="mb-3">
              One-to-one consultation with our fitness experts regarding all
              your queries and the roadmap towards your better fitness.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Trial;
