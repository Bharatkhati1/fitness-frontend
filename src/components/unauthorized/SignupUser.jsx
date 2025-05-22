import React, { useState } from "react";
import axios from "axios";
import EyeIcon from "../../../public/assets/img/eye-icon.png";
import GoogleIcon from "../../../public/assets/img/GoogleIcon.png";
import AppleIcon from "../../../public/assets/img/AppleIcon.png";

function SignUpUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    whatsapp: "",
    acceptedTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      setMessage("You must accept Terms and Conditions.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await axios.post("/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        whatsapp: formData.whatsapp,
      });
      setMessage("Signup successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="LoginPage RegisterPage">
      <div className="container">
        <div className="row">
          <div className="col-md-7 me-auto">
            <form className="formBox" onSubmit={handleSubmit}>
              <div className="formBoxHead">
                <h3>register now</h3>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="fieldbox mb-3">
                    <label>What’s Your Name?*</label>
                    <input
                      name="name"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="fieldbox mb-3">
                    <label>Your Email*</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="fieldbox mb-3">
                    <label>Your Whatsapp Number</label>
                    <div className="contactInput">
                      <span>+91</span>
                      <input
                        name="whatsapp"
                        placeholder="Enter your contact number"
                        className="form-control"
                        type="text"
                        value={formData.whatsapp}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="fieldbox mb-3">
                    <label>Enter Password*</label>
                    <div className="withIcon">
                      <input
                        name="password"
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <span
                        className="EyeIcon"
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={EyeIcon} alt="Show/Hide" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 termscheck">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsCheck"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I agree to the <a href="#">Terms & Conditions and Privacy Policy</a>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary d-block max-width hvr-shutter-out-horizontal mt-3"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {message && (
                <div className="alert alert-info mt-2" role="alert">
                  {message}
                </div>
              )}

              <span className="or-text">Or</span>

              <div className="SocialUsers d-flex">
                <a className="mb-0" href="#">
                  <img src={GoogleIcon} alt="Google" />
                  login using google
                </a>

                <a className="mb-0" href="#">
                  <img src={AppleIcon} alt="Apple" />
                  login using apple
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpUser;
