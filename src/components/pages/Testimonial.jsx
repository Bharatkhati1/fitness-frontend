import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import testimonialsbanner from "../../../public/assets/img/testimonialsbanner.png";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";

import trustedImg from "../../../public/assets/img/trustedImg.svg";

import clinetfeedbacimg from "../../../public/assets/img/clinetfeedbacimg.png";

import fillstar from "../../../public/assets/img/fillstar.png";

import userimg from "../../../public/assets/img/userimg.png";
import userimg2 from "../../../public/assets/img/userimg2.png";
import userimg3 from "../../../public/assets/img/userimg3.png";

import usertouch from "../../../public/assets/img/usertouch.png";

function Testimonial() {
  return (
    <>
      <section className="innerbanner blogbanner">
        <figure>
          <img src={testimonialsbanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>Transformation Stories</h2>
            <p>
              Discover inspiring testimonials from our clients who transformed
              their fitness journeys with us.
            </p>
          </div>
        </div>
      </section>

      <section className="clientfeedback">
        <div className="container">
          <div className="row">
            <div className="col-md-4 clientfeedbackleft">
              <figure>
                <img src={clinetfeedbacimg} />
              </figure>
            </div>

            <div className="col-md-8 clientfeedbackright">
              <div class="InnerPageTitle mb-3">
                <h4>Client Feedback</h4>
                <p>
                  Read what our clients say about their fitness journey with us.
                </p>
              </div>

              <div className="clienttrusted">
                Loved by Clients And 
                <span>
                  <img src={trustedImg} />
                </span>
                 for Excellence Services.
              </div>

              <div className="clientfeedbackslider">
                <OwlCarousel
                  className="owl-theme"
                  autoplay={true}
                  dots={false}
                  items={3}
                  autoplaySpeed={500}
                  autoplayTimeout={3000}
                  loop={true}
                  margin={20}
                  nav={true}
                >
                  <div class="item">
                    <div className="clientcontentbg">
                      <ul className="ratinglist d-flex">
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                      </ul>

                      <p>
                        I lost 15 kgs of fat in 5 months under coach Rahul. Also
                        coach Shivam is such a sweet guy, pushed me often when I
                        felt low.
                      </p>

                      <div className="testiuser">
                        <figure>
                          <img src={userimg}></img>
                        </figure>
                        <figcaption>
                          <h4>Reshma V</h4>
                          <p>Vishakhapatnam</p>
                        </figcaption>
                      </div>
                    </div>
                  </div>

                  <div class="item">
                    <div className="clientcontentbg">
                      <ul className="ratinglist d-flex">
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                      </ul>

                      <p>
                        I lost 15 kgs of fat in 5 months under coach Rahul. Also
                        coach Shivam is such a sweet guy, pushed me often when I
                        felt low.
                      </p>

                      <div className="testiuser">
                        <figure>
                          <img src={userimg2}></img>
                        </figure>
                        <figcaption>
                          <h4>Michael Lee</h4>
                          <p>New York</p>
                        </figcaption>
                      </div>
                    </div>
                  </div>

                  <div class="item">
                    <div className="clientcontentbg">
                      <ul className="ratinglist d-flex">
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                        <li>
                          <img src={fillstar}></img>
                        </li>
                      </ul>

                      <p>
                        This program transformed my life! I feel stronger and
                        more confident now.
                      </p>

                      <div className="testiuser">
                        <figure>
                          <img src={userimg3}></img>
                        </figure>
                        <figcaption>
                          <h4>Emily Johnson</h4>
                          <p>San Francisco</p>
                        </figcaption>
                      </div>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="CleintSuccess">
        <div className="container">
          <div class="InnerPageTitle mb-3 text-center ">
            <h4 className="text-white">Client success</h4>
            <p className="text-white">
              Explore inspiring testimonials from our satisfied fitness clients
              on this page
            </p>
          </div>

          <div>
            <div>
              {/* Left to Right Carousel */}
              <OwlCarousel
                className="owl-theme"
                items={8}
                loop={true}
                margin={20}
                autoplay={true}
                slideTransition="linear"
                autoplayTimeout={800}
                autoplaySpeed={1000}
                autoplayHoverPause={false}
                dots={false}
                nav={false}
              >
                <div className="item">Item 1</div>
                <div className="item">Item 2</div>
                <div className="item">Item 3</div>
                <div className="item">Item 4</div>
                <div className="item">Item 5</div>
                <div className="item">Item 6</div>
                <div className="item">Item 7</div>
                <div className="item">Item 8</div>
              </OwlCarousel>

              {/* Right to Left Carousel */}
              <OwlCarousel
                className="owl-theme"
                items={8}
                loop={true}
                margin={20}
                autoplay={true}
                autoplayTimeout={5000}
                autoplaySpeed={5000}
                autoplayHoverPause={true}
                dots={false}
                nav={false}
                rtl={true}
              >
                <div className="item">Item A</div>
                <div className="item">Item B</div>
                <div className="item">Item C</div>
                <div className="item">Item D</div>
                <div className="item">Item E</div>
                <div className="item">Item F</div>
                <div className="item">Item G</div>
                <div className="item">Item H</div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>

      <div className="getintouchmain">
        <div className="container">
          <div className="getintouchinner">
            <div className="row align-items-center">
              <div className="col-md-6 getintouchinnerleft">
                <h4>Get in Touch with Us</h4>
                <p>
                  We value your feedback and appreciate your testimonials in
                  fitness.
                </p>
                <figure>
                  <img src={usertouch}></img>
                </figure>
              </div>
              <div className="col-md-6">
                <div className="row GetIntouchinnerright">
                  <div className="col-md-6 mb-3">
                    <label>First Name*</label>
                    <input
                      placeholder="Enter your first name "
                      className="form-control greyin"
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mb-3"></div>
                  <div className="col-md-6 mb-3">
                    <label>Email ID*</label>
                    <input
                      placeholder="Enter your email id"
                      className="form-control greyin"
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mb-3"></div>

                  <div className="col-md-12">
                    <label>Message</label>
                    <textarea
                      className="form-control greyin"
                      placeholder="Type your message here"
                    ></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <button class="btn btn-primary mt-3 max-btn hvr-shutter-out-horizontal">
                      submit your message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
