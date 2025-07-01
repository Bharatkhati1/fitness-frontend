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
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { authActions } from "../../store/auth";
import LoginModal from "../unauthorized/Modal/LoginModal";

function PackageDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cartItems = [],
    isLoggedIn,
    userAccessToken,
  } = useSelector((state) => state.auth);
  const cartItemIds = cartItems?.map((item) => item.packagePlanId);
  const [details, setDetails] = useState({});
  const [comboPlans, setComboPlans] = useState([]);
  const [openLoginModal, setopenLoginModal] = useState(false);
  const [singlePlans, setSinglePlans] = useState([]);

  const fetchPackageDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_package_details(slug)
      );
      setDetails(response.data.data);
      const singlePlansFiltered = response.data.data.PackagePlans.filter(
        (plan) => plan.type == "single" || plan.type == ""
      );
      const comboLansFiltered = response.data.data.PackagePlans.filter(
        (plan) => plan.type == "combo"
      );

      setComboPlans(comboLansFiltered);
      setSinglePlans(singlePlansFiltered);
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
      setopenLoginModal(true);
      return;
    }
    dispatch(AddToCart(plainId, false));
    setTimeout(() => {
      fetchCartitems();
    }, 700);
  };

  const handleBuyNow = async (id) => {
    if (!isLoggedIn) {
      setopenLoginModal(true);
      return;
    }
    dispatch(AddToCart(id, true, navigate));
  };

  const parsedActions = JSON.parse(details.actions || "[]");
  const actionNames = parsedActions.map((action) => action.name);
  const showButton = (label) => actionNames.includes(label);
  const encodedId = btoa(details.id);

  const prevArrow = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="60" viewBox="0 0 30 60" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.60766 31.7776L18.7502 45.9201L22.2852 42.3851L9.91016 30.0101L22.2852 17.6351L18.7502 14.1001L4.60766 28.2426C4.13898 28.7114 3.87569 29.3472 3.87569 30.0101C3.87569 30.673 4.13898 31.3088 4.60766 31.7776Z" fill="#2A2A2A"/>
  </svg>
