import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import TagCheckIcon from "../../../../../../public/assets/img/tagCheck.png";
import Tagcircle from "../../../../../../public/assets/img/BannerCircle.svg";
import ShapeLeft from "../../../../../../public/assets/img/bannerShapeLeft.png";
import ShapeRight from "../../../../../../public/assets/img/bannerShapeRight.png";
import wightLosssChart from "../../../../../../public/assets/img/about-us.svg";
import VectorImg from "../../../../../../public/assets/img/vectorimg1.png";
import ContactUs from "../../../../../../public/assets/img/contactUs.png";
import MeetExperts from "../../../../../../public/assets/img/OurMeetExpertsImg.png";

import CallIcon from "../../../../../../public/assets/img/callIcon.png";
import MsgeIcon from "../../../../../../public/assets/img/Mesgeicon.png";
import InstaIcon from "../../../../../../public/assets/img/instagraIcon.png";
import TwitterIcon from "../../../../../../public/assets/img/twitterIcon.png";
import YoutUbeIcon from "../../../../../../public/assets/img/YoutubeIcon.png";

import ContactLeft from "../../../../../../public/assets/img/ContactShAPe1.png";
import ContactRight from "../../../../../../public/assets/img/ContactShAPe2.png";
import { webAxios } from "../../../../../utils/constants";
import userApiRoutes from "../../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import heartbeat from "../../../../../../public/assets/img/heartbeat.png";
import circleShapeLeft from "../../../../../../public/assets/img/circleShapeLeft.png";
import circleShapeRight from "../../../../../../public/assets/img/circleShapeRight.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getKitchenData,
  sendInquiry,
} from "../../../../../store/auth/AuthExtraReducers";
import { useDispatch } from "react-redux";
import EmailRequiredPopup from "../../EmailRequiredpopup";

import MUKTEEImg from "../../../../../../public/assets/img/MUKTEEImg.png";
import pixabayimg from "../../../../../../public/assets/img/pixabayimg.png";
// import butterflyimg from "../../../../../../public/assets/img/butterflyimg.png";
import butterfly1 from "../../../../../../public/assets/img/butterfly1.png";
import butterfly2 from "../../../../../../public/assets/img/butterfly2.png";
import butterfly3 from "../../../../../../public/assets/img/butterfly3.png";
import butterfly4 from "../../../../../../public/assets/img/butterfly4.png";
import butterfly5 from "../../../../../../public/assets/img/butterfly5.png";
import LoginModal from "../../../../unauthorized/Modal/LoginModal";

