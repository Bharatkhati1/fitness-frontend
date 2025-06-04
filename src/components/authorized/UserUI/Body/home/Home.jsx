import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import TagCheckIcon from "../../../../../../public/assets/img/tagCheck.png";
import Tagcircle from "../../../../../../public/assets/img/BannerCircle.svg";
import ShapeLeft from "../../../../../../public/assets/img/bannerShapeLeft.png";
import ShapeRight from "../../../../../../public/assets/img/bannerShapeRight.png";
import wightLosssChart from "../../../../../../public/assets/img/about-us.svg";
import SmartKichinImg1 from "../../../../../../public/assets/img/SmartKichinImg1.png";
import SmartKichinImg2 from "../../../../../../public/assets/img/SmartKichinImg2.png";
import SmartKichinImg3 from "../../../../../../public/assets/img/SmartKichinImg3.png";
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
import { webAxios } from "../../../../../utils/Api/userAxios";
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
import { getKitchenData } from "../../../../../store/auth/AuthExtraReducers";
import { useDispatch } from "react-redux";
import EmailRequiredPopup from "../../EmailRequiredpopup";

function Home() {
  const dispatch = useDispatch();
  const {
    allServices = [],
    services = [],
    kitchenData = [],
    isLoggedIn,
  } = useSelector((state) => state.auth);
  const [sliders, setSliders] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [openEmailRequiredPopup, setOpenEmailRequiredPopup] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const getSliders = async () => {
    try {
      const response = await webAxios.get(userApiRoutes.get_sliders);
      setSliders(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch sliders");
    }
  };

  const getBlogs = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_blogs({ limit: 4 })
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

    const promise = webAxios.post(userApiRoutes.download_recipe(id));

    toast.promise(promise, {
      pending: "Downloading recipe...",
      success: "Recipe downloaded successfully!",
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message || "Failed to download : Server Error"
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
        <span className="shapeImgLeft">
          <img src={ShapeLeft} />
        </span>
        <span className="shapeImgRight">
          <img src={ShapeRight} />
        </span>

        <div className="circletagShapeBox">
          <img className="heartBeatImg" src={heartbeat} alt="" />
          <span className="circletagShape">
            {" "}
            <img src={Tagcircle} />
          </span>
        </div>
        {sliders.length > 0 && (
          <OwlCarousel
            autoplay={true}
            dots={true}
            items={1}
            className="owl-theme"
            autoplaySpeed={1000}
            autoplayTimeout={5000}
            loop
            margin={0}
            nav={true}
            navText={[prevArrow, nextArrow]}
          >
            {sliders.map((slider) => (
              <div>
                <div className="container h-100">
                  <div className="row align-items-center">
                    <div className="col-md-6 bannerSectionLeft pe-0">
                      <span className="BestTag">
                        <img src={TagCheckIcon} />
                        The Best in Town
                      </span>
                      <h1 className="mb-1">{slider.heading}</h1>
                      <p className="owl-p">{slider.subHeading}</p>
                      <ul className="ClientListinfo d-flex">
                        <li>
                          <div className="ClientInfo">
                            <b>150+</b>
                            <p>Happy Clients</p>
                          </div>
                        </li>
                        <li>
                          <div className="ClientInfo">
                            <b>15</b>
                            <p>Years of Experience</p>
                          </div>
                        </li>
                      </ul>
                      <div className="BannerBtn d-flex">
                        <Link
                          className="hvr-shutter-out-horizontal"
                          to={"/all-packages"}
                        >
                          Join Now
                        </Link>
                        <Link className="hvr-shutter-out-horizontal">
                          book a trial
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6 bannerSectionRight ps-5 justify-content-end">
                      <div className="bannerSectionInner">
                        <div class="item">
                          <figure>
                            <img
                              crossOrigin="annoymous"
                              src={slider.image_url}
                            />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                We’re not just another weight loss website we’re your &nbsp;
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
      <section className="OurServices bg-solid">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>OUR SERVICES</h2>
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
              navText={[prevArrow, nextArrow]}
              autoplaySpeed={3000}
              autoplayTimeout={9000}
            >
              {services?.map((group, index) => (
                <div className="row" key={index}>
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
                          <figure>
                            <img
                              crossOrigin="anonymous"
                              src={srv.image_url}
                              alt={srv.name}
                            />
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
                            <div className="gap-3 service-btn text-center">
                              {showButton("Know more") && (
                                <Link
                                  to={`/service-details/${srv.name
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  className="me-1 mb-1 btn btn-primary hvr-shutter-out-horizontal"
                                >
                                  Know more
                                </Link>
                              )}

                              {showButton("Talk to an Expert") && (
                                <a
                                  href="#GetInTouch"
                                  className="btn btn-primary hvr-shutter-out-horizontal"
                                >
                                  Talk to an Expert
                                </a>
                              )}

                              {showButton("Contact our Helpline") && (
                                <a
                                  href="#GetInTouch"
                                  className="btn btn-primary hvr-shutter-out-horizontal"
                                >
                                  Contact our Helpline
                                </a>
                              )}
                            </div>
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
      <section className="WhyChoose">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>
              WHY CHOOSE US :<span>Empower Your Health</span>
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
            src="assets/video/01.mp4"
            width="100%"
            loop
            height="509"
            controls={true}
            muted
            playsInline
          />
        </div>
      </section>
      <section className="SmartKichin">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>Smart Kitchen</h2>
            <p>
              Smart Kitchen solutions help you plan, prep, and cook healthy
              meals effortlessly with ease and convenience
            </p>
          </div>
          <div className="row">
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
                    download recipe
                  </button>
                </figcaption>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to={"/smart-kitchen"}
              className="btn btn-info hvr-shutter-out-horizontal"
            >
              View More
            </Link>
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
      <section className="OurHealthBlog">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>our health blogs</h2>
            <p>
              You didn’t come this far to stop. Read our insightful articles on
              health and fitness.
            </p>
          </div>
          <div className="row OurHealthBlogRows">
            {blogs.map((blog) => (
              <div className="col-md-6 OurHealthBlogContent">
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
                    {new Date(blog.createdAt).toLocaleDateString("en-GB")}
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
          <div className="text-center btn-sec mt-4">
            <Link
              to={"/blogs"}
              className="btn btn-primary s-btn hvr-shutter-out-horizontal"
            >
              view All
            </Link>
          </div>
        </div>
      </section>
      <section className="meetOurExperts">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>Meet Our Expert Wellness Team</h2>
            <p>
              We are a dedicated team of nutritionists, doctors, yoga
              instructors, and strength training coaches committed to your
              health and wellness journey.
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
              <div className="ContactUs">
                <h3>Contact Us</h3>
                <p>
                  Reach out to us for personalized health guidance and
                  consultation with our expert team at DailyFitness.
                </p>

                <ul className="ContactInfoList">
                  <li>
                    <img src={CallIcon}></img>
                    <span>
                      <a href="tel:918839036035">(+91) 8839036035</a> .{" "}
                      <a href="tel:919891775250">(+91) 9891775250</a>
                    </span>
                  </li>
                  <li>
                    <img src={MsgeIcon}></img>
                    <a href="mailto:info@dailyfitness.ai">
                      info@dailyfitness.ai
                    </a>
                  </li>
                </ul>

                <ul className="SoicalList">
                  <li>
                    <a>
                      <img src={InstaIcon}></img>
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={TwitterIcon}></img>
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={YoutUbeIcon}></img>
                    </a>
                  </li>
                </ul>
              </div>
              <figure>
                <img src={ContactUs}></img>
              </figure>
            </div>
            <div className="col-md-6 GetIntouchRight">
              <div className="PageTitle">
                <h2>Get in touch</h2>
              </div>
              <div className="row GetIntouchRows">
                <div className="col-md-6 mb-3">
                  <label>First Name*</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="form-control"
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email ID*</label>
                  <input
                    type="text"
                    placeholder="Enter your email id"
                    className="form-control"
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Contact Number*</label>
                  <div className="contactInput">
                    <span>+91</span>
                    <input
                      type="text"
                      placeholder="Enter your contact number"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-md-12 checklistBox ">
                  <label className="mb-3">You want to consult for :</label>
                  <ul className="form-checkList d-flex">
                    {allServices.map((service) => (
                      <li>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckChecked"
                          >
                            {service.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-md-12">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    placeholder="Type your message here"
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <button className="btn btn-primary mt-3 max-btn hvr-shutter-out-horizontal">
                    submit
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
export default Home;
