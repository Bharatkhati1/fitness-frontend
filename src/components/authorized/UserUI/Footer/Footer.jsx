import React, { useEffect } from "react";
import FooterLogo from "../../../../../public/assets/img/footerLogo.png";
import InstaIcon from "../../../../../public/assets/img/instagraIcon.png";
import TwitterIcon from "../../../../../public/assets/img/twitterIcon.png";
import YoutUbeIcon from "../../../../../public/assets/img/YoutubeIcon.png";
import CallIcon from "../../../../../public/assets/img/callIcon.png";
import MesgIcon from "../../../../../public/assets/img/Mesgeicon.png";
import { Link } from "react-router-dom";
import {
  getContactusDetails,
  getServicesForUser,
} from "../../../../store/auth/AuthExtraReducers";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Footer = () => {
  
  const dispatch = useDispatch();
  const { allServices = [], contactUsDetails = {} } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getServicesForUser());
    dispatch(getContactusDetails());
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
                  <a href={`${contactUsDetails?.instagram}`}>
                    <img src={InstaIcon}></img>
                  </a>
                </li>
                <li>
                  <a href={`${contactUsDetails?.twitter}`}>
                    <img src={TwitterIcon}></img>
                  </a>
                </li>
                <li>
                  <a href={`${contactUsDetails?.youtube}`}>
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
                  {allServices.slice(0, 8).map((service) => (
                    <li key={service.id}>
                      <Link
                        to={`/service-details/${service.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md col-sm-6 FooterContent ">
                <h3>company</h3>

                <ul className="userlinks">
                  <li>
                    <Link to={"/news-and-media"}>News & Media</Link>
                  </li>
                  <li>
                    <Link to={"/about-us"}>Who We Are</Link>
                  </li>
                  <li>
                    <Link to={"/careers"}>Careers</Link>
                  </li>
                  <li>
                    <Link to={"/bussiness-partners"}>Partners</Link>
                  </li>
                  <li>
                    <Link to={"/innovation"}>Innovations</Link>
                  </li>
                  <li>
                    <Link to={"/events"}>Events</Link>
                  </li>
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
                    {contactUsDetails?.phone &&
                      contactUsDetails.phone.split(",").slice(0,1).map((num, idx) => (
                        <span key={idx} className="me-1">
                          <a href={`tel:${num.trim()}`}>{num.trim()}</a>
                        </span>
                      ))}
                  </li>
                  <li>
                    <img src={MesgIcon} />
                    <a href={`mailto:${contactUsDetails?.email}`}>
                      {contactUsDetails?.email}
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
        <p>© {new Date().getFullYear()}. All rights reserved</p>
        <ul className="BottomFooterList d-flex">
          <li>
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
          </li>
          <li>
            <Link to={"/refund-policy"}> Refund Policy</Link>
          </li>
          {/* <li>
            <Link> Cookie Settings</Link>
          </li> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
