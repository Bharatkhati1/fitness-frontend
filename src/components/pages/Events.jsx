import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import calendericon1 from "../../../public/assets/img/calendericon1.png";
import LocationIcon from "./images/LocationIcon.svg";
import JoinUs from "./images/join-us.png";
import gettouch from "../../../public/assets/img/gettouch.png";
import calendericon2 from "../../../public/assets/img/calendericon2.png";
import calendericon3 from "../../../public/assets/img/calendericon3.png";
import calendericon4 from "../../../public/assets/img/calendericon4.png";

import whyattentimg1 from "../../../public/assets/img/whyattentimg1.png";
import whyattentimg2 from "../../../public/assets/img/whyattentimg2.png";
import whyattentimg3 from "../../../public/assets/img/whyattentimg3.png";
import whyattentimg4 from "../../../public/assets/img/whyattentimg4.png";

import shapewhy1 from "../../../public/assets/img/shape1.png";
import shapewhy2 from "../../../public/assets/img/shape2.png";
import shapewhy3 from "../../../public/assets/img/shape3.png";
import shapewhy4 from "../../../public/assets/img/shape4.png";

import girlimg from "../../../public/assets/img/girlimg.png";
import { toast } from "react-toastify";
import { webAxios } from "../../utils/constants.jsx";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes.jsx";
import { Link, useNavigate } from "react-router-dom";
import { sendInquiry } from "../../store/auth/AuthExtraReducers.jsx";

