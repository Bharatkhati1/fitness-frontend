import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import testimonialsbanner from "../../../public/assets/img/testimonialsbanner.png";
import trustedImg from "../../../public/assets/img/trustedImg.svg";
import clinetfeedbacimg from "../../../public/assets/img/clinetfeedbacimg.png";
import fillstar from "../../../public/assets/img/fillstar.png";
import userimg from "../../../public/assets/img/userimg.png";
import userimg2 from "../../../public/assets/img/userimg2.png";
import userimg3 from "../../../public/assets/img/userimg3.png";
import usertouch from "../../../public/assets/img/usertouch.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { webAxios } from "../../utils/Api/userAxios.jsx";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes.jsx";
function Testimonial() {
  const [successStoriesTop, setSuccessStoriesTop] = useState([]);
  const [successStoriesBottom, setSuccessStoriesBottom] = useState([]);

  const fetchSuccessStories = async () => {
    try {
      const response = await webAxios.get(userApiRoutes.get_success_stories);
      const stories = response.data.data || [];

      const mid = Math.ceil(stories.length / 2);
      setSuccessStoriesTop(stories.slice(0, mid));
      setSuccessStoriesBottom(stories.slice(mid));
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Failed to load success stories."
      );
    }
  };

  useEffect(() => {
    fetchSuccessStories();
  }, []);

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
        </div>
        <div>
          <Slider
            infinite
            autoplay
            autoplaySpeed={0}
            speed={8000}
            slidesToShow={4}
            slidesToScroll={1}
            cssEase="linear"
            arrows={false}
            swipe={false}
            pauseOnHover
            pauseOnFocus={false}
            loop
          >
            {successStoriesTop.map((successStory, i) => (
              <div key={i}>
                <div className="clientafterbefore">
                  <div className="clientafterbeforeinner d-flex">
                    <div className="Clientbefore text-center">
                      <h4>before</h4>
                      <figure>
                        <img crossOrigin="anonymous" src={successStory.before_image_url} alt="before" />
                      </figure>
                    </div>
                    <div className="Clientbefore text-center">
                      <h4>after</h4>
                      <figure>
                        <img crossOrigin="anonymous"  src={successStory.after_image_url} alt="after" />
                      </figure>
                    </div>
                  </div>
                  <h3 className="clientafterbeforetitle">
                    {successStory.title || "12 months natural transformation"}
                  </h3>
                </div>
              </div>
            ))}
            {/* Show 1 fallback slide if stories < 4 to avoid layout glitches */}
            {successStoriesTop.length < 4 && (
              <div>
                <div className="clientafterbefore">
                  <div className="clientafterbeforeinner d-flex">
                    <div className="Clientbefore text-center">
                      <h4>before</h4>
                      <figure>
                        <img src="/fallback-before.jpg" alt="before" />
                      </figure>
                    </div>
                    <div className="Clientbefore text-center">
                      <h4>after</h4>
                      <figure>
                        <img src="/fallback-after.jpg" alt="after" />
                      </figure>
                    </div>
                  </div>
                  <h3 className="clientafterbeforetitle">
                    "12 months natural transformation"
                  </h3>
                </div>
              </div>
            )}
          </Slider>

          <Slider
            infinite
            autoplay
            autoplaySpeed={0}
            speed={8000}
            slidesToShow={4}
            slidesToScroll={1}
            cssEase="linear"
            arrows={false}
            swipe={false}
            pauseOnHover
            pauseOnFocus
            rtl
            loop
          >
            {successStoriesBottom.map((successStory, i) => (
              <div key={i}>
                <div className="clientafterbefore">
                  <div className="clientafterbeforeinner d-flex">
                    <div className="Clientbefore text-center">
                      <h4>before</h4>
                      <figure>
                        <img crossOrigin="anonymous"  src={successStory.before_image_url} alt="before" />
                      </figure>
                    </div>
                    <div className="Clientbefore text-center">
                      <h4>after</h4>
                      <figure>
                        <img crossOrigin="anonymous"  src={successStory.after_image_url} alt="after" />
                      </figure>
                    </div>
                  </div>
                  <h3 className="clientafterbeforetitle">
                    {successStory.title || "12 months natural transformation"}
                  </h3>
                </div>
              </div>
            ))}

            {/* Show 1 fallback slide if stories < 4 to avoid layout glitches */}
            {successStoriesBottom.length < 4 && (
              <div>
                <div className="clientafterbefore">
                  <div className="clientafterbeforeinner d-flex">
                    <div className="Clientbefore text-center">
                      <h4>before</h4>
                      <figure>
                        <img src="/fallback-before.jpg" alt="before" />
                      </figure>
                    </div>
                    <div className="Clientbefore text-center">
                      <h4>after</h4>
                      <figure>
                        <img src="/fallback-after.jpg" alt="after" />
                      </figure>
                    </div>
                  </div>
                  <h3 className="clientafterbeforetitle">
                    "12 months natural transformation"
                  </h3>
                </div>
              </div>
            )}
          </Slider>

          <div className="JoinNow text-center">
            <h4>"This could be your story. Start today."</h4>

            <a className="btn btn-primary max-btn bg-white ">join now</a>
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
