import React from "react";
import EyeIcon from "../../public/assets/img/eye-icon.png";
import GoogleIcon from "../../public/assets/img/GoogleIcon.png";

import AppleIcon from "../../public/assets/img/AppleIcon.png";

function LoginUser() {
  return (
    <>
      <section className="LoginPage">
        <div className="container">
          <div className="row">
            <div className="col-md-4 me-auto">
              <div className="formBox">
                <div className="formBoxHead">
                  <h3>login</h3>
                </div>

                <div className="fieldbox mb-3">
                  <label>Your Registered Email ID*</label>
                  <input
                    className="form-control"
                    placeholder="Enter your email"
                  ></input>
                </div>

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

                  <a className="TextLink text-end d-block mt-2">
                    Forgot Password ?
                  </a>
                </div>

                <button className="btn btn-primary w-100 hvr-shutter-out-horizontal">
                  login
                </button>

                <div className="DotHave">
                  <span>Don’t have an account?</span>
                  <a className="TextLink"> &nbsp;Register Now</a>
                </div>

                <span className="or-text">Or</span>

                <div className="SocialUsers">
                  <a>
                    <img src={GoogleIcon} />
                    login using google
                  </a>

                  <a>
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

export default LoginUser;
