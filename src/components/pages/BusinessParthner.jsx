import React, { useEffect, useState } from "react";
import Businesspartnersbg from "../../../public/assets/img/Businesspartnersbg.png";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import centeruserimg from "../../../public/assets/img/centeruserimg.png";

import whyparthnericon1 from "../../../public/assets/img/whyparthnericon1.png";
import whyparthnericon2 from "../../../public/assets/img/whyparthnericon2.png";
import whyparthnericon3 from "../../../public/assets/img/whyparthnericon3.png";
import whyparthnericon4 from "../../../public/assets/img/whyparthnericon4.png";
import whyparthnericon5 from "../../../public/assets/img/whyparthnericon5.png";
import whyparthnericon6 from "../../../public/assets/img/whyparthnericon6.png";

import bordersep from "../../../public/assets/img/border-sep.png";
import gettouch from "../../../public/assets/img/gettouch.png";
import { toast } from "react-toastify";
import { webAxios } from "../../utils/constants";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { sendInquiry } from "../../store/auth/AuthExtraReducers";

function BusinessParthner() {
  const [categorypartner, setcategorypartner] = useState([]);

  const fetchPartners = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_partners);
      setcategorypartner(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      type: "inquiry",
    };
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    await sendInquiry(payload);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  useEffect(() => {
    fetchPartners();
  }, []);
  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={Businesspartnersbg} />
        </figure>

        <div className="zigzagtextcontent">
          <div className="zigzagtext text-start">
            <h3>joining hands</h3>
          </div>

          <div className="zigzagtext text-center">
            <h3>expanding wings</h3>
          </div>

          <div className="zigzagtext text-end">
            <h3>serving mankind</h3>
          </div>
        </div>
      </section>

      <div className="whypartner">
        <div className="container">
          <div class="PageTitle text-center">
            <h2>why partner with us ?</h2>
            <p>Collaborating for better tomorrow</p>
          </div>

          <div className="row align-items-center">
            <div className="col">
              <ul className="whyparthnerlist">
                <li>
                  <figcaption>
                    <h4>Integrated Wellness Collaboration</h4>
                    <p>
                      Partner to offer preventive health programs, fitness
                      assessments, and early diagnosis solutions through a
                      connected digital health ecosystem.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon1}></img>
                  </figure>
                </li>

                <li>
                  <figcaption>
                    <h4>Employee Fitness & Lifestyle Programs</h4>
                    <p>
                      Deliver measurable workplace wellness through fitness
                      challenges, health screenings, and nutrition
                      counseling—boosting productivity and reducing absenteeism.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon2}></img>
                  </figure>
                </li>

                <li>
                  <figcaption>
                    <h4>Youth Health Empowerment Initiatives</h4>
                    <p>
                      Collaborate on building active, aware communities by
                      promoting fitness education, personalized fitness plans,
                      and health camps in academic institutions.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon3}></img>
                  </figure>
                </li>
              </ul>
            </div>

            <div className="col-md-4 text-center">
              <figure className="centerImg">
                <img src={centeruserimg}></img>
              </figure>
            </div>

            <div className="col">
              <ul className="whyparthnerlist whyp-odd">
                <li>
                  <figcaption>
                    <h4>Healthy Eating Integration</h4>
                    <p>
                      Showcase wholesome and calorie-conscious meals through our
                      platform as part of curated fitness-based diet plans and
                      lifestyle goals.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon4}></img>
                  </figure>
                </li>

                <li>
                  <figcaption>
                    <h4>Holistic Health Engagement</h4>
                    <p>
                      Deliver mental and physical wellness through yoga
                      sessions, mindfulness programs, and lifestyle coaching for
                      our fitness-first community.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon5}></img>
                  </figure>
                </li>

                <li>
                  <figcaption>
                    <h4>Active Lifestyle Merchandise</h4>
                    <p>
                      Promote fitness gear, activewear, and accessories to
                      health-conscious users, integrating your brand into daily
                      workouts and events.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon6}></img>
                  </figure>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="partnerssec">
        <div className="container">
          {categorypartner.map((category, index) => (
            <div className="medicalpartners">
              {category?.Partners && category.Partners.length > 0 && (
                <>
                  {" "}
                  <div class="PageTitle text-center">
                    <h2>{category.name}</h2>
                  </div>
                  <OwlCarousel
                    className="owl-theme"
                    dots={false}
                    items={4}
                    merge={true}
                    nav={true}
                    margin={30}
                  >
                    {category.Partners.map((ptr) => (
                      <>
                        <div className="item">
                          <div>
                            <div className="partnerssecbox">
                              <figure>
                                <img
                                  crossOrigin="anonymous"
                                  src={ptr.image_url}
                                ></img>
                              </figure>

                              <h3>{ptr.name}</h3>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </OwlCarousel>
                </>
              )}
              {category?.Partners.length > 0 &&
                index != categorypartner?.length - 1 && (
                  <div className="sepratebox mt-4 mb-4">
                    <img src={bordersep}></img>
                  </div>
                )}
            </div>
          ))}

          <form className="getintouchinner" onSubmit={handleSubmit}>
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
                      />
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
      </div>
    </>
  );
}

export default BusinessParthner;
