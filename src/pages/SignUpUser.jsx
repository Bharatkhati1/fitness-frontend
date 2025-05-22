import React from "react";

import EyeIcon from "../../public/assets/img/eye-icon.png";
import GoogleIcon from "../../public/assets/img/GoogleIcon.png";

import AppleIcon from "../../public/assets/img/AppleIcon.png";

function SignUpUser() {
  return (
    <>
      <section className="LoginPage RegisterPage">
        <div className="container">
          <div className="row">
            <div className="col-md-7 me-auto">
              <div className="formBox">
                <div className="formBoxHead">
                  <h3>register now</h3>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="fieldbox mb-3">
                      <label>What’s Your Name ?*</label>
                      <input
                        className="form-control"
                        placeholder="Enter your full name"
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="fieldbox mb-3">
                      <label>Your Email*</label>
                      <input
                        className="form-control"
                        placeholder="Enter your email"
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="fieldbox mb-3">
                      <label>Your Whatsapp Number</label>
                      <div class="contactInput">
                        <span>+91</span>
                        <input
                          placeholder="Enter your contact number"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="fieldbox mb-3">
                      <label>Enter Password*</label>
                      <div className="withIcon">
                        <input
                          className="form-control"
                          placeholder="Enter password"
                        ></input>
                        <span className="EyeIcon">
                          <img src={EyeIcon}></img>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 termscheck ">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      I agree to the{" "}
                      <a>Terms & Conditions and Privacy Policy</a>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary d-block max-width hvr-shutter-out-horizontal">
                  Register
                </button>

                <span className="or-text">Or</span>

                <div className="SocialUsers d-flex">
                  <a className="mb-0">
                    <img src={GoogleIcon} />
                    login using google
                  </a>

                  <a className="mb-0">
                    <img src={AppleIcon} />
                    login using google
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUpUser;
