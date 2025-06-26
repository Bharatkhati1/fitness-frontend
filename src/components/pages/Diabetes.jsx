import shapeangelleft from "../../../public/assets/img/shapeangelleft.png";
import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { Link, useNavigate, useParams } from "react-router-dom";
import { webAxios } from "../../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../store/auth/AuthExtraReducers";
import { useSelector } from "react-redux";
import userAxios from "../../utils/Api/userAxios";
import { authActions } from "../../store/auth";

function PackageDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const {
    cartItems = [],
    isLoggedIn,
    userAccessToken,
  } = useSelector((state) => state.auth);
  const cartItemIds = cartItems?.map((item) => item.packagePlanId);

  const fetchPackageDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_package_details(slug)
      );
      setDetails(response.data.data);
    } catch (error) {
      setDetails(null);
      toast.error(error.response.data.message);
    }
  };

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

  const handleBuyNow = async (id) => {
    if (!isLoggedIn) {
      toast.info("Please login first.");
      return;
    }
    dispatch(AddToCart(id, true, navigate));
  };

  useEffect(() => {
    if (userAccessToken && userAccessToken.length > 0) {
      fetchCartitems();
    }
  }, []);

  const parsedActions = JSON.parse(details.actions || "[]");
  const actionNames = parsedActions.map((action) => action.name);
  const showButton = (label) => actionNames.includes(label);
  const encodedId = btoa(details.id);

  useEffect(() => {
    fetchPackageDetails();
  }, [slug]);

  const getLengthDiv = () => {
    const len = details?.PackagePlans?.length;
    switch (len) {
      case 1:
      case 2:
        return 6;
      case 3:
        return 4;
      default:
        return 3;
    }
  };
  
  return (
    <>
      <section className="Diabetespage InnerpageSpace pb-0">
        <span className="daishape">
          <img src={shapeangelleft}></img>
        </span>

        <span className="daishaperight">
          <img src={shapeangelleft}></img>
        </span>
        {details ? (
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5 Diabetespageleft">
                <figure>
                  <img crossOrigin="anonymous" src={details?.image_url} />
                </figure>
              </div>

              <div className="col-md-6 Diabetespageright">
                <h3>{details?.name} </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: details?.description,
                  }}
                ></p>
                <div className="btn-group-box justify-content-start">
                  {showButton("Consult a Doctor") && (
                    <Link
                      to={`/experts/${details.slug}/doctor/${encodedId}`}
                      className="btn btn-primary hvr-shutter-out-horizontal"
                    >
                      Consult a Doctor
                    </Link>
                  )}

                  {showButton("Talk to a Therapist") && (
                    <Link
                      to={`/experts/${details.Slug}/therapist/${encodedId}`}
                      className="btn btn-primary hvr-shutter-out-horizontal"
                    >
                      Talk to a Therapist
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="DiabetesHealthPakages mt-4 mb-0 justify-content-center">
              <div class="InnerPageTitle text-center">
                <h4>{details.name} Variants</h4>
              </div>

              <div className="row">
                {details?.PackagePlans?.map((plan) => (
                  <div className={`col-md-${getLengthDiv()}`}>
                    <div className="DiabetesHealthcontent">
                      <figure>
                        <img crossOrigin="anonymous" src={plan.image_url}></img>
                      </figure>

                      <figcaption>
                        <h3>
                          ₹{plan.price} | {plan.duration} months
                        </h3>
                        {plan.description && (
                          <>
                            <span>Variant description:</span>
                            <p
                              className="text-center"
                              dangerouslySetInnerHTML={{
                                __html: plan?.description,
                              }}
                            ></p>
                          </>
                        )}

                        <div className="btnbox text-center">
                          <a
                            onClick={() => handleBuyNow(plan.id)}
                            className="btn btn-primary w-100   mb-1 hvr-shutter-out-horizontal"
                          >
                            buy now
                          </a>
                          <a
                            onClick={() =>
                              cartItemIds.includes(plan.id)
                                ? navigate("/cart")
                                : handleAddToCart(plan.id)
                            }
                            className="btn btn-primary w-100 hvr-shutter-out-horizontal"
                          >
                            {cartItemIds.includes(plan.id)
                              ? `Go to cart`
                              : `add to bag`}
                          </a>
                        </div>
                      </figcaption>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 text-center py-5">
            <h5>No Details found.</h5>
          </div>
        )}

        {details && (
          <div className="PackageINclusion mt-5 pt-3 pb-5">
            <div className="container">
              <h3 className="pn-title text-center">
                {details?.name} Package inclusions
              </h3>
              <div className="row">
                {details?.PackageInclusions?.map((inclusion) => (
                  <div className="col-md-4 Packagecontent">
                    <figure>
                      <img
                        crossOrigin="anonymous"
                        src={inclusion.image_url}
                      ></img>
                    </figure>

                    <figcaption>
                      <h4>{inclusion.name}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: inclusion?.description,
                        }}
                      ></p>
                    </figcaption>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default PackageDetails;
