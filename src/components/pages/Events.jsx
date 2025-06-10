import React from "react";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import upcomingeventsimg1 from "../../../public/assets/img/upcomingeventsimg1.png";
import upcomingeventsimg2 from "../../../public/assets/img/upcomingeventsimg2.png";
import upcomingeventsimg3 from "../../../public/assets/img/upcomingeventsimg3.png";

import calendericon1 from "../../../public/assets/img/calendericon1.png";
import calendericon2 from "../../../public/assets/img/calendericon2.png";
import calendericon3 from "../../../public/assets/img/calendericon3.png";
import calendericon4 from "../../../public/assets/img/calendericon4.png";


import pastsliderimg1 from "../../../public/assets/img/pastsliderimg1.png";



calendericon1;

export default function Events() {
  return (
    <>
      <Header />

      <div className="EventsBanner spacetop">
        <div className="EventsBannercontent">
          <h3>Fueling Community, Energy & Wellness -One Event at a Time !</h3>
          <p>
            From expert-led webinars to community fitness challenges, our events
            are designed to inspire, educate, and connect. Join us online or
            on-ground and become part of the DailyFitness movement.
          </p>

          <div className="events-btn mt-4">
            <a className="btn btn-primary max-btn me-3">view upcoming events</a>
            <a className="btn btn-primary max-btn">register now</a>
          </div>
        </div>
      </div>

      <div className="upcomingevents">
        <div className="container">
          <div class="PageTitle text-center">
            <h2>upcoming events</h2>
          </div>

          <OwlCarousel
            className="owl-theme"
            dots={false}
            items={3}
            merge={true}
            nav={true}
            margin={25}
            loop={true}
          >
            <div className="item">
              <div className="upcomingbox">
                <figure>
                  <img src={upcomingeventsimg1}></img>
                </figure>

                <figcaption>
                  <h4>14-Day Full Body Transformation Challenge</h4>

                  <ul className="eventinfolist">
                    <li>
                      <img src={calendericon1}></img> <span>12.06.2025</span>
                    </li>

                    <li>
                      <img src={calendericon2}></img> <span>Online</span>
                    </li>

                    <li>
                      <img src={calendericon3}></img> <span>05:30 PM</span>
                    </li>

                    <li>
                      <img src={calendericon4}></img> <span>8 spots left</span>
                    </li>
                  </ul>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>

                  <div className="eventsbtn d-flex mt-3">
                    {" "}
                    <a className="btn btn-primary w-100 me-1">know more</a>
                    <a className="btn btn-primary w-100 ms-1">register now</a>
                  </div>
                </figcaption>
              </div>
            </div>

            <div className="item">
              <div className="upcomingbox">
                <figure>
                  <img src={upcomingeventsimg2}></img>
                </figure>

                <figcaption>
                  <h4>Nutrition Masterclass with Dr. Anjali</h4>

                  <ul className="eventinfolist">
                    <li>
                      <img src={calendericon1}></img> <span>12.06.2025</span>
                    </li>

                    <li>
                      <img src={calendericon2}></img> <span>Online</span>
                    </li>

                    <li>
                      <img src={calendericon3}></img> <span>05:30 PM</span>
                    </li>

                    <li>
                      <img src={calendericon4}></img> <span>8 spots left</span>
                    </li>
                  </ul>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>

                  <div className="eventsbtn d-flex mt-3">
                    <a className="btn btn-primary w-100 me-1">know more</a>
                    <a className="btn btn-primary w-100 ms-1">register now</a>
                  </div>
                </figcaption>
              </div>
            </div>

            <div className="item">
              <div className="upcomingbox">
                <figure>
                  <img src={upcomingeventsimg3}></img>
                </figure>

                <figcaption>
                  <h4>Yoga for Mental Clarity – Live Community Session</h4>

                  <ul className="eventinfolist">
                    <li>
                      <img src={calendericon1}></img> <span>12.06.2025</span>
                    </li>

                    <li>
                      <img src={calendericon2}></img> <span>Online</span>
                    </li>

                    <li>
                      <img src={calendericon3}></img> <span>05:30 PM</span>
                    </li>

                    <li>
                      <img src={calendericon4}></img> <span>8 spots left</span>
                    </li>
                  </ul>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>

                  <div className="eventsbtn d-flex mt-3">
                    <a className="btn btn-primary w-100 me-1">know more</a>
                    <a className="btn btn-primary w-100 ms-1">register now</a>
                  </div>
                </figcaption>
              </div>
            </div>

            <div className="item">
              <div className="upcomingbox">
                <figure>
                  <img src={upcomingeventsimg3}></img>
                </figure>

                <figcaption>
                  <h4>Yoga for Mental Clarity – Live Community Session</h4>

                  <ul className="eventinfolist">
                    <li>
                      <img src={calendericon1}></img> <span>12.06.2025</span>
                    </li>

                    <li>
                      <img src={calendericon2}></img> <span>Online</span>
                    </li>

                    <li>
                      <img src={calendericon3}></img> <span>05:30 PM</span>
                    </li>

                    <li>
                      <img src={calendericon4}></img> <span>8 spots left</span>
                    </li>
                  </ul>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>

                  <div className="eventsbtn d-flex mt-3">
                    <a className="btn btn-primary w-100 me-1">know more</a>
                    <a className="btn btn-primary w-100 ms-1">register now</a>
                  </div>
                </figcaption>
              </div>
            </div>
          </OwlCarousel>

          <div></div>
        </div>
      </div>

      <div className="Pastevents">
        <div className="container">
          <div class="PageTitle text-center">
            <h2>past events highlights</h2>
            <span>Recap the Energy</span>
            <p>
              Our past events have brought together thousands of fitness
              enthusiasts, wellness experts, and health-conscious individuals
              from across the country. From full-body challenges and live yoga
              sessions to expert-led nutrition webinars and mental health
              panels—each event was designed to empower, educate, and energize
              our community.
            </p>
          </div>

          <div>
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={3}
             
              nav={true}
              margin={20}
              loop={true}
              center={true}
            >

               <div className="item">
                <div className="pasteventbox"><img src={pastsliderimg1}></img></div>
              </div>
              <div className="item" >
                <div className="pasteventbox"><img src={pastsliderimg1}></img></div>
              </div>

                <div className="item">
                <div className="pasteventbox"><img src={pastsliderimg1}></img></div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
