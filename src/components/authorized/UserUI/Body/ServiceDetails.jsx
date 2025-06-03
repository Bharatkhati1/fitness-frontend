import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { webAxios } from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
// import JoinImg from "../../../../../public/assets/img/JoinImg.png";
import ContactLeft from "../../../../../public/assets/img/ContactShAPe1.png";
import ContactRight from "../../../../../public/assets/img/ContactShAPe2.png";

import CallIcon from "../../../../../public/assets/img/callIcon.png";
import MsgeIcon from "../../../../../public/assets/img/Mesgeicon.png";
import InstaIcon from "../../../../../public/assets/img/instagraIcon.png";
import TwitterIcon from "../../../../../public/assets/img/twitterIcon.png";
import YoutUbeIcon from "../../../../../public/assets/img/YoutubeIcon.png";

import ContactUs from "../../../../../public/assets/img/contactUs.png";


import { Button, Modal } from "antd";
import { useSelector } from "react-redux";

function ServiceDetails() {
  const { slug } = useParams();
  const [details, setDetails] = useState({});
  const {allServices=[]} = useSelector((state)=>  state.auth)

  const fetchServiceDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_service_details(slug)
      );
      setDetails(response.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(html); // optional sanitization
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  useEffect(() => {
    fetchServiceDetails();
  }, [slug]);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
  
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
  


  return (
    <>
      <section className="innerbanner">
        <figure>
          <img crossOrigin="anonymous" src={details?.banner_url} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{details?.name}</h2>
            <p>{stripHtml(details?.shortDescription)}</p>
          </div>
        </div>
      </section>

      <div className="sectionSpace servicedetail">
        <div className="container">
          <p className="text-center">{stripHtml(details?.description)}</p>

          <div className="row servicedetaillisting">
            {details?.Packages?.map((pkg) => {
              const parsedActions = JSON.parse(pkg.actions || "[]");
              const actionNames = parsedActions.map((action) => action.name);
              const showButton = (label) => actionNames.includes(label);

              return (
                <div className="col-md-6" key={pkg.id}>
                  <figure>
                    <img crossOrigin="anonymous" src={pkg.image_url} />
                  </figure>

                  <figcaption>
                    <h3>{pkg.name}</h3>
                    <p>{stripHtml(pkg.description)}</p>

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
                         .replace(/\s+/g, "-")}/doctor/${btoa(pkg.id)}`}
                       className="btn btn-primary hvr-shutter-out-horizontal"
                     >
                          Consult a Doctor
                          </Link>
                      )}
                      {showButton("Talk to a Therapist") && (
                        <Link
                          to={`/experts/${pkg.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}/therapist/${btoa(pkg.id)}`}
                          className="btn btn-primary hvr-shutter-out-horizontal"
                        >
                          Talk to a Therapist
                        </Link>
                      )}
                     
                    </div>
                  </figcaption>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      
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
            

       
            </div>
          </>,
        ]}
      ></Modal>
    </>
  );
}

export default ServiceDetails;
