import React, { useEffect, useRef, useState } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import calendericon1 from "../../../public/assets/img/calendericon1.png";
import LocationIcon from "./images/LocationIcon.svg";
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

export default function Events() {
  const navigate = useNavigate();
  const [eventType, setEventTypes] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastevents, setPastEvents] = useState([]);
  const [eventCms, setEventCms] = useState({});
  const [centeredItem, setCenterIndex] = useState(0)
  const carouselRef = useRef();

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
  

  useEffect(() => {
    fetchAllPastEvents();
    fetchAllUpcomingEvents();
    fetchEventTypes();
    fetchCmsEvents();
  }, []);
  return (
    <>
      <div className="EventsBanner spacetop">
        <div className="EventsBannercontent">
          <h3>{eventCms?.title}</h3>
          <p>{eventCms.description}</p>

          <div className="events-btn mt-4">
            <a href="#upcomingevent" className="btn btn-primary max-btn me-3 hvr-shutter-out-horizontal">
              view upcoming events
            </a>
            <a className="btn btn-primary max-btn hvr-shutter-out-horizontal">
              register now
            </a>
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
                            <span>{event.date}</span>
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
                            <span>{event.time}</span>
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
                      carouselRef.current = e.item.index
                    }}
                  >
                    {pastevents.map((event) => (
                      <div className="item">
                        <div className="pasteventbox">
                          <div className="centertext">
                          <img
                            crossOrigin="anonymous"
                            src={event.image_url}
                          ></img>
                          <div className="eventstext">Sports for great health</div></div>
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
            <div className="col">
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
            <div className="col">
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
            <div className="col">
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
            <div className="col">
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
                  <a className="btn btn-primary max-width hvr-shutter-out-horizontal">
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
    </>
  );
}
