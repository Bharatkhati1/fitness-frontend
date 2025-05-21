import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../public/assets/img/logo.png";
import CartIcon from "../../public/assets/img/carticon.png";
import UserCoupleImg from "../../public/assets/img/bannerCouple.png";
import TagCheckIcon from "../../public/assets/img/tagCheck.png";
import Tagcircle from "../../public/assets/img/BannerCircle.svg";
import ShapeLeft from "../../public/assets/img/bannerShapeLeft.png";
import ShapeRight from "../../public/assets/img/bannerShapeRight.png";
import wightLosssChart from "../../public/assets/img/wightLosssChart.png";
import ServiceImg1 from "../../public/assets/img/ServiceImg-1.png";
import ServiceImg2 from "../../public/assets/img/ServiceImg-2.png";
import ServiceImg3 from "../../public/assets/img/ServiceImg-3.png";
import ServiceImg4 from "../../public/assets/img/ServiceImg-4.png";
import ServiceImg5 from "../../public/assets/img/ServiceImg-5.png";
import ServiceImg6 from "../../public/assets/img/ServiceImg-6.png";
import SmartKichinImg1 from "../../public/assets/img/SmartKichinImg1.png";
import SmartKichinImg2 from "../../public/assets/img/SmartKichinImg2.png";
import SmartKichinImg3 from "../../public/assets/img/SmartKichinImg3.png";
import BlogImg1 from "../../public/assets/img/BlogImg1.png";
import BlogImg2 from "../../public/assets/img/BlogImg2.png";
import BlogImg3 from "../../public/assets/img/BlogImg3.png";
import BlogImg4 from "../../public/assets/img/BlogImg4.png";
import VectorImg from "../../public/assets/img/vectorimg1.png";
import ContactUs from "../../public/assets/img/contactUs.png";

import MeetExperts from "../../public/assets/img/OurMeetExpertsImg.png";

import CallIcon from "../../public/assets/img/callIcon.png";
import MsgeIcon from "../../public/assets/img/Mesgeicon.png";
import InstaIcon from "../../public/assets/img/instagraIcon.png";
import TwitterIcon from "../../public/assets/img/twitterIcon.png";
import YoutUbeIcon from "../../public/assets/img/YoutubeIcon.png";

import FooterLogo from "../../public/assets/img/footerLogo.png";

import ContactLeft from "../../public/assets/img/ContactShAPe1.png";
import ContactRight from "../../public/assets/img/ContactShAPe2.png";

import heartbeat from '../../public/assets/img/heartbeat.png'

