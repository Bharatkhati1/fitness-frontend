import React, { useState } from "react";
import axios from "axios";
import EyeIcon from "../../../public/assets/img/eye-icon.png";
import GoogleIcon from "../../../public/assets/img/GoogleIcon.png";
import AppleIcon from "../../../public/assets/img/AppleIcon.png";
import { useNavigate } from "react-router-dom";
import userAxios from "../../utils/Api/userAxios";
import { GATEWAY_URL } from "../../utils/constants";
import { toast } from "react-toastify";

function SignUpUser() {
  const [step, setStep] = useState(1); // 1: email/password, 2: OTP input, 3: success
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    otp: "",
    acceptedTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
  
    if (step === 1) {
      const { name, email, password, phoneNumber, acceptedTerms } = formData;
  
      if (!name || !email || !password || !phoneNumber) {
        setMessage("Please fill in all fields.");
        return;
      }
  
      if (!acceptedTerms) {
        setMessage("You must accept Terms and Conditions.");
        return;
      }
  
      const toastId = toast.loading("Sending OTP...");
      try {
        setLoading(true);
        setMessage("");
  
        await axios.post(
          `${GATEWAY_URL}/web/signup`,
          {
            name,
            email,
            password,
            phoneNumber,
            terms: acceptedTerms ? 1 : 0,
          },
          { withCredentials: true }
        );
  
        toast.update(toastId, {
          render: "OTP sent to your email!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
  
        setStep(2);
      } catch (err) {
        toast.update(toastId, {
          render:
            err.response?.data?.message || "Failed to send OTP. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      const toastId = toast.loading("Verifying OTP...");
      try {
        setLoading(true);
        setMessage("");
  
        await axios.post(`${GATEWAY_URL}/web/otp-verify`, {
          email: formData.email,
          otp: formData.otp,
        });
  
        toast.update(toastId, {
          render: "Verification successful! Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
  
        setMessage("Verification successful! Redirecting...");
        setTimeout(() => navigate("/LoginUser"), 2000);
      } catch (err) {
        toast.update(toastId, {
          render:
            err.response?.data?.message || "Failed to verify OTP. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStep1 = () => (
    <>
      <div className="formBoxHead">
        <h3>Register Now</h3>
      </div>
  
      <div className="row">
        <div className="col-md-6">
          <div className="fieldbox mb-3">
            <label>Your Name*</label>
            <input
              name="name"
              type="text"
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
            <label>Password*</label>
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
  
        <div className="col-md-6">
          <div className="fieldbox mb-3">
            <label>Phone Number*</label>
            <input
              name="phoneNumber"
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
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
              I agree to the{" "}
              <a href="#">Terms & Conditions and Privacy Policy</a>
            </label>
          </div>
        </div>
      </div>
  
      <button
        type="submit"
        className="btn btn-primary d-block max-width hvr-shutter-out-horizontal mt-3"
        disabled={loading}
      >
        {loading ? "Sending OTP..." : "Continue"}
      </button>
  
      {/* Already have an account button */}
      <div className="text-center mt-3 ">
        <span>Already have an account? </span>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate("/LoginUser")}
          style={{ textDecoration: "underline", color: "#007bff" }}
        >
          Login
        </button>
      </div>
    </>
  );
  
  const renderStep2 = () => (
    <>
      <div className="formBoxHead">
        <h3>Verify Your Email</h3>
        <p>
          We've sent a 6-digit code to <strong>{formData.email}</strong>
        </p>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="fieldbox mb-3">
            <label>Enter OTP*</label>
            <input
              name="otp"
              className="form-control"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              maxLength="6"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary d-block max-width hvr-shutter-out-horizontal mt-3"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </>
  );

  return (
    <section className="LoginPage RegisterPage">
      <div className="container">
        <div className="row">
          <div className="col-md-7 me-auto">
            <form className="formBox" onSubmit={handleSendOTP}>
              {step === 1 ? renderStep1() : renderStep2()}
              {message && (
                <div className="alert alert-info mt-2" role="alert">
                  {message}
                </div>
              )}
              {step === 1 && (
                <>
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
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpUser;
