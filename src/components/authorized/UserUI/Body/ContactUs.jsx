import React, { useState } from "react";
import gIcon1 from "../../../../../public/assets/img/gIcon1.svg";
import gIcon2 from "../../../../../public/assets/img/gIcon2.svg";
import gIcon3 from "../../../../../public/assets/img/gIcon3.svg";
import Ginstaicon from "../../../../../public/assets/img/Ginstaicon.png";
import Gtweeter from "../../../../../public/assets/img/Gtweeter.png";
import cyoutubeIcon from "../../../../../public/assets/img/cyoutubeIcon.png";
import gettouch from "../../../../../public/assets/img/gettouch.png";
import { useSelector } from "react-redux";
import JoinCommunity from "./Modals/JoinCommunity";

// Dummy function for demonstration — replace with actual API call
const sendInquiry = async (data) => {
  console.log("Form submitted:", data);
};

function ContactUs() {
  const { allServices = [] } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedServices: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (serviceName) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceName);
      const updatedServices = exists
        ? prev.selectedServices.filter((s) => s !== serviceName)
        : [...prev.selectedServices, serviceName];
      return { ...prev, selectedServices: updatedServices };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendInquiry(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      selectedServices: [],
    });
  };

  return (
    <>
    <JoinCommunity open={open} setOpen={setOpen}/>
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
                  <figure><img src={gIcon1} /></figure>
                  <figcaption>
                    <h5>PHONE</h5>
                    <div className="textlink d-flex justify-content-center">
                      <a href="tel:918839036035">(+91) 8839036035</a>&nbsp;.
                      <a href="tel:919891775250">(+91) 9891775250</a>
                    </div>
                  </figcaption>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contactinfobox">
                  <figure><img src={gIcon2} /></figure>
                  <figcaption>
                    <h5>EMAIL ADDRESS</h5>
                    <div className="textlink d-flex justify-content-center">
                      <a href="mailto:info@dailyfitness.ai">info@dailyfitness.ai</a>
                    </div>
                  </figcaption>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contactinfobox">
                  <figure><img src={gIcon3} /></figure>
                  <figcaption>
                    <h5>SOCIAL MEDIA</h5>
                    <ul className="userslink d-flex justify-content-center">
                      <li><a><img src={Ginstaicon} /></a></li>
                      <li><a><img src={Gtweeter} /></a></li>
                      <li><a><img src={cyoutubeIcon} /></a></li>
                    </ul>
                  </figcaption>
                </div>
              </div>
            </div>
          </div>

          <form className="getintouchinner" onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-md-6 getintouchinnerleft">
                <h4>Get in Touch with Us</h4>
                <p>We'd love to hear from you! Contact us anytime.</p>
                <figure><img src={gettouch} /></figure>
              </div>
              <div className="col-md-6">
                <div className="row GetIntouchinnerright">
                  <div className="col-md-6 mb-3">
                    <label>First Name*</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="form-control greyin"
                      type="text"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Email ID*</label>
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
                  <div className="col-md-6 mb-3">
                    <label>Contact Number*</label>
                    <div className="contactInput">
                      <span className="greyin">+91</span>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
                        className="form-control greyin"
                        type="tel"
                        required
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
                              checked={formData.selectedServices.includes(service.name)}
                              onChange={() => handleCheckboxChange(service.name)}
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
                Join our WhatsApp health community today! Connect with like-minded
                individuals and get valuable health insights and support, free of cost.
              </p>
              <a onClick={()=>setOpen(true)}  className="btn btn-primary hvr-shutter-out-horizontal">
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