function Home() {
  return (
    <>
      <header id="fixed-header" className="sticky">
        <div className="container">
          <div className="navInner d-flex justify-content-between align-items-center">
            <div className="navLeft">
              <Navbar.Brand href="#home">
                <img src={Logo} />
              </Navbar.Brand>
            </div>
            <div className="navRight d-flex align-items-center">
              <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="">
                    <Nav.Link href="#home" className="active">
                      Home
                    </Nav.Link>
                    <Nav.Link href="#link">About</Nav.Link>
                    <NavDropdown title="Packages" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Something
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#home">Tools</Nav.Link>
                    <Nav.Link href="#link">Testimonials</Nav.Link>
                    <Nav.Link href="#link">Blogs</Nav.Link>
                    <Nav.Link href="#link">Contact Us</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <div className="Login-info d-flex align-items-center">
                <a className="carticon">
                  <img src={CartIcon} />
                </a>
                <a className="header-btn ">Login / Register</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="bannerSection">
        <span className="shapeImgLeft">
          <img src={ShapeLeft} />
        </span>
        <span className="shapeImgRight">
          <img src={ShapeRight} />
        </span>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 bannerSectionLeft pe-0">
              <span className="BestTag">
                <img src={TagCheckIcon} />
                The Best in Town
              </span>
              <h1>
                WELCOME TO THE WORLD’S BEST ONLINE PERSONAL HEALTH CUM FITNESS
                PROGRAM
              </h1>
              <ul className="ClientListinfo d-flex">
                <li>
                  <div className="ClientInfo">
                    <b>150+</b>
                    <p>Happy Clients</p>
                  </div>
                </li>
                <li>
                  <div className="ClientInfo">
                    <b>15</b>
                    <p>Years of Experience</p>
                  </div>
                </li>
              </ul>
              <div className="BannerBtn d-flex">
                <a className="hvr-shutter-out-horizontal">Join Now</a>
                <a className="hvr-shutter-out-horizontal">book a trial</a>
              </div>
            </div>
            <div className="col-md-6 bannerSectionRight ps-5 justify-content-end">
              <div className="bannerSectionInner">
                <span className="circletagShape">
                  {/* <img src={heartbeat} alt="" /> */}
                  <img src={Tagcircle} />
                </span>
                 <figure>
                  <img src={UserCoupleImg} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="AboutInfo">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 text-center p-4 me-auto AboutInfoLeft">
              <h2>
                We’re not just another weight loss website we’re your &nbsp;
                <span>HEALTH UNIVERSE</span>
              </h2>
              <p>
                Experience the unique approach to personalised human health and
                fitness, that integrates all the dimensions of your well-being.
              </p>
            </div>
            <div className="col-md-5 text-left">
              <figure>
                <img src={wightLosssChart} />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="OurServices bg-solid">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>OUR SERVICES</h2>
            <p>
              From fat loss solutions to strength, gain and disease management,
              we are committed to your holistic well-being as your true fitness
              pal
            </p>
          </div>
          <div className="row OurServicesRow">
            <div className="col-md-4">
              <div className="OurServicesContent">
                <figure>
                  <img src={ServiceImg1} />
                </figure>
                <figcaption>
                  <h3>FAT LOSS</h3>
                  <p>
                    Sustainable approach towards managing your weight in a
                    healthy manner where in you not only lose fat, but also gain
                    strength and confidence.
                  </p>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a free consultation
                  </a>
                </figcaption>
              </div>
            </div>
            <div className="col-md-4">
              <div className="OurServicesContent">
                <figure>
                  <img src={ServiceImg2} />
                </figure>
                <figcaption>
                  <h3>FAT LOSS</h3>
                  <p>
                    Sustainable approach towards managing your weight in a
                    healthy manner where in you not only lose fat, but also gain
                    strength and confidence.
                  </p>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a free consultation
                  </a>
                </figcaption>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="OurServicesContent">
                <figure>
                  <img src={ServiceImg3} />
                </figure>
                <figcaption>
                  <h3>FAT LOSS</h3>
                  <p>
                    Sustainable approach towards managing your weight in a
                    healthy manner where in you not only lose fat, but also gain
                    strength and confidence.
                  </p>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a free consultation
                  </a>
                </figcaption>
              </div>
            </div>
            <div className="col-md-4 mb-0">
              <div className="OurServicesContent">
                <figure>
                  <img src={ServiceImg4} />
                </figure>
                <figcaption>
                  <h3>FAT LOSS</h3>
                  <p>
                    Sustainable approach towards managing your weight in a
                    healthy manner where in you not only lose fat, but also gain
                    strength and confidence.
                  </p>
                  <a className="btn btn-primary max-btn me-1 hvr-shutter-out-horizontal">
                    book a free consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    join
                  </a>
                </figcaption>
              </div>
            </div>
            <div className="col-md-4 mb-0">
              <div className="OurServicesContent">
                <figure>
                  <img src={ServiceImg5} />
                </figure>
                <figcaption>
                  <h3>FAT LOSS</h3>
                  <p>
                    Sustainable approach towards managing your weight in a
                    healthy manner where in you not only lose fat, but also gain
                    strength and confidence.
                  </p>
                  <a className="btn btn-primary max-btn me-1 hvr-shutter-out-horizontal">
                    book a free consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    join
                  </a>
                </figcaption>
              </div>
            </div>
            <div className="col-md-4 mb-0">
              <div className="OurServicesContent">
                <figure>
                  <img src={ServiceImg6} />
                </figure>
                <figcaption>
                  <h3>FAT LOSS</h3>
                  <p>
                    Sustainable approach towards managing your weight in a
                    healthy manner where in you not only lose fat, but also gain
                    strength and confidence.
                  </p>
                  <a className="btn btn-primary max-btn me-1 hvr-shutter-out-horizontal">
                    book a free consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    join
                  </a>
                </figcaption>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="WhyChoose">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>
              WHY CHOOSE US :<span>Empower Your Health</span>
            </h2>
            <p>
              Transform your wellness journey with expert guidance and
              personalized plans tailored just for you.
            </p>
          </div>
        </div>
        <div className="VideBox">
          <iframe
            src="https://www.youtube.com/embed/jSJ-9uB6pzo?h=null&playlist=jSJ-9uB6pzo&autoplay=1&controls=1&loop=1&autopause=0&playsinline=1&mute=1"
            width="926"
            height="509"
            frameborder="0"
            webkitAllowFullScreen
            mozallowfullscreen
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className="SmartKichin">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>Smart Kitchen</h2>
            <p>
              Smart Kitchen solutions help you plan, prep, and cook healthy
              meals effortlessly with ease and convenience
            </p>
            <a className="btn btn-info hvr-shutter-out-horizontal">View More</a>
          </div>
          <div className="row">
            <div className="col-md-4 SmartKichinContent">
              <figure>
                <img src={SmartKichinImg1} />
              </figure>
              <figcaption>
                <h3>Mango Mint Cooler</h3>
                <p>"Refreshing Tropical Delight"</p>
                <a className="btn btn-primary hvr-shutter-out-horizontal">
                  download recipe
                </a>
              </figcaption>
            </div>
            <div className="col-md-4 SmartKichinContent">
              <figure>
                <img src={SmartKichinImg2} />
              </figure>
              <figcaption>
                <h3>Watermelon Berry Blast</h3>
                <p>"Summer Hydration Hero"</p>
                <a className="btn btn-primary hvr-shutter-out-horizontal">
                  download recipe
                </a>
              </figcaption>
            </div>
            <div className="col-md-4 SmartKichinContent">
              <figure>
                <img src={SmartKichinImg3} />
              </figure>
              <figcaption>
                <h3>Peach Pineapple Smoothie</h3>
                <p>"Tropical Satisfaction in a Glass"</p>
                <div className="text-center m-auto text-center">
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    download recipe
                  </a>
                </div>
              </figcaption>
            </div>
          </div>
        </div>
      </section>
      <section className="PosterSec transformationsuccess">
        <div className="container">
          <div className="PosterContent">
            <h2>TRANSFORMATION SUCCESS STORIES</h2>
            <p>
              It’s about discipline, consistency, and showing up for myself even
              on the hard days. The scale changed, yes — but so did my mindset,
              my energy, and my confidence.
            </p>
            <a className="btn btn-primary hvr-shutter-out-horizontal">
              read now
            </a>
          </div>
        </div>
      </section>
      <section className="PosterSec empoweringhealth">
        <div className="container">
          <div className="PosterContent">
            <h2>Empowering Your Health and Fitness Journey</h2>
            <p>
              At The Daily Fitness, we prioritize your health with personalized
              plans, expert guidance, and valuable resources, making wellness
              accessible from the comfort of your home. Join us today!
            </p>
            <a className="btn btn-primary s-btn hvr-shutter-out-horizontal">
              join
            </a>
          </div>
        </div>
      </section>
      <section className="OurHealthBlog">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>our health blogs</h2>
            <p>
              You didn’t come this far to stop. Read our insightful articles on
              health and fitness.
            </p>
          </div>
          <div className="row OurHealthBlogRows">
            <div className="col-md-6 OurHealthBlogContent">
              <figure>
                <img src={BlogImg1} />
              </figure>
              <figcaption>
                <span>4/21/2025 . 2 min read</span>
                <h3>Understanding Glutathione : Benefits and Myths</h3>
              </figcaption>
            </div>
            <div className="col-md-6 OurHealthBlogContent">
              <figure>
                <img src={BlogImg2} />
              </figure>
              <figcaption>
                <span>4/21/2025 . 2 min read</span>
                <h3>Understanding Glutathione : Benefits and Myths</h3>
              </figcaption>
            </div>
            <div className="col-md-6 OurHealthBlogContent mb-0">
              <figure>
                <img src={BlogImg3} />
              </figure>
              <figcaption>
                <span>4/21/2025 . 2 min read</span>
                <h3>Understanding Glutathione : Benefits and Myths</h3>
              </figcaption>
            </div>
            <div className="col-md-6 OurHealthBlogContent mb-0">
              <figure>
                <img src={BlogImg4} />
              </figure>
              <figcaption>
                <span>4/21/2025 . 2 min read</span>
                <h3>Understanding Glutathione : Benefits and Myths</h3>
              </figcaption>
            </div>
          </div>
          <div className="text-center btn-sec mt-5">
            {" "}
            <a className="btn btn-primary s-btn hvr-shutter-out-horizontal">
              view All
            </a>
          </div>
        </div>
      </section>
      <section className="meetOurExperts">
        <div className="container">
          <div className="PageTitle text-center">
            <h2>Meet Our Expert Wellness Team</h2>
            <p>
              We are a dedicated team of nutritionists, doctors, yoga
              instructors, and strength training coaches committed to your
              health and wellness journey.
            </p>
            <a className="btn btn-primary mt-4 hvr-shutter-out-horizontal">
              meet our family
            </a>
          </div>
          <div className="meetOurExpertscontentg">
            <span className="shape1">
              <img src={VectorImg} />
            </span>

            <span className="shape2">
              <img src={VectorImg} />
            </span>

            <span className="shape3">
              <img src={VectorImg} />
            </span>

            <span className="shape4">
              <img src={VectorImg} />
            </span>

            <span className="shape5">
              <img src={VectorImg} />
            </span>

            <span className="shape6">
              <img src={VectorImg} />
            </span>
            <div className="infobox infoboxLeft">
              <h4>150+</h4>
              <span>Health Experts</span>
            </div>

            <figure>
              <img src={MeetExperts}></img>
            </figure>

            <div className="infobox infoboxLeftRight">
              <h4>150+</h4>
              <span>Trusted Professionals</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trailoffer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 pe-5">
              <div className="PageTitle ">
                <h2>trial offer</h2>
                <p>
                  Experience our services with trial offer for 1 week. Sign up
                  today and discover the benefits !
                </p>
              </div>

              <ul className="trailofferList">
                <li>
                  Gain access to an exciting variety of workouts, including
                  yoga, high-intensity interval training (HIIT), and strength
                  training, all led by certified fitness instructors.
                </li>

                <li>
                  Free one-to-one consultation with our fitness experts
                  regarding all your queries and the roadmap towards your better
                  fitness.
                </li>

                <li>
                  Get a generalised diet plan aimed at meeting your goals.
                </li>

                <li>
                  Our interactive platform allows you to join live sessions or
                  choose from an extensive library of pre-recorded classes that
                  fit your schedule.
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <div className="trailofferform">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>First Name*</label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="form-control"
                    ></input>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="form-control"
                    ></input>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Contact Number*</label>
                    <div className="contactInput">
                      <span>+91</span>
                      <input
                        type="text"
                        placeholder="Enter your contact number"
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Email ID*</label>
                    <input
                      type="text"
                      placeholder="Enter your email id"
                      className="form-control"
                    ></input>
                  </div>

                  <div className="col-md-12">
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      placeholder="Type your message here"
                    ></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    <button className="btn btn-primary mt-3 max-btn hvr-shutter-out-horizontal">
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="GetIntouch">
        <span className="GetIntouchShape1">
          <img src={ContactLeft} />
        </span>
        <span className="GetIntouchShape2">
          <img src={ContactRight} />
        </span>
        <div className="container">
          <div className="row">
            <div className="col-md-6 GetIntouchLeft">
              <div className="ContactUs">
                <h3>Contact Us</h3>
                <p>
                  Reach out to us for personalized health guidance and
                  consultation with our expert team at TheDailyFitness.
                </p>

                <ul className="ContactInfoList">
                  <li>
                    <img src={CallIcon}></img>
                    <span>
                      <a href="tel:918839036035">(+91) 8839036035</a> .{" "}
                      <a href="tel:919891775250">(+91) 9891775250</a>
                    </span>
                  </li>
                  <li>
                    <img src={MsgeIcon}></img>
                    <a href="mailto:info@thedailyfitness.in">
                      info@thedailyfitness.in
                    </a>
                  </li>
                </ul>

                <ul className="SoicalList">
                  <li>
                    <a>
                      <img src={InstaIcon}></img>
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={TwitterIcon}></img>
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={YoutUbeIcon}></img>
                    </a>
                  </li>
                </ul>
              </div>
              <figure>
                <img src={ContactUs}></img>
              </figure>
            </div>
            <div className="col-md-6 GetIntouchRight">
              <div className="PageTitle">
                <h2>Get in touch</h2>
              </div>
              <div className="row GetIntouchRows">
                <div className="col-md-6 mb-3">
                  <label>First Name*</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="form-control"
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email ID*</label>
                  <input
                    type="text"
                    placeholder="Enter your email id"
                    className="form-control"
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Contact Number*</label>
                  <div className="contactInput">
                    <span>+91</span>
                    <input
                      type="text"
                      placeholder="Enter your contact number"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-md-12 checklistBox mb-3">
                  <label className="mb-3">You want to consult for :</label>

                  <ul className="form-checkList d-flex">
                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Weight Gain
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Disease Management
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Fat Loss
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Injury Rehab
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Doctor Consultation
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="col-md-12">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    placeholder="Type your message here"
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <button className="btn btn-primary mt-3 max-btn hvr-shutter-out-horizontal">
                    submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-sm-6 order-md-1 order-1 FooterContent  ">
              <figure>
                <img src={FooterLogo} />
              </figure>

              <div className="ps-3">
                <div className="FooterContentInfo">
                  <h4>Wellness</h4>
                  <p>Your health journey starts with us today.</p>
                </div>

                <ul className="SoicalList mt-3">
                  <li>
                    <a>
                      <img src={InstaIcon}></img>
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={TwitterIcon}></img>
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={YoutUbeIcon}></img>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl col-md-12 order-xl-2 order-3 menuRows">
              <div className="row g-0">
                <div className="col-md col-sm-6 FooterContent  ">
                  <h3>Services</h3>

                  <ul className="userlinks">
                    <li>
                      <a>Fitness</a>
                    </li>
                    <li>
                      <a>Disease Management</a>
                    </li>
                    <li>
                      <a>Injury/Pain Management</a>
                    </li>
                    <li>
                      <a>Medical Consultation</a>
                    </li>
                    <li>
                      <a>Alternative Medicine</a>
                    </li>
                    <li>
                      <a>Mental Health</a>
                    </li>
                    <li>
                      <a>Sexual Health</a>
                    </li>
                    <li>
                      <a>Smart Packages</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md col-sm-6 FooterContent ">
                  <h3>company</h3>

                  <ul className="userlinks">
                    <li>
                      <a>Events</a>
                    </li>
                    <li>
                      <a>News & Media</a>
                    </li>
                    <li>
                      <a>Who We Are</a>
                    </li>
                    <li>
                      <a>Innovation</a>
                    </li>
                    <li>
                      <a>Careers</a>
                    </li>
                    <li>
                      <a>Business Partners</a>
                    </li>
                  </ul>
                </div>

                <div className="col-md col-sm-6 FooterContent ">
                  <h3>Tools</h3>

                  <ul className="userlinks">
                    <li>
                      <a>BMI Calculator</a>
                    </li>
                    <li>
                      <a>Calorie Calculator</a>
                    </li>
                    <li>
                      <a>Ideal Weight Calculator</a>
                    </li>
                    <li>
                      <a>Fat Loss Calculator</a>
                    </li>
                  </ul>
                </div>

                <div className="col-md col-sm-6 FooterContent ">
                  <h3>fitness</h3>

                  <ul class="ContactInfoFooter">
                    <li>
                      <img src="/public/assets/img/callIcon.png" />
                      <a href="tel:8839036035">8839036035</a>
                    </li>
                    <li>
                      <img src="/public/assets/img/Mesgeicon.png" />
                      <a href="mailto:info@thedailyfitness.in">
                        info@thedailyfitness.in
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 order-xl-3 order-2 FooterContent">
              <div className="FooterSubscribe">
                <h2>Enter Your Email ID*</h2>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email id"
                ></input>
                <button className="btn btn-primary mt-2 ml-1 hvr-shutter-out-horizontal">
                  subscribe for better health
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="BottomFooter d-flex align-items-center  justify-content-center">
          <p>© 2024. All rights reserved</p>
          <ul className="BottomFooterList d-flex">
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <a> Refund Policy</a>
            </li>
            <li>
              <a> Cookie Settings</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
export default Home;
