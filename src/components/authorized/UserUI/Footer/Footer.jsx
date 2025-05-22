import React from "react";
import FooterLogo from "../../../../../public/assets/img/footerLogo.png"
import InstaIcon from "../../../../../public/assets/img/instagraIcon.png";
import TwitterIcon from "../../../../../public/assets/img/twitterIcon.png";
import YoutUbeIcon from "../../../../../public/assets/img/YoutubeIcon.png";
const Footer = () => {
  return (
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

              <ul className="ContactInfoFooter">
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
  )
}

export default Footer
