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
import pastsliderimg2 from "../../../public/assets/img/pastsliderimg2.jpg";
import pastsliderimg3 from "../../../public/assets/img/pastsliderimg3.jpg";

import whyattentimg1 from "../../../public/assets/img/whyattentimg1.png";
import whyattentimg2 from "../../../public/assets/img/whyattentimg2.png";
import whyattentimg3 from "../../../public/assets/img/whyattentimg3.png";
import whyattentimg4 from "../../../public/assets/img/whyattentimg4.png";

import shapewhy1 from "../../../public/assets/img/shape1.png";
import shapewhy2 from "../../../public/assets/img/shape2.png";
import shapewhy3 from "../../../public/assets/img/shape3.png";
import shapewhy4 from "../../../public/assets/img/shape4.png";

import typesimg1 from "../../../public/assets/img/typesimg1.png";
import typesimg2 from "../../../public/assets/img/typesimg2.png";
import typesimg3 from "../../../public/assets/img/typesimg3.png";
import typesimg4 from "../../../public/assets/img/typesimg4.png";

import girlimg from "../../../public/assets/img/girlimg.png";

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
            <a className="btn btn-primary max-btn me-3 hvr-shutter-out-horizontal">
              view upcoming events
            </a>
            <a className="btn btn-primary max-btn hvr-shutter-out-horizontal">
              register now
            </a>
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
                    <a className="btn btn-primary w-100 me-1 hvr-shutter-out-horizontal">
                      know more
                    </a>
                    <a className="btn btn-primary w-100 ms-1 hvr-shutter-out-horizontal">
                      register now
                    </a>
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
                    <a className="btn btn-primary w-100 me-1 hvr-shutter-out-horizontal">
                      know more
                    </a>
                    <a className="btn btn-primary w-100 ms-1 hvr-shutter-out-horizontal">
                      register now
                    </a>
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
                    <a className="btn btn-primary w-100 me-1 hvr-shutter-out-horizontal">
                      know more
                    </a>
                    <a className="btn btn-primary w-100 ms-1 hvr-shutter-out-horizontal">
                      register now
                    </a>
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
                    <a className="btn btn-primary w-100 me-1 hvr-shutter-out-horizontal">
                      know more
                    </a>
                    <a className="btn btn-primary w-100 ms-1 hvr-shutter-out-horizontal">
                      register now
                    </a>
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
                <div className="pasteventbox">
                  <img src={pastsliderimg1}></img>
                </div>
              </div>
              <div className="item">
                <div className="pasteventbox">
                  <img src={pastsliderimg2}></img>
                </div>
              </div>

              <div className="item">
                <div className="pasteventbox">
                  <img src={pastsliderimg3}></img>
                </div>
              </div>
              <div className="item">
                <div className="pasteventbox">
                  <img src={pastsliderimg2}></img>
                </div>
              </div>
              <div className="item">
                <div className="pasteventbox">
                  <img src={pastsliderimg2}></img>
                </div>
              </div>
              <div className="item">
                <div className="pasteventbox">
                  <img src={pastsliderimg3}></img>
                </div>
              </div>
            </OwlCarousel>

            <div className="postbtn text-center">
              <a className="btn btn-primary max-width hvr-shutter-out-horizontal">
                know more
              </a>
            </div>
          </div>
        </div>
      </div>

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
          <OwlCarousel
            className="owl-theme"
            dots={false}
            items={4}
            nav={true}
            margin={10}
            loop={true}
          >
            <div className="item">
              <div className="typeseventsbox">
                <figure>
                  <img src={typesimg1}></img>
                </figure>

                <figcaption>
                  <h4>Fitness Challenges</h4>
                  <p>7/14/30-day workout or weight-loss challenges.</p>
                </figcaption>
              </div>
            </div>

            <div className="item">
              <div className="typeseventsbox">
                <figure>
                  <img src={typesimg2}></img>
                </figure>

                <figcaption>
                  <h4>Webinars & Expert Talks</h4>
                  <p>7/14/30-day workout or weight-loss challenges.</p>
                </figcaption>
              </div>
            </div>

            <div className="item">
              <div className="typeseventsbox">
                <figure>
                  <img src={typesimg3}></img>
                </figure>

                <figcaption>
                  <h4>Community Wellness Meetups</h4>
                  <p>Yoga days, run clubs, Zumba parties.</p>
                </figcaption>
              </div>
            </div>
            <div className="item">
              <div className="typeseventsbox">
                <figure>
                  <img src={typesimg4}></img>
                </figure>

                <figcaption>
                  <h4>Workshops</h4>
                  <p>Meal prep, mental fitness, strength training.</p>
                </figcaption>
              </div>
            </div>
          </OwlCarousel>
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

      <Footer />
    </>
  );
}
