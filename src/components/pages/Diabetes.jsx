import shapeangelleft from "../../../public/assets/img/shapeangelleft.png";
import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { webAxios } from "../../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../store/auth/AuthExtraReducers";
import { useSelector } from "react-redux";

function PackageDetails() {
  const { slug } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const {cartItems =[], isLoggedIn} = useSelector((state)=> state.auth)
  
 const cartItemIds = cartItems?.map((item)=> item.subscriptionPlanId)
  const fetchPackageDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_package_details(slug)
      );
      setDetails(response.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchPackageDetails();
  }, [slug])

  const handleAddToCart = async (plainId) => {
    if (!isLoggedIn) {
      toast.info("Please login first.")
      return;
    }
    dispatch(AddToCart(plainId));
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
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 Diabetespageleft">
              <figure>
                <img crossOrigin="anonymous" src={details.image_url} />
              </figure>
            </div>

            <div className="col-md-6 Diabetespageright">
              <h3>{details.name} </h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: details?.description,
                }}
              ></p>
            </div>
          </div>

          <div className="DiabetesHealthPakages mt-4 mb-0">
            <div class="InnerPageTitle text-center">
              <h4>{details.name} PACKAGEs</h4>
            </div>

            <div className="row">
              {details?.PackagePlans?.map((plan) => (
                <div className="col-md-3">
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
                          <span>Package description:</span>
                          <p
                            className="text-center"
                            dangerouslySetInnerHTML={{
                              __html: plan?.description,
                            }}
                          ></p>
                        </>
                      )}

                      <div className="btnbox text-center">
                        <a className="btn btn-primary sm-btn mb-2 hvr-shutter-out-horizontal">
                          buy now
                        </a>
                        <a
                          onClick={() => cartItemIds.includes(plan.id)? navigate("/cart"): handleAddToCart(plan.id)}
                          className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
                        >
                        {cartItemIds.includes(plan.id)?`Go to cart`:`add to bag`}
                        </a>
                      </div>
                    </figcaption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="PackageINclusion mt-5 pt-3 pb-5">
          <div className="container">
            <h3 className="pn-title text-center">
              {details.name} Management Package inclusions
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
      </section>
    </>
  );
}

export default PackageDetails;