export default function Events() {
  const navigate = useNavigate();
  const [eventType, setEventTypes] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastevents, setPastEvents] = useState([]);
  const [eventCms, setEventCms] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openContactUsModal, setOpenContactusModal] = useState(false);
  const carouselRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    mobile: "",
    eventName: "",
    eventTime: "",
    termsAccepted: false,
  });

  const fetchAllUpcomingEvents = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_upcoming_events);
      setUpcomingEvents(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const fetchAllPastEvents = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_past_events);
      setPastEvents(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const res = await webAxios.get(
        userApiRoutes.get_master_categories("events")
      );
      setEventTypes(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const fetchCmsEvents = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_master_cms("event"));
      setEventCms(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleNavigate = () => {
    navigate(`/events-details/${pastevents[carouselRef?.current]?.slug}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      dob: "",
      mobile: "",
      eventName: "",
      eventTime: "",
      termsAccepted: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      return toast.error("You must accept the terms and conditions.");
    }

    const payload = {
      name: formData.name,
      dob: formData.dob,
      mobile: formData.mobile,
      eventName: formData.eventName,
      eventTime: formData.eventTime,
    };

    const toastId = toast.loading("Submitting your details...");

    try {
      await webAxios.post(userApiRoutes.apply_event, payload);

      toast.update(toastId, {
        render: "Application submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setIsModalOpen(false);
      setFormData({
        name: "",
        dob: "",
        mobile: "",
        role: "",
        eventName: "",
        eventTime: "",
        termsAccepted: false,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.error || "Submission failed. Try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  //for contact us*********************
  const [formDataContact, setFormDataContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChangeContact = (e) => {
    const { name, value } = e.target;
    setFormDataContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    const payload = {
      ...formDataContact,
      type: "inquiry",
    };
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formDataContact.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    await sendInquiry(payload);
    setOpenContactusModal(false);
    setFormDataContact({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const formatTimeTo12Hour = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  useEffect(() => {
    fetchAllPastEvents();
    fetchAllUpcomingEvents();
    fetchEventTypes();
    fetchCmsEvents();
  }, []);
  return (
    <>
      <div className="EventsBanner spacetop">
        <div className="EventsBannercontent ">
          <div className="container">
            <h3>{eventCms?.title}</h3>
            <p>{eventCms.description}</p>

            <div className="events-btn text-center mt-4">
              <a
                href="#upcomingevent"
                className="btn btn-primary max-btn me-3 hvr-shutter-out-horizontal"
              >
                view upcoming events
              </a>
              <a
                onClick={showModal}
                className="btn btn-primary max-btn hvr-shutter-out-horizontal"
              >
                register now
              </a>
            </div>
          </div>
        </div>
      </div>

      {upcomingEvents?.length > 0 && (
        <div className="upcomingevents" id="upcomingevent">
          <div className="container">
            <div class="PageTitle text-center">
              <h2>upcoming events</h2>
            </div>
            {upcomingEvents && upcomingEvents.length > 0 && (
              <OwlCarousel
                className="owl-theme"
                dots={false}
                items={3}
                merge={true}
                nav={true}
                margin={25}
                responsive={{
                  0: {
                    items: 1, // 0px and up
                  },
                  481: {
                    items: 1, // 0px and up
                  },
                  768: {
                    items: 2, // 600px and up
                  },
                  992: {
                    items: 2, // 600px and up
                  },
                  1200: {
                    items: 2, // 1000px and up
                  },
                }}
              >
                {upcomingEvents.map((event) => (
                  <div className="item">
                    <div className="upcomingbox">
                      <figure>
                        <img
                          crossOrigin="anonymous"
                          src={event.image_url}
                        ></img>
                      </figure>

                      <figcaption>
                        <h4>{event.title}</h4>

                        <ul className="eventinfolist">
                          <li>
                            <img src={calendericon1}></img>{" "}
                            <span>
                              {new Date(event.date)
                                .toLocaleDateString("en-GB")
                                .replaceAll("/", "-")}{" "}
                            </span>
                          </li>

                          {event.eventType == "Online" ? (
                            <li>
                              <img src={calendericon2}></img>{" "}
                              <span>{event.eventType}</span>
                            </li>
                          ) : (
                            <li>
                              <img src={LocationIcon}></img>{" "}
                              <span>{event.address}</span>
                            </li>
                          )}

                          <li>
                            <img src={calendericon3}></img>{" "}
                            <span>{formatTimeTo12Hour(event.time)}</span>
                          </li>

                          <li>
                            <img src={calendericon4}></img>{" "}
                            <span>{event.spots}</span>
                          </li>
                        </ul>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: event.description,
                          }}
                        ></p>

                        <div className="eventsbtn d-flex mt-3">
                          <Link
                            to={`/events-details/${event.slug}`}
                            className="btn btn-primary w-100 me-1 hvr-shutter-out-horizontal"
                          >
                            know more
                          </Link>
                          <a className="btn btn-primary w-100 ms-1 hvr-shutter-out-horizontal">
                            register now
                          </a>
                        </div>
                      </figcaption>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
            <div></div>
          </div>
        </div>
      )}

      {pastevents.length > 0 && (
        <div className="Pastevents mt-4">
          <div className="container">
            <div class="PageTitle text-center mb-3">
              <h2>past events highlights</h2>
              <b>Recap the Energy</b>
              <p>
                Our past events have brought together thousands of fitness
                enthusiasts, wellness experts, and health-conscious individuals
                from across the country. From full-body challenges and live yoga
                sessions to expert-led nutrition webinars and mental health
                panels—each event was designed to empower, educate, and energize
                our community.
              </p>
            </div>
            <div className="Pasteventsslider">
              {pastevents && pastevents.length > 0 && (
                <>
                  <OwlCarousel
                    className="owl-theme"
                    dots={false}
                    items={3}
                    nav={true}
                    margin={20}
                    ref={carouselRef}
                    center={true}
                    onChanged={(e) => {
                      carouselRef.current = e.item.index;
                    }}
                    responsive={{
                      0: {
                        items: 1, // 0px and up
                      },
                      481: {
                        items: 1, // 0px and up
                      },
                      768: {
                        items: 3, // 600px and up
                      },
                      992: {
                        items: 3, // 600px and up
                      },
                      1200: {
                        items: 3, // 1000px and up
                      },
                    }}
                  >
                    {pastevents.map((event) => (
                      <div className="item">
                        <div className="pasteventbox">
                          <img
                            crossOrigin="anonymous"
                            src={event.image_url}
                          ></img>
                          <div className="eventstext">{event.title}</div>
                        </div>
                      </div>
                    ))}
                  </OwlCarousel>
                  <div className="postbtn text-center mt-3">
                    <p
                      onClick={() => handleNavigate()}
                      className="btn btn-primary max-width hvr-shutter-out-horizontal"
                    >
                      know more
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="whyattentevent">
        <div className="container">
          <div class="PageTitle text-center">
            <h2>Why Attend Our Events ?</h2>
          </div>
          <div className="row">
            <div className="col ">
              <div className="whyattentbox">
                <span className="shapewhy">
                  <img src={shapewhy1}></img>
                </span>
                <figure>
                  <img src={whyattentimg1}></img>
                </figure>
                <h4>Stay updated with expert insights</h4>
              </div>
            </div>
            <div className="col ">
              <div className="whyattentbox">
                <span className="shapewhy">
                  <img src={shapewhy2}></img>
                </span>
                <figure>
                  <img src={whyattentimg2}></img>
                </figure>
                <h4>Learn new fitness strategies</h4>
              </div>
            </div>
            <div className="col ">
              <div className="whyattentbox">
                <span className="shapewhy">
                  <img src={shapewhy3}></img>
                </span>
                <figure>
                  <img src={whyattentimg3}></img>
                </figure>
                <h4>Connect with like-minded individuals</h4>
              </div>
            </div>
            <div className="col ">
              <div className="whyattentbox">
                <span className="shapewhy">
                  <img src={shapewhy4}></img>
                </span>
                <figure>
                  <img src={whyattentimg4}></img>
                </figure>
                <h4>Access free tools and resources</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="typeofevents">
        <div class="PageTitle text-center">
          <h2>Types of Events We Host</h2>
        </div>
        <div className="container">
          {eventType && eventType.length > 0 && (
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={4}
              nav={true}
              margin={10}
              // loop={true}
              responsive={{
                0: {
                  items: 1, // 0px and up
                },
                481: {
                  items: 1, // 0px and up
                },
                768: {
                  items: 2, // 600px and up
                },
                992: {
                  items: 3, // 600px and up
                },
                1200: {
                  items: 3, // 1000px and up
                },
              }}
            >
              {eventType.map((type) => (
                <div className="item">
                  <div className="typeseventsbox">
                    <figure>
                      <img crossOrigin="anonymous" src={type.image_url}></img>
                    </figure>

                    <figcaption>
                      <h4>{type.name}</h4>
                      <p>{type.description}</p>
                    </figcaption>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>

      <div className="gotquestions">
        <div className="container">
          <div className="gotquestionsbg">
            <div className="row align-items-center">
              <div className="col-md-9">
                <div className="gotquestionscontent">
                  <h4>Got a Question About Our Events?</h4>
                  <p>
                    Whether you're unsure about registrations, need help joining
                    a session, or just curious about what’s coming next — our
                    team’s got your back. Don’t hesitate, let’s get you sorted
                    in no time.
                  </p>
                  <a
                    onClick={() => setOpenContactusModal(true)}
                    className="btn btn-primary max-width hvr-shutter-out-horizontal"
                  >
                    contact us
                  </a>
                </div>
              </div>

              <div className="col">
                <figure>
                  <img src={girlimg} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join us Modal  */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal"
        centered
      >
        <div className="modalhead">
          <h3>We’re Excited to Have You!</h3>
        </div>

        <div className="modalbody">
          <p>
            Take the first step toward an enriching event experience. Fill out
            the form and we’ll make sure you’re informed, prepared, and excited
            to join.
          </p>

          <div className="row formmodal mt-4">
            <form onSubmit={handleSubmit} className="col-lg-6">
              <div className="form-group mb-2">
                <label>Full Name*</label>
                <input
                  placeholder="Enter your full name"
                  className="form-control"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-2">
                <label>Date of Birth*</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]} // This sets max date to today
                />
              </div>

              <div className="form-group mb-2">
                <label>Mobile Number*</label>
                <input
                  placeholder="Enter your mobile number"
                  className="form-control"
                  type="number"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-2">
                <label>Select Event</label>
                <select
                  className="form-control"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                >
                  <option value="">Select an event</option>
                  {upcomingEvents.map((event) => (
                    <option key={event.id} value={event.title}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label>Event Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="termsAccepted"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsAccepted: e.target.checked,
                    })
                  }
                  required
                />
                <label className="form-check-label" htmlFor="termsAccepted">
                  I accept the Terms and Conditions
                </label>
              </div>

              <button className="btn btn-primary max-btn mt-4" type="submit">
                Apply Now
              </button>
            </form>

            <div className="col-lg-6">
              <figure className="JoinImgvaerticle">
                <img src={JoinUs} alt="Join Team" />
              </figure>
            </div>
          </div>
        </div>
      </Modal>

      {/* Contact us modal  */}
      <Modal
        open={openContactUsModal}
        onCancel={() => setOpenContactusModal(false)}
        className="custom-modal"
        centered
      >
        <form className="getintouchinner" onSubmit={handleSubmitContact}>
          <div className="row align-items-center">
            <div className="col-md-6 getintouchinnerleft">
              <h4>Get in Touch with Us</h4>
              <p>We'd love to hear from you! Contact us anytime.</p>
              <figure>
                <img src={gettouch} />
              </figure>
            </div>
            <div className="col-md-6">
              <div className="row GetIntouchinnerright">
                <div className="col-md-7 mb-3">
                  <label>First Name*</label>
                  <input
                    name="name"
                    value={formDataContact.name}
                    onChange={handleChangeContact}
                    placeholder="Enter your first name"
                    className="form-control greyin"
                    type="text"
                    required
                  />
                </div>
                <div className="col-md-7 mb-3">
                  <label>Email ID*</label>
                  <input
                    name="email"
                    value={formDataContact.email}
                    onChange={handleChangeContact}
                    placeholder="Enter your email id"
                    className="form-control greyin"
                    type="email"
                    required
                  />
                </div>
                <div className="col-md-7 mb-3">
                  <label>Contact Number*</label>
                  <div className="contactInput">
                    <span className="greyin">+91</span>
                    <input
                      name="phone"
                      value={formDataContact.phone}
                      onChange={handleChangeContact}
                      placeholder="Enter your contact number"
                      className="form-control greyin"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formDataContact.message}
                    onChange={handleChangeContact}
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
      </Modal>
    </>
  );
}