function Home() {
  const dispatch = useDispatch();
  const {
    allServices = [],
    services = [],
    kitchenData = [],
    isLoggedIn,
    user,
    contactUsDetails = {},
  } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    contactFor: [],
  });
  const [sliders, setSliders] = useState([]);
  const [whyus, setWhyus] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [openEmailRequiredPopup, setOpenEmailRequiredPopup] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");

  const owlRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (serviceName) => {
    setFormData((prev) => {
      const exists = prev.contactFor.includes(serviceName);
      const updatedServices = exists
        ? prev.contactFor.filter((s) => s !== serviceName)
        : [...prev.contactFor, serviceName];
      return { ...prev, contactFor: updatedServices };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      contactFor: formData.contactFor.join(", "),
      type: "inquiry",
    };

    await sendInquiry(payload);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      contactFor: [],
    });
  };

  const getSliders = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_sliders("home-page")
      );
      setSliders(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch sliders");
    }
  };

  const getBlogs = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_blogs({ limit: 4, type: "blogs" })
      );
      setBlogs(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch sliders");
    }
  };

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

  const downloadRecipe = async (id) => {
    setSelectedRecipeId(id);
    if (!isLoggedIn) {
      setOpenEmailRequiredPopup(true);
      return;
    }

    const promise = webAxios.post(userApiRoutes.download_recipe(id), {
      email: user?.email,
    });

    toast.promise(promise, {
      pending: "Sending recipe to your email...",
      success: "Recipe sent successfully!",
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message || "Failed to sent : Server Error"
          );
        },
      },
    });

    try {
      await promise;
    } catch (error) {
      // error is already handled by toast.promise
    }
  };

  const onGetRecipe = async (email) => {
    const promise = webAxios.post(
      userApiRoutes.download_recipe(selectedRecipeId),
      { email }
    );

    toast.promise(promise, {
      pending: "Sending recipe to your email...",
      success: "Recipe sent successfully!",
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message || "Failed to send : Server Error"
          );
        },
      },
    });

    try {
      await promise;
    } catch (error) {
      // error is already handled by toast.promise
    }
  };

  const getMessages = async () => {
    try {
      const response = await webAxios.get(userApiRoutes.get_sliders("whyus"));
      setWhyus(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch sliders");
    }
  };

  const handleSlideChange = (event) => {
    const currentIndex = event.item.index;
    const targetElement = document.getElementById("services");
    if (targetElement && currentIndex > 0) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          // video.currentTime = 0;
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    getSliders();
    getBlogs();
    getMessages();
    dispatch(getKitchenData());
  }, []);

  return (
    <>
      <EmailRequiredPopup
        visible={openEmailRequiredPopup}
        onClose={() => setOpenEmailRequiredPopup(false)}
        onGetRecipe={onGetRecipe}
      />
      <section className="bannerSection">
        <div className="container position-relative">
          <div className="circletagShapeBox">
            <img className="heartBeatImg" src={heartbeat} alt="" />
            <span className="circletagShape">
              <img src={Tagcircle} />
            </span>
          </div>
        </div>
        {sliders.length > 0 && (
          <OwlCarousel
            autoplay={true}
            dots={true}
            items={1}
            className="owl-theme"
            autoplaySpeed={500}
            autoplayTimeout={5000}
            loop={true}
            margin={0}
            nav={true}
            navText={[prevArrow, nextArrow]}
          >
            {sliders.map((slider) => {
              const options = slider.options ? slider.options.split(",") : [];
              const showClients = options.includes("Clients");
              const showExperience = options.includes("Experience");
              const showButtons = options.includes("Buttons");
              const showAnyClientInfo = showClients || showExperience;
              return (
                <div className="slider-box">
                  <div className="slider-image">
                    <img crossOrigin="annoymous" src={slider.image_url} />
                  </div>
                  <div className="container h-100">
                    <div className="row align-items-center h-100">
                      <div className="col-lg-6 bannerSectionLeft pe-0">
                        {options.includes("Badge") && (
                          <span className="BestTag">
                            <img src={TagCheckIcon} alt="Check" />
                            The Best in Town
                          </span>
                        )}

                        <h1 className="mb-1">{slider.heading}</h1>
                        {slider.subHeading && (
                          <div className="owl-p">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: slider.subHeading,
                              }}
                            ></div>
                          </div>
                        )}

                        {showAnyClientInfo && (
                          <ul className="ClientListinfo d-flex">
                            {showClients && (
                              <li>
                                <div className="ClientInfo">
                                  <b>150+</b>
                                  <p>Happy Clients</p>
                                </div>
                              </li>
                            )}
                            {showExperience && (
                              <li>
                                <div className="ClientInfo">
                                  <b>15</b>
                                  <p>Years of Experience</p>
                                </div>
                              </li>
                            )}
                          </ul>
                        )}

                       { showButtons &&<div className="BannerBtn d-flex">
                          <Link
                            className="hvr-shutter-out-horizontal"
                            to={"/all-packages"}
                          >
                            Join Now
                          </Link>
                          <Link
                            to={"/trial-7-days"}
                            className="hvr-shutter-out-horizontal"
                          >
                            book a trial
                          </Link>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* {whyus && whyus.length > 0 && (
              <div className="why-class">
                <img
                  crossOrigin="annoymous"
                  className="w-100"
                  src={whyus[0]?.image_url}
                />
              </div>
            )} */}
          </OwlCarousel>
        )}
      </section>

      <section className="AboutInfo">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 text-center p-4 me-auto AboutInfoLeft">
              <span className="circleshape">
                <img src={circleShapeLeft} />
              </span>

              <h2>
                We’re Not Just Another Weight Loss Website We’re Your &nbsp;
                <span>HEALTH UNIVERSE</span>
              </h2>
              <p>
                Experience the unique approach to personalised human health and
                fitness, that integrates all the dimensions of your well-being.
              </p>
            </div>
            <div className="col-md-5 text-left">
              <span className="circleshape2">
                <img src={circleShapeRight} />
              </span>
              <span className="circleshape2">
                <img src={circleShapeRight} />
              </span>
              <figure>
                <img src={wightLosssChart} />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="OurServices bg-solid SectionSpace" id="services">
        <div className="container">
          <div className="PageTitle text-center">
            <h2 onClick={() => setOpenLoginModal(true)}>OUR SERVICES</h2>
            <p>
              From fat loss solutions to strength, gain and disease management,
              we are committed to your holistic well-being as your true fitness
              pal
            </p>
          </div>
          {Array.isArray(services) &&
          services.length > 0 &&
          Array.isArray(services[0]) ? (
            <OwlCarousel
              className="owl-theme"
              autoplay={false}
              dots={true}
              items={1}
              loop={false}
              margin={10}
              nav={true}
              ref={owlRef}
              navText={[prevArrow, nextArrow]}
              autoplaySpeed={3000}
              onChanged={handleSlideChange}
              autoplayTimeout={9000}
            >
              {services?.map((group, index) => (
                <div className="row d-flex flex-wrap g-4 g-sm-3" key={index}>
                  {group.map((srv, idx) => {
                    let parsedActions = [];
                    try {
                      const rawActions =
                        typeof srv?.actions === "string" ? srv.actions : "[]";
                      const parsed = JSON.parse(rawActions);
                      parsedActions = Array.isArray(parsed) ? parsed : [];
                    } catch (error) {
                      console.warn("Invalid actions JSON:", srv?.actions);
                      parsedActions = [];
                    }

                    const actionNames = parsedActions.map(
                      (action) => action.name
                    );

                    const showButton = (label) => actionNames.includes(label);

                    return (
                      <div className="col-md-4" key={idx}>
                        <div className="OurServicesContent">
                          <figure className="position-relative">
                            <img
                              crossOrigin="anonymous"
                              src={srv.image_url}
                              alt={srv.name}
                              className="img-fluid"
                            />
                            {!srv.isPublished && (
                              <span className="coming-soon-label">
                                Coming Soon
                              </span>
                            )}
                          </figure>

                          <figcaption>
                            <h3>{srv.name}</h3>
                            {srv.shortDescription && (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: srv?.shortDescription,
                                }}
                              ></p>
                            )}
                            {srv.isPublished && (
                              <div className="gap-1 service-btn text-center d-flex">
                                {showButton("Know more") && (
                                  <Link
                                    to={`/service-details/${srv.name
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                    className=" mb-1 btn btn-primary w-100 hvr-shutter-out-horizontal"
                                  >
                                    Know more
                                  </Link>
                                )}

                                {showButton("Talk to an Expert") && (
                                  <a
                                    href="#GetInTouch"
                                    className="btn btn-primary hvr-shutter-out-horizontal w-100"
                                  >
                                    Talk to an Expert
                                  </a>
                                )}

                                {showButton("Contact our Helpline") && (
                                  <a
                                    href="#GetInTouch"
                                    className="btn btn-primary  hvr-shutter-out-horizontal w-100"
                                  >
                                    Contact our Helpline
                                  </a>
                                )}
                              </div>
                            )}
                          </figcaption>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}{" "}
            </OwlCarousel>
          ) : (
            <div className="text-center py-5">
              <h5>No services found.</h5>
            </div>
          )}
        </div>
      </section>
      <section className="WhyChoose SectionSpace">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>
              What we Offer: <span>Empower Your Health</span>
            </h2>
            <p>
              Transform your wellness journey with expert guidance and
              personalized plans tailored just for you.
            </p>
          </div>
        </div>
        <div className="VideBox bg-black" ref={videoContainerRef}>
          <video
            ref={videoRef}
            style={{ objectFit: "fill" }}
            src="https://daily-fitness-api.24livehost.com/uploads/video/homepage_video.MP4"
            width="100%"
            loop
            crossOrigin="anonymous"
            height="509"
            controls={true}
            muted
            playsInline
          />
        </div>
      </section>
      {/* <Whyus /> */}
      <section className="SmartKichin SectionSpace">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>Smart Kitchen</h2>
            <p>
              Smart Kitchen solutions help you plan, prep, and cook healthy
              meals effortlessly with ease and convenience
            </p>
          </div>
          <div className="row g-4 g-sm-3">
            {kitchenData.slice(0, 3).map((data) => (
              <div className="col-md-4 SmartKichinContent">
                <figure>
                  <img
                    className="w-100"
                    crossOrigin="anonymous"
                    src={data.image_url}
                  />
                </figure>
                <figcaption>
                  <h3>{data.name}</h3>
                  <p>{data.description}</p>
                  <button
                    onClick={() => downloadRecipe(data.id)}
                    className="btn btn-primary hvr-shutter-out-horizontal"
                  >
                    Download Recipe
                  </button>
                </figcaption>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to={"/smart-kitchen"}
              className="btn btn-info sm-btn hvr-shutter-out-horizontal"
            >
              Explore more such Recipes
            </Link>
          </div>
        </div>
      </section>

      <section className="MuktiBox">
        <div className="container">
          {/* <span className="butterflyshape">
            <img src={butterflyimg}></img>
          </span> */}

          <div className="buttergroup">
            {" "}
            <span className="butterflyone">
              <img src={butterfly1}></img>
            </span>
            <span className="butterflytwo">
              <img src={butterfly2}></img>
            </span>
            <span className="butterflythree">
              <img src={butterfly3}></img>
            </span>
            <span className="butterflyfour">
              <img src={butterfly4}></img>
            </span>
            <span className="butterflyfive">
              <img src={butterfly5}></img>
            </span>
          </div>

          <div className="row">
            <div className="MuktiBoxLeft">
              <img src={pixabayimg}></img>
            </div>

            <div className="col-md-6 ms-auto">
              <div className="MuktiBoxRight">
                <h3>introducing</h3>

                <figure>
                  <img src={MUKTEEImg}></img>
                </figure>

                <h4>~ A Deaddiction Program ~</h4>

                <p>
                  MUKTEE is the DEADDICTION program by dailyfitness.ai wherein
                  with physiological and psychological assistance, we add a new
                  dimension to your life, helping you win over the addictions.
                </p>

                <p>
                  Be it deaddiction from alcoholism or smoking or others, you’re
                  just one step away from availing the best solution.
                </p>

                <Link
                  to={"/service-details/muktee:-a-deaddiction-program"}
                  className="btn btn-primary sm-btn mt-3 hvr-shutter-out-horizontal"
                >
                  know more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="PosterSec transformationsuccess">
        <div className="container">
          <div className="PosterContent">
            <h2>TRANSFORMATION SUCCESS STORIES</h2>
            <p>
              It’s about discipline, consistency, and showing up for myself even
              on the hard days. The scale changed, yes — but so did my mindset,
              my energy, and my confidence.
            </p>
            <Link
              to={"/testimonials"}
              className="btn btn-primary hvr-shutter-out-horizontal"
            >
              read now
            </Link>
          </div>
        </div>
      </section>
      <section className="PosterSec empoweringhealth">
        <div className="container">
          <div className="PosterContent">
            <h2 className="text-uppercase">
              Empowering Your Health and Fitness Journey
            </h2>
            <p>
              At The Daily Fitness, we prioritize your health with personalized
              plans, expert guidance, and valuable resources, making wellness
              accessible from the comfort of your home. Join us today!
            </p>
            <Link
              to={"/all-packages"}
              className="btn btn-primary s-btn hvr-shutter-out-horizontal"
            >
              join
            </Link>
          </div>
        </div>
      </section>
      <section className="OurHealthBlog SectionSpace">
        <div className="container">
          <div className="PageTitle text-center ">
            <h2>our health blogs</h2>
            <p>
              You didn’t come this far to stop. Read our insightful articles on
              health and fitness.
            </p>
          </div>
          <div className="row OurHealthBlogRows g-lg-5 g-3  justify-content-center">
            {blogs.map((blog) => (
              <div className="col-lg-5 col-md-6  OurHealthBlogContent">
                <figure>
                  <Link
                    to={`/blog/${blog.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <img crossOrigin="anonymous" src={blog.image_url} />
                  </Link>
                </figure>
                <figcaption>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-GB")} .{" "}
                    {blog.readTime} min read
                  </span>
                  <Link
                    to={`/blog/${blog.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <h3>{blog.title}</h3>
                  </Link>
                </figcaption>
              </div>
            ))}
          </div>
          <div className="text-center ">
            <Link
              to={"/blogs"}
              style={{ width: "33%" }}
              className="btn btn-info hvr-shutter-out-horizontal w-33 mt-4"
            >
              view more
            </Link>
          </div>
        </div>
      </section>
      <section className="meetOurExperts SectionSpace">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>Meet Our Expert Wellness Team</h2>
            <p>
              We are a dedicated team of nutritionists, doctors, yoga
              instructors, and strength training coaches committed to your
              health and<br></br> wellness journey.
            </p>
            <Link
              to={"/about-us#MeetOurFamily"}
              className="btn btn-primary mt-4 hvr-shutter-out-horizontal"
            >
              meet our family
            </Link>
          </div>
          <div className="meetOurExpertscontentg">
            <span className="shape1">
              <img src={VectorImg} />
            </span>

            <span className="shape2">
              <img src={VectorImg} />
            </span>

            <span className="shape3">
              <img src={VectorImg} />
            </span>

            <span className="shape4">
              <img src={VectorImg} />
            </span>

            <span className="shape5">
              <img src={VectorImg} />
            </span>

            <span className="shape6">
              <img src={VectorImg} />
            </span>
            <div className="infobox infoboxLeft">
              <h4>150+</h4>
              <span>Health Experts</span>
            </div>

            <figure>
              <img src={MeetExperts}></img>
            </figure>

            <div className="infobox infoboxLeftRight">
              <h4>150+</h4>
              <span>Trusted Professionals</span>
            </div>
          </div>
        </div>
      </section>
      <section className="GetIntouch" id="GetInTouch">
        <span className="GetIntouchShape1">
          <img src={ContactLeft} />
        </span>
        <span className="GetIntouchShape2">
          <img src={ContactRight} />
        </span>
        <div className="container">
          <div className="row">
            <div className="col-md-6 GetIntouchLeft">
              <div className="contactimgbox">
                <figure>
                  <img src={ContactUs}></img>
                </figure>

                <div className="ContactUs">
                  <h3>Contact Us</h3>
                  <p>
                    Reach out to us for personalized health guidance and
                    consultation with our expert team at DailyFitness.
                  </p>

                  <ul className="ContactInfoList">
                    <li>
                      <img src={CallIcon}></img>
                      {contactUsDetails?.phone &&
                        contactUsDetails.phone.split(",").map((num, idx) => (
                          <span key={idx} className="me-2">
                            <a href={`tel:${num.trim()}`}>{num.trim()}</a>
                            {idx <
                              contactUsDetails.phone.split(",").length - 1 &&
                              " . "}
                          </span>
                        ))}
                    </li>
                    <li>
                      <img src={MsgeIcon}></img>
                      <a href={`mailto:${contactUsDetails?.email}`}>
                        {contactUsDetails?.email}
                      </a>
                    </li>
                  </ul>

                  <ul className="SoicalList">
                    <li>
                      <a
                        target="_blank"
                        href={`${contactUsDetails?.instagram}`}
                      >
                        <img src={InstaIcon}></img>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href={`${contactUsDetails?.twitter}`}>
                        <img src={TwitterIcon}></img>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href={`${contactUsDetails?.youtube}`}>
                        <img src={YoutUbeIcon}></img>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 GetIntouchRight">
              <form onSubmit={handleSubmit}>
                <div className="PageTitle">
                  <h2>Get in touch</h2>
                </div>
                <div className="row GetIntouchRows">
                  <div className="col-md-6 mb-3">
                    <label>Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[A-Za-z\s]*$/.test(value)) {
                          handleChange(e);
                        }
                      }}
                      placeholder="Enter your name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Email ID*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email id"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Contact Number</label>
                    <div className="contactInput">
                      <span>+91</span>
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d{0,10}$/.test(val)) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter your contact number"
                        className="form-control"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 checklistBox">
                    <label className="mb-3">You want to consult for :</label>
                    <ul className="form-checkList d-flex flex-wrap">
                      {allServices.map((service) => (
                        <li key={service.id}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`service-${service.id}`}
                              checked={formData.contactFor.includes(service.id)}
                              onChange={() => handleServiceToggle(service.id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`service-${service.id}`}
                            >
                              {service.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>{" "}
                    <div className="form-check" style={{ marginTop: "-14px" }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`service-`}
                        checked={formData.contactFor.includes("other")}
                        onChange={() => handleServiceToggle("other")}
                      />
                      <label className="form-check-label" htmlFor={`service-`}>
                        Others
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Type your message here"
                      required={formData.contactFor.includes("other")}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3 sm-btn hvr-shutter-out-horizontal"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;
