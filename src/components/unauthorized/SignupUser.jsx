import React, { useState } from "react";
import axios from "axios";
import EyeIcon from "../../../public/assets/img/eye-icon.png";
import GoogleIcon from "../../../public/assets/img/GoogleIcon.png";
import AppleIcon from "../../../public/assets/img/AppleIcon.png";
import { useNavigate } from "react-router-dom";
import { webAxios } from "../../utils/constants";
import { GATEWAY_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import Header from "../authorized/UserUI/Header/Header";
import Footer from "../authorized/UserUI/Footer/Footer";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { jwtDecode } from "jwt-decode";
import AppleLoginButton from "./AppleLogin";

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
  const [nameError, setNameError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setNameError("");
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (step === 1) {
      const { name, email, password, phoneNumber, acceptedTerms } = formData;

      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(name)) {
        setNameError("Only letters and spaces are allowed.");
        return;
      }
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
            err.response?.data?.message ||
            "Failed to send OTP. Please try again.",
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
          userType: "user",
        });

        toast.update(toastId, {
          render: "Verification successful! Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setMessage("Verification successful! Redirecting...");
        setTimeout(() => navigate("/login-user"), 2000);
      } catch (err) {
        toast.update(toastId, {
          render:
            err.response?.data?.message ||
            "Failed to verify OTP. Please try again.",
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
            <label>What’s Your Name ?*</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  handleChange(e);
                }
              }}
              required
            />

            {nameError && <small className="text-danger">{nameError}</small>}
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
            <label>Your Whatsapp Number*</label>
            <div className="contactInput">
              <span>+91</span>
              <input
                name="phoneNumber"
                type="text"
                className="form-control"
                placeholder="Enter your number"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                required
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="fieldbox mb-3">
            <label>Create a Password*</label>
            <div className="withIcon">
              <input
                name="password"
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Atleast 8 characters"
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
      <div className="text-center mt-3 DotHave ">
        <span>Already Have Account ? </span>
        <button
          type="button"
          className="btn btn-link p-0 TextLink"
          onClick={() => navigate("/login-user")}
          style={{ textDecoration: "underline", color: "#007bff" }}
        >
          Log in
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

  const handleSocialLoginGoogle = async (dataGoogle) => {
    try {
      dispatch(authActions.checkingUserToken(true));
      dispatch(authActions.setLoginButtonDisable(true));
      const payload = {
        ...dataGoogle,
        profilePicture: dataGoogle?.picture,
      };
      const { data } = await webAxios.post(
        userApiRoutes.social_login,
        payload,
        {
          withCredentials: true,
        }
      );

      dispatch(
        authActions.loginUser({
          isLoggedIn: true,
          isAdmin: false,
        })
      );
      dispatch(authActions.setUserDetails({ ...data?.user }));
      dispatch(authActions.setUserAcccessToken(data?.accessToken || ""));
      localStorage.setItem("isAdmin", false);
      dispatch(authActions.checkingUserToken(false));
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <Header />
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
                      <a className="mb-0">
                        <GoogleLogin
                          onSuccess={(credentialResponse) => {
                            const decoded = jwtDecode(
                              credentialResponse.credential
                            );
                            handleSocialLoginGoogle(decoded);
                          }}
                          onError={() => {
                            toast.error("Login Failed: Server Error");
                          }}
                        />
                      </a>
                      <a className="mb-0">
                        <AppleLoginButton
                          handleSocialLoginGoogle={handleSocialLoginGoogle}
                        />
                      </a>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default SignUpUser;