`;

  const nextArrow = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="60" viewBox="0 0 30 60" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.3923 31.7776L11.2498 45.9201L7.71484 42.3851L20.0898 30.0101L7.71484 17.6351L11.2498 14.1001L25.3923 28.2426C25.861 28.7114 26.1243 29.3472 26.1243 30.0101C26.1243 30.673 25.861 31.3088 25.3923 31.7776Z" fill="#2A2A2A"/>
  </svg>
`;

  useEffect(() => {
    if (userAccessToken && userAccessToken.length > 0) {
      fetchCartitems();
    }
  }, []);

  useEffect(() => {
    fetchPackageDetails();
  }, [slug]);

  useEffect(() => {
    const equalizeCardHeights = () => {
      const cards = document.querySelectorAll(".plan-card");
      let maxHeight = 0;

      cards.forEach((card) => {
        card.style.height = "auto";
      });

      cards.forEach((card) => {
        const height = card.offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });

      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };
    setTimeout(equalizeCardHeights, 300);

    window.addEventListener("resize", equalizeCardHeights);
    return () => window.removeEventListener("resize", equalizeCardHeights);
  }, [singlePlans, comboPlans]);

  return (
    <>
      <LoginModal
        visible={openLoginModal}
        onClose={() => setopenLoginModal(false)}
      />
      <section className="Diabetespage InnerpageSpace pb-0">
        <span className="daishape">
          <img src={shapeangelleft}></img>
        </span>

        <span className="daishaperight">
          <img src={shapeangelleft}></img>
        </span>
        {details ? (
          <div className="container">
            <div className="row mb-4">
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

            {details?.PackagePlans?.length > 0 && (
              <div className="DiabetesHealthPakages mt-4 mb-0 justify-content-center">
                <div class="InnerPageTitle text-center">
                  <h4>{details.name} package Variants</h4>
                </div>
                {comboPlans?.length > 0 && (
                  <div className=" justify-content-center mb-4">
                    {details?.comboVariantHeading != "null" && (
                      <h3 className="mt-3">
                        <b>{details?.comboVariantHeading || ""}</b>
                      </h3>
                    )}
                    {Array.isArray(comboPlans) && comboPlans?.length > 0 && (
                      <OwlCarousel
                        className={`owl-theme ${
                          comboPlans.length == 1 ? `single-crousol` : ""
                        }`}
                        autoplay={false}
                        dots={true}
                        items={4}
                        key={
                          comboPlans.map((pkg) => pkg.id).join(",") +
                          " " +
                          cartItemIds.join(",")
                        }
                        loop={false}
                        margin={10}
                        nav={true}
                        navText={[prevArrow, nextArrow]}
                        autoplaySpeed={3000}
                        autoplayTimeout={9000}
                        responsive={{
                          0: {
                            items: 1,
                          },
                          576: {
                            items: 1,
                          },
                          768: {
                            items: 2,
                          },
                          992: {
                            items:
                            comboPlans?.length === 1 || comboPlans.length == 2
                              ? 2
                              : comboPlans?.length === 3
                              ? 3
                              : 4,
                          },
                          1200: {
                            items:
                              comboPlans?.length === 1 || comboPlans.length == 2
                                ? 2
                                : comboPlans?.length === 3
                                ? 3
                                : 4,
                          },
                          1400: {
                            items:
                              comboPlans?.length === 1 || comboPlans.length == 2
                                ? 2
                                : comboPlans?.length === 3
                                ? 3
                                : 4,
                          },
                        }}
                      >
                        {comboPlans
                          ?.sort((a, b) => a.duration - b.duration)
                          .map((plan) => (
                            <div>
                              <div className="DiabetesHealthcontent ">
                                <figure>
                                  <img
                                    crossOrigin="anonymous"
                                    src={plan.image_url}
                                  ></img>
                                </figure>

                                <figcaption className="plan-card" s>
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
                      </OwlCarousel>
                    )}
                  </div>
                )}
                {singlePlans?.length > 0 && (
                  <div className="justify-content-center mb-4">
                    {details?.singleVariantHeading != "null" && (
                      <h3 className="mt-3">
                        <b>{details?.singleVariantHeading || ""}</b>
                      </h3>
                    )}
                    {Array.isArray(singlePlans) && singlePlans?.length > 0 && (
                      <OwlCarousel
                        className={`owl-theme ${
                          singlePlans.length == 1 ? `single-crousol` : ""
                        }`}
                        autoplay={false}
                        dots={true}
                        key={
                          singlePlans.map((pkg) => pkg.id).join(",") +
                          " " +
                          cartItemIds.join(",")
                        }
                        loop={false}
                        margin={30}
                        nav={true}
                        navText={[prevArrow, nextArrow]}
                        autoplaySpeed={3000}
                        autoplayTimeout={9000}
                        responsive={{
                          0: {
                            items: 1,
                          },
                          576: {
                            items: 1,
                          },
                          768: {
                            items: 2,
                          },
                          992: {
                            items:
                            comboPlans?.length === 1 || comboPlans.length == 2
                              ? 2
                              : comboPlans?.length === 3
                              ? 3
                              : 4,
                          },
                          1200: {
                            items:
                            comboPlans?.length === 1 || comboPlans.length == 2
                              ? 2
                              : comboPlans?.length === 3
                              ? 3
                              : 4,
                          },
                          1400: {
                            items:
                              singlePlans?.length === 1 ||
                              singlePlans.length == 2
                                ? 2
                                : singlePlans?.length === 3
                                ? 3
                                : 4,
                          },
                        }}
                      >
                        {singlePlans
                          ?.sort((a, b) => a.duration - b.duration)
                          .map((plan) => (
                            <div>
                              <div className="DiabetesHealthcontent">
                                <figure>
                                  <img
                                    crossOrigin="anonymous"
                                    src={plan.image_url}
                                  ></img>
                                </figure>

                                <figcaption className="plan-card">
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
                      </OwlCarousel>
                    )}
                  </div>
                )}
            
              </div>
            )}
          </div>
        ) : (
          <div className="col-12 text-center py-5">
            <h5>No Details found.</h5>
          </div>
        )}

        {details?.PackageInclusions?.length > 0 && (
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
