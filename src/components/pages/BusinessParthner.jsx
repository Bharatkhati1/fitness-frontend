import React from "react";
import Businesspartnersbg from "../../../public/assets/img/Businesspartnersbg.png";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";

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

import medicalparthners from "../../../public/assets/img/medical-parthnersimg.png";
import corporatepartnersimg from "../../../public/assets/img/corporatepartnersimg.png";
import instituteimg from "../../../public/assets/img/instituteimg.png";
import restaurantimg from "../../../public/assets/img/restaurantimg.png";

import bordersep from "../../../public/assets/img/border-sep.png";
import gettouch from "../../../public/assets/img/gettouch.png";

function BusinessParthner() {
  return (
    <>
      <Header />
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
          <div className="medicalpartners">
            <div class="PageTitle text-center">
              <h2>medical partners</h2>
            </div>
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={4}
              merge={true}
              nav={true}
              margin={30}
              loop={true}
            >
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={medicalparthners}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={medicalparthners}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={medicalparthners}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={medicalparthners}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={medicalparthners}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={medicalparthners}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>

          <div className="sepratebox mt-4 mb-4">
            <img src={bordersep}></img>
          </div>

          <div className="corporatepartners">
            <div class="PageTitle text-center">
              <h2>corporate partners</h2>
            </div>
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={4}
              merge={true}
              nav={true}
              margin={30}
              loop={true}
            >
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={corporatepartnersimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={corporatepartnersimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={corporatepartnersimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={corporatepartnersimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={corporatepartnersimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={corporatepartnersimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>

          <div className="sepratebox mt-4 mb-4">
            <img src={bordersep}></img>
          </div>

          <div className="institutionalpartners">
            <div class="PageTitle text-center">
              <h2>institutional partners</h2>
            </div>
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={4}
              merge={true}
              nav={true}
              margin={30}
              loop={true}
            >
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={instituteimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={instituteimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={instituteimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={instituteimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={instituteimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={instituteimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>

          <div className="sepratebox mt-4 mb-4">
            <img src={bordersep}></img>
          </div>

          <div className="institutionalpartners">
            <div class="PageTitle text-center">
              <h2>restaurant partners</h2>
            </div>
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={4}
              merge={true}
              nav={true}
              margin={30}
              loop={true}
            >
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={restaurantimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={restaurantimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={restaurantimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={restaurantimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={restaurantimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="partnerssecbox">
                    <figure>
                      <img src={restaurantimg}></img>
                    </figure>

                    <h3>lorem ipsum</h3>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>

          <div className="getintouchinner">
            <div className="row align-items-center">
              <div className="col-md-6 getintouchinnerleft">
                <h4>Get in Touch with Us</h4>
                <p>We'd love to hear from you! Contact us anytime.</p>

                <figure>
                  <img src={gettouch}></img>
                </figure>
              </div>

              <div className="col-md-6">
                <div className="row GetIntouchinnerright">
                  <div class="col-md-6 mb-3">
                    <label>First Name*</label>
                    <input
                      placeholder="Enter your first name"
                      class="form-control greyin"
                      required=""
                      type="text"
                      value=""
                      name="name"
                    />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label>Email ID*</label>
                    <input
                      placeholder="Enter your email id"
                      class="form-control greyin"
                      required=""
                      type="email"
                      value=""
                      name="email"
                    />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label>Contact Number*</label>
                    <div class="contactInput">
                      <span class="greyin">+91</span>
                      <input
                        placeholder="Enter your contact number"
                        class="form-control greyin"
                        type="tel"
                        value=""
                        name="phone"
                      />
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label>Business Name*</label>
                    <input
                      placeholder="Business Name*"
                      class="form-control greyin"
                      required=""
                      type="Business Name*"
                      value=""
                      name="email"
                    />
                  </div>

                  <div class="col-md-12">
                    <label>Message</label>
                    <textarea
                      name="message"
                      class="form-control greyin"
                      placeholder="Type your message here"
                    ></textarea>
                  </div>

                  <div class="col-md-12 text-center">
                    <button
                      type="submit"
                      class="btn btn-primary mt-3 max-btn hvr-shutter-out-horizontal"
                    >
                      submit your inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BusinessParthner;
