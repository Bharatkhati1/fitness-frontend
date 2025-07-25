import React, { useState, useRef } from "react";
import gIcon1 from "../../../../../public/assets/img/gIcon1.svg";
import gIcon2 from "../../../../../public/assets/img/gIcon2.svg";
import gIcon3 from "../../../../../public/assets/img/gIcon3.svg";
import Ginstaicon from "../../../../../public/assets/img/Ginstaicon.png";
import Gtweeter from "../../../../../public/assets/img/Gtweeter.png";
import cyoutubeIcon from "../../../../../public/assets/img/cyoutubeIcon.png";
import gettouch from "../../../../../public/assets/img/gettouch.png";
import { useSelector } from "react-redux";
import JoinCommunity from "./Modals/JoinCommunity";
import { sendInquiry } from "../../../../store/auth/AuthExtraReducers";
import { toast } from "react-toastify";

import linkedin from "../../../../../public/assets/img/linkedin.png";

function ContactUs() {
  const { allServices = [], contactUsDetails = {} } = useSelector(
    (state) => state.auth
  );
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    contactFor: [],
  });
  const phoneDefault = useRef("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (serviceName) => {
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

  return (
    <>
      <JoinCommunity open={open} setOpen={setOpen} />
      <section className="InnerpageSpace bgpettern">
        <div className="container">
          <div className="InnerPageTitle">
            <h4>contact us</h4>
            <p>
              Reach out to us via email, phone, or social media for any
              inquiries or support you may need.
            </p>
          </div>
          <div className="contactinfo">
            <div className="row">
              <div className="col-md-4">
                <div className="contactinfobox">
                  <figure>
                    <img src={gIcon1} />
                  </figure>
                  <figcaption>
                    <h5>PHONE</h5>
                    <div className="textlink d-flex justify-content-center">
                      {contactUsDetails?.phone &&
                        contactUsDetails.phone.split(",").map((num, idx) => (
                          <span key={idx} className="me-2">
                            <a href={`tel:${num.trim()}`}>{num.trim()}</a>
                            {idx <
                              contactUsDetails.phone.split(",").length - 1 &&
                              " . "}
                          </span>
                        ))}
                    </div>
                  </figcaption>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contactinfobox">
                  <figure>
                    <img src={gIcon2} />
                  </figure>
                  <figcaption>
                    <h5>EMAIL ADDRESS</h5>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&to=${contactUsDetails?.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactUsDetails?.email}
                    </a>
                  </figcaption>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contactinfobox">
                  <figure>
                    <img src={gIcon3} />
                  </figure>
                  <figcaption>
                    <h5>SOCIAL MEDIA</h5>
                    <ul className="userslink d-flex justify-content-center">
                      <li>
                        <a
                          href={`${contactUsDetails?.instagram}`}
                          target="_blank"
                        >
                          <img src={Ginstaicon} />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={`${contactUsDetails?.twitter}`}
                        >
                          <img src={Gtweeter} />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={`${contactUsDetails?.youtube}`}
                        >
                          <img src={cyoutubeIcon} />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={`${contactUsDetails?.linkedin}`}
                          className="linkedinimg"
                        >
                          <img src={linkedin} />
                        </a>
                      </li>
                    </ul>
                  </figcaption>
                </div>
              </div>
            </div>
          </div>

          <form
            className="getintouchinner contactuspage"
            onSubmit={handleSubmit}
          >
            <div className="row ">
              <div className="col-md-6 getintouchinnerleft pt-5">
                <h4>Get in Touch with Us</h4>
                <p>We'd love to hear from you! Contact us anytime.</p>
                <figure>
                  <img src={gettouch} />
                </figure>
              </div>
              <div className="col-md-6">
                <div className="row GetIntouchinnerright">
                  <div className="col-md-6 mb-3">
                    <label>Your Name*</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[A-Za-z\s]*$/.test(value)) {
                          handleChange(e);
                        }
                      }}
                      placeholder="Enter your name"
                      className="form-control greyin"
                      type="text"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3"></div>

                  <div className="col-md-6 mb-3">
                    <label>Your Email ID*</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email id"
                      className="form-control greyin"
                      type="email"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3"></div>
                  <div className="col-md-6 mb-3">
                    <label>Your Contact Number</label>
                    <div className="contactInput">
                      <span className="greyin">+91</span>
                      <input
                        placeholder="Enter your contact number"
                        className="form-control greyin"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        maxLength={10}
                        onInput={(e) => {
                          const input = e.target.value;
                          const regex = /^[0-9]*$/; 
                          if (regex.test(input)) {
                            if (input.length <= 10) {
                              phoneDefault.current = input;
                              handleChange({
                                target: { name: "phone", value: input },
                              });
                            } else {
                              e.target.value = phoneDefault.current;
                            }
                          } else {
                            e.target.value = phoneDefault.current;
                          }
                        }}
                      
                      />
                    </div>
                  </div>
                  <div className="col-md-12 checklistBox mb-2">
                    <label className="mb-3">You want to consult for :</label>
                    <ul className="form-checkList d-flex flex-wrap">
                      {allServices.map((service) => (
                        <li key={service.id}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`check-${service.id}`}
                              checked={formData.contactFor.includes(service.id)}
                              onChange={() => handleCheckboxChange(service.id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`check-${service.id}`}
                            >
                              {service.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="form-check">
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
                      className="form-control greyin"
                      placeholder="Type your message here"
                    ></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3 max-btn hvr-shutter-out-horizontal"
                    >
                      submit your inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="JoinourhealthMain mb-4">
        <div className="container">
          <div className="Joinourhealth">
            <div className="JoinourhealthContent">
              <h3>join our health community</h3>
              <p>
                Join our WhatsApp health community today! Connect with
                like-minded individuals and get valuable health insights and
                support, free of cost.
              </p>
              <a
                onClick={() => setOpen(true)}
                className="btn btn-primary hvr-shutter-out-horizontal"
              >
                join our free community
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
