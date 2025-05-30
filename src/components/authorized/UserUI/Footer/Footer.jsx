import React, { useEffect } from "react";
import FooterLogo from "../../../../../public/assets/img/footerLogo.png";
import InstaIcon from "../../../../../public/assets/img/instagraIcon.png";
import TwitterIcon from "../../../../../public/assets/img/twitterIcon.png";
import YoutUbeIcon from "../../../../../public/assets/img/YoutubeIcon.png";
import CallIcon from "../../../../../public/assets/img/callIcon.png"
import MesgIcon from "../../../../../public/assets/img/Mesgeicon.png"
import { Link } from "react-router-dom";
import { getServicesForUser } from "../../../../store/auth/AuthExtraReducers";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Footer = () => {
 const dispatch = useDispatch();
 const { allServices=[] } = useSelector((state)=> state.auth)

  useEffect(() => {
    dispatch(getServicesForUser())
  }, []);
  return (
    <footer className="">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-sm-6 order-md-1 order-1 FooterContent  ">
            <figure>
              <Link to={"/"}>
                <img src={FooterLogo} />
              </Link>
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
                  {allServices.slice(0,8).map((service) => (
                    <li>
                      <a>{service.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md col-sm-6 FooterContent ">
                <h3>company</h3>

                <ul className="userlinks">
                  {/* <li>
                    <a>Events</a>
                  </li> */}
                  <li>
                    <Link to={"/blogs"}>News & Media</Link>
                  </li>
                  <li>
                    <Link to={"/about-us"}>Who We Are</Link>
                  </li>
                  {/* <li>
                    <a>Innovation</a>
                  </li>
                  <li>
                    <a>Careers</a>
                  </li>
                  <li>
                    <a>Business Partners</a>
                  </li> */}
                </ul>
              </div>

              <div className="col-md col-sm-6 FooterContent ">
                <h3>Tools</h3>

                <ul className="userlinks">
                  <li>
                    <Link to={"/tools/bmi-calculator"}>BMI Calculator</Link>
                  </li>
                  <li>
                    <Link to={"/tools/calorie-calculator"}>
                      Calorie Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to={"/tools/ideal-weight"}>
                      Ideal Weight Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to={"/tools/fat-loss-calculator"}>
                      Fat Loss Calculator
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-md col-sm-6 FooterContent ">
                <h3>fitness</h3>

                <ul className="ContactInfoFooter">
                  <li>
                    <img src={CallIcon} />
                    <a href="tel:8839036035">8839036035</a>
                  </li>
                  <li>
                    <img src={MesgIcon} />
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
  );
};

export default Footer;
