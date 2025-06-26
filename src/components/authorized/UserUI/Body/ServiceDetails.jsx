import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { webAxios } from "../../../../utils/constants";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import CallIcon from "../../../../../public/assets/img/callIcon.png";
import MsgeIcon from "../../../../../public/assets/img/Mesgeicon.png";
import InstaIcon from "../../../../../public/assets/img/instagraIcon.png";
import TwitterIcon from "../../../../../public/assets/img/twitterIcon.png";
import YoutUbeIcon from "../../../../../public/assets/img/YoutubeIcon.png";
import ContactUs from "../../../../../public/assets/img/contactUs.png";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import Whyus from "./Whyus";

function ServiceDetails() {
  const { slug } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const { allServices = [] } = useSelector((state) => state.auth);

  const fetchServiceDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_service_details(slug)
      );

      setDetails(response.data.data);
      const servicesData = response?.data?.data?.Packages;
      const chunkSize = 4;
      const chunkedServices = [];
      for (let i = 0; i < servicesData.length; i += chunkSize) {
        chunkedServices.push(servicesData.slice(i, i + chunkSize));
      }
      setPackages(chunkedServices);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [slug]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
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

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img crossOrigin="anonymous" src={details?.banner_url} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{details?.name}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: details?.shortDescription,
              }}
            />
          </div>
        </div>
      </section>

      <div className="sectionSpace ">
        <div className="container">
          <p
            className="m-0"
            style={{
              minHeight: "auto",
            }}
            dangerouslySetInnerHTML={{
              __html: details?.description,
            }}
          ></p>
        </div>
      </div>
      
      {details?.story_image_url && (
        <div
        className="our-approachmain position-relative pt-4 pb-4"
      >
        <div className="">
            <img crossOrigin="anonymous" className="approach-image" src={details.story_image_url} alt="Approach Image" />
        </div>
          <div className="container">
            <div className="app-middle-content">
            <div className="PageTitle text-center pb-3">
              <h2 className="text-white">our approach</h2>
            </div>

            <ul className="ourapproachlist">
              <li>
                <span>1</span>
                <div className="content">
                  <p>Root Cause Analysis of your issues by the experts</p>
                </div>
              </li>

              <li>
                <span>2</span>
                <div className="content">
                  <p>
                    Providing you with best customised services and
                    consultations with sustainable solutions
                  </p>
                </div>
              </li>

              <li>
                <span>3</span>
                <div className="content">
                  <p>Regular follow ups and updates</p>
                </div>
              </li>
              <li>
                <span>4</span>
                <div className="content">
                  <p>Thorough and proactive customer service</p>
                </div>
              </li>
              <li>
                <span>5</span>
                <div className="content">
                  <p>Respecting your privacy</p>
                </div>
              </li>
            </ul>
            </div>
          </div>
        </div>
      )}

      <section className="sectionSpace servicedetail main-packge pb-0">
        <div className="container">
          <div className="PageTitle text-center">
            {Array.isArray(packages) && packages.length > 0 && (
              <h2>our packages</h2>
            )}
          </div>

          <div className="px-xxl-0 px-3">
            <div className="row servicedetaillisting">
              {Array.isArray(packages) &&
              packages.length > 0 &&
              Array.isArray(packages[0]) && (
                <OwlCarousel
                  className="owl-theme"
                  autoplay={false}
                  dots={true}
                  items={1}
                  margin={10}
                  nav={true}
                  navText={[prevArrow, nextArrow]}
                  autoplaySpeed={3000}
                  autoplayTimeout={9000}
                >
                  {packages?.map((group, index) => (
                    <div className="row" key={index}>
                      {group.map((pkg, idx) => {
                        const parsedActions = JSON.parse(pkg.actions || "[]");
                        const actionNames = parsedActions.map(
                          (action) => action.name
                        );
                        const showButton = (label) =>
                          actionNames.includes(label);
                        return (
                          <div className="col-md-6" key={idx}>
                            <div className="OurServicesContent">
                              <figure>
                                <img
                                  crossOrigin="anonymous"
                                  src={pkg.image_url}
                                />
                              </figure>
                              <figcaption>
                                <h3>{pkg.name}</h3>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: pkg?.shortDescription,
                                  }}
                                />

                                <div className="btn-group-box">
                                  {showButton("Know more") && (
                                    <Link
                                      to={`/package/${pkg.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                      className="btn btn-primary hvr-shutter-out-horizontal"
                                    >
                                      Know More
                                    </Link>
                                  )}
                                  {showButton("Consult a Doctor") && (
                                    <Link
                                      to={`/experts/${pkg.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}/doctor/${btoa(
                                        pkg.id
                                      )}`}
                                      className="btn btn-primary hvr-shutter-out-horizontal"
                                    >
                                      Consult a Doctor
                                    </Link>
                                  )}
                                  {showButton("Talk to a Therapist") && (
                                    <Link
                                      to={`/experts/${pkg.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}/therapist/${btoa(
                                        pkg.id
                                      )}`}
                                      className="btn btn-primary hvr-shutter-out-horizontal"
                                    >
                                      Talk to a Therapist
                                    </Link>
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
              ) }
            </div>
          </div>
        
        </div>

          <Whyus/>
      </section>

      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal CustomXs"
        footer={[
          <>
            <div className="modalbody">
              <div className="GetIntouch" id="GetInTouch">
                <div className="row align-items-center">
                  <div className="col-md-6 GetIntouchLeft">
                    <div className="ContactUs">
                      <h3>Contact Us</h3>
                      <p>
                        Reach out to us for personalized health guidance and
                        consultation with our expert team at TheDailyFitness.
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
                        <label className="mb-3">
                          You want to consult for :
                        </label>
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
            </div>
          </>,
        ]}
      ></Modal>
    </>
  );
}

export default ServiceDetails;
