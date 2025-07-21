import React, { useState } from "react";
import trialImage from "./Trial.avif";
import { toast } from "react-toastify";
import { AddToCart } from "../../../../store/auth/AuthExtraReducers";
import { authActions } from "../../../../store/auth";
import userAxios from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoginModal from "../../../unauthorized/Modal/LoginModal";
import { useNavigate } from "react-router-dom";

const Trial = () => {
  const { cartItems = [], isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const cartItemIds = cartItems?.map((item) => item.packagePlanId);
  const [openLogin, setOpenLogin] = useState(false);
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
      setOpenLogin(true);
      return;
    }
    dispatch(AddToCart(plainId, false));
    setTimeout(() => {
      fetchCartitems();
    }, 700);
  };

  const handleLoginModalClose = () => {
    if (isLoggedIn) {
      toast.success("Login successfully.");
    }
    setOpenLogin(false);
  };

  const handleBuyNow = async (id) => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }
    dispatch(AddToCart(id, true, navigate));
  };
  return (
    <>
      <LoginModal visible={openLogin} onClose={() => handleLoginModalClose()} />
      <div
        className="container"
        style={{ marginTop: "170px", marginBottom: "89px" }}
      >
        <div className="row align-items-center pt-6">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-5 Diabetespageleft">
                <figure>
                  <img crossOrigin="anonymous" src='https://api.dailyfitness.ai:3005/uploads/packages/1750756267230-Trial_img.png' />
                </figure>
              </div>

              <div className="col-md-6 Diabetespageright">
                <h3>TRIAL-7 days</h3>
                <p
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontSize: "19px",
                  }}
                >
                  ₹799.00
                </p>
                <p>
                  <ol className="list-unstyled">
                    <li className="mb-2">
                      • Gain access to an exciting variety of workouts,
                      including yoga, high-intensity interval training (HIT),
                      and strength training, all led by certified fitness
                      instructors.
                    </li>
                    <li className="mb-2">
                      • Our interactive platform allows you to join live
                      sessions or choose from an extensive library of
                      pre-recorded classes that fit your schedule
                    </li>
                    <li className="mb-2">
                      • Get a generalised diet plan aimed at meeting your goals.
                    </li>
                    <li className="mb-4">
                      • One-to-one consultation with our fitness experts
                      regarding all your queries and the roadmap towards your
                      better fitness.
                    </li>
                  </ol>
                </p>
                <div className="btn-group-box justify-content-start">
                  <button
                    className="btn btn-primary mb-4"
                    onClick={() => handleBuyNow(1)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn btn-primary mb-4"
                    onClick={() => handleAddToCart(1)}
                  >
                    {cartItemIds.includes(1) ? `Added to Bag` : `add to bag`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trial;
