import React from "react";
import Header from "../authorized/UserUI/Header/Header.jsx";
import Footer from "../authorized/UserUI/Footer/Footer.jsx";

function Profile() {
  return (
    <>
      <Header />

      <div className="Carduserinfo">
        <div className="row">
          <div className="col-md-3">
            <figure></figure>
          </div>

          <div className="col">
            <h3>Hello Smriti Pandey !</h3>
            <p>
              Everything about you, your journey, and your progress — all in one
              calm, curated space.
            </p>
            <ul className="tabslist">
              <li>
                <a>Personal Information</a>
              </li>
              <li>
                <a>my packages</a>
              </li>
              <li>
                <a>my consultations</a>
              </li>
              <li>
                <a>my testimonials</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="CardBbox">
        <div className="cardhead">
          <h3>basic details</h3>
        </div>

        <div className="Cardbody">
          <div className="row">
            <div className="col-md-6">
              <label>full name*</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="form-control"
              ></input>
            </div>

            <div className="col-md-6">
              <label>full name*</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="form-control"
              ></input>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
