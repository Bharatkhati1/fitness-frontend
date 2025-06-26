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
import { webAxios } from "../../utils/constants.jsx";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes.jsx";
import { sendInquiry } from "../../store/auth/AuthExtraReducers.jsx";
import JoinCommunity from "../authorized/UserUI/Body/Modals/JoinCommunity.jsx";
import Whyus from "../authorized/UserUI/Body/Whyus.jsx";
import { useSelector } from "react-redux";
function Testimonial() {
  const { allServices = [] } = useSelector((state) => state.auth);
  const [successStoriesTop, setSuccessStoriesTop] = useState([]);
  const [successStoriesBottom, setSuccessStoriesBottom] = useState([]);
  const [alltestimonials, setAlltestimonials] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "inquiry",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchtestimonials = async () => {
    try {
      const res = await webAxios.get(
        userApiRoutes.get_testimonials(selectedServiceId, null)
      );
      setAlltestimonials(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendInquiry(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      type: "inquiry",
    });
  };
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

  useEffect(() => {
    fetchtestimonials();
  }, [selectedServiceId]);
  console.log(alltestimonials);
  return (
    <>
      <JoinCommunity open={open} setOpen={setOpen} />
      <section className="innerbanner blogbanner">
        <figure>
          <img src={testimonialsbanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>Transformation Stories</h2>
            <p className="d-flex justify-content-between">
              Discover inspiring testimonials from our clients who transformed
              their fitness journeys with us.
              <select
                className="form-select w-25"
                onChange={(e) => setSelectedServiceId(e.target.value)}
              >
                <option value="">Select Service</option>
                {allServices.map((action, idx) => (
                  <option key={idx} value={action.id}>
                    {action.name}
                  </option>
                ))}
              </select>
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
                  key={alltestimonials.length} 
                  autoplaySpeed={500}
                  autoplayTimeout={3000}
                  loop={true}
                  margin={20}
                  nav={true}
                  responsive={{
                    0: { items: 1 },
                    481: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 },
                    1200: { items: 3 },
                  }}
                >
                  {alltestimonials.map((rating, index) => {
                    const filledStars = parseInt(rating.rating || 0);
                    const user = rating.User || {};
                    const fullName = user.firstName || "Anonymous";
                    const profileImage = user.profilePicture
                      ? `${user.profilePictureUrl}`
                      : userimg;

                    return (
                      <div className="item" key={index}>
                        <div className="clientcontentbg">
                          <ul className="ratinglist d-flex">
                            {[...Array(5)].map(
                              (_, i) =>
                                i < filledStars && (
                                  <li key={i}>
                                    <img src={fillstar} alt="star" />
                                  </li>
                                )
                            )}
                          </ul>
                          <p>{rating.description || "No feedback provided."}</p>
                          <div className="testiuser">
                            <figure>
                              <img crossOrigin="anonymous" src={profileImage} alt={fullName} />
                            </figure>
                            <figcaption>
                              <h4>{fullName}</h4>
                              <p>{rating?.Package?.name || ""}</p>
                            </figcaption>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
            speed={9000}
            slidesToShow={4}
            slidesToScroll={1}
            cssEase="linear"
            arrows={false}
            swipe={false}
            pauseOnHover
            pauseOnFocus={false}
            loop
            responsive={[
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {successStoriesTop.map((successStory, i) => (
              <div key={i}>
                <div className="clientafterbefore">
                  <div className="clientafterbeforeinner d-flex">
                    <div className="Clientbefore text-center">
                      <h4>before</h4>
                      <figure>
                        <img
                          crossOrigin="anonymous"
                          src={successStory.before_image_url}
                          alt="before"
                        />
                      </figure>
                    </div>
                    <div className="Clientbefore text-center">
                      <h4>after</h4>
                      <figure>
                        <img
                          crossOrigin="anonymous"
                          src={successStory.after_image_url}
                          alt="after"
                        />
                      </figure>
                    </div>
                  </div>
                  <h3 className="clientafterbeforetitle">
                    {successStory.description ||
                      "12 months natural transformation"}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>

          <Slider
            infinites={true}
            autoplay
            autoplaySpeed={0}
            speed={9000}
            slidesToShow={4}
            slidesToScroll={1}
            cssEase="linear"
            arrows={false}
            swipe={false}
            pauseOnHover
            pauseOnFocus
            rtl
            loop
            responsive={[
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {successStoriesBottom.map((successStory, i) => (
              <div key={i}>
                <div className="clientafterbefore">
                  <div className="clientafterbeforeinner d-flex">
                    <div className="Clientbefore text-center">
                      <h4>before</h4>
                      <figure>
                        <img
                          crossOrigin="anonymous"
                          src={successStory.before_image_url}
                          alt="before"
                        />
                      </figure>
                    </div>
                    <div className="Clientbefore text-center">
                      <h4>after</h4>
                      <figure>
                        <img
                          crossOrigin="anonymous"
                          src={successStory.after_image_url}
                          alt="after"
                        />
                      </figure>
                    </div>
                  </div>
                  <h3 className="clientafterbeforetitle">
                    {successStory.title || "12 months natural transformation"}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>

          <div className="JoinNow text-center">
            <h4>"This could be your story. Start today."</h4>

            <a
              onClick={() => setOpen(true)}
              className="btn btn-primary max-btn bg-white "
            >
              join now
            </a>
          </div>
        </div>
      </section>
      <Whyus />
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
                  <img src={usertouch} alt="user touch" />
                </figure>
              </div>
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="row GetIntouchinnerright">
                    <div className="col-md-6 mb-3">
                      <label>Full Name*</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="form-control greyin"
                        type="text"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Phone Number</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="form-control greyin"
                        type="text"
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label>Email ID*</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="form-control greyin"
                        type="email"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <label>Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control greyin"
                        placeholder="Type your message here"
                      />
                    </div>

                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 max-btn hvr-shutter-out-horizontal"
                      >
                        Submit your message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Testimonial;
