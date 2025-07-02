import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLoader from "../PageLoader";
import "./unAuthorized.scss";
import GymRightImg from "./gym-main.jpg";
import EyeIcon from "../../../public/assets/img/eye-icon.png";
import { Login } from "../../store/auth/AuthExtraReducers";
import { GATEWAY_URL } from "../../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = ({ type, route }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const disableLoginButton = useSelector(
    (state) => state.auth.disableLoginButton
  );

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  // Forgot password states
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingReset, setLoadingReset] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.username) {
      errs.username = "Username is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.username)) {
      errs.username = "Invalid username format";
    }
    if (!formData.password) {
      errs.password = "Password is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        Login(
          { username: formData.username, password: formData.password },
          navigate,
          type,
          route,
          true
        )
      );
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoadingReset(true);
    try {
      if (resetStep === 1) {
        await axios.post(`${GATEWAY_URL}/web/forgot-password`, {
          email: resetEmail,
          userType:type,
        });
        toast.success("OTP sent to your email!");
        await new Promise((res) => setTimeout(res, 500));
        setResetStep(2);
      } else if (resetStep === 2) {
        await axios.post(`${GATEWAY_URL}/web/otp-verify`, {
          email: resetEmail,
          otp: otp,
          userType: type,
        });
        toast.success("Verification successful!");
        await new Promise((res) => setTimeout(res, 500));
        setResetStep(3);
      } else if (resetStep === 3) {
        await axios.post(`${GATEWAY_URL}/web/change-password`, {
          email: resetEmail,
          new_password: newPassword,
          confirm_password: confirmPassword,
          userType: type,
        });
        toast.success("Password reset successful. Please login.");
        setIsForgotPassword(false);
        setResetStep(1);
        setResetEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error("Error during password reset:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoadingReset(false);
    }
  };

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleResetSubmit}>
      <h2 className="fw-bold fs-24 mb-3">Forgot Password</h2>

      {resetStep === 1 && (
        <>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-soft-primary w-100"
            disabled={loadingReset}
          >
            {loadingReset ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {resetStep === 2 && (
        <>
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-soft-primary w-100"
            disabled={loadingReset}
          >
            {loadingReset ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </>
      )}

      {resetStep === 3 && (
        <>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {confirmPassword && newPassword !== confirmPassword && (
            <div className="text-danger mb-3">Passwords do not match.</div>
          )}

          <button
            type="submit"
            className="btn btn-soft-primary w-100"
            disabled={loadingReset || newPassword !== confirmPassword}
          >
            {loadingReset ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}

      <div className="mt-3 text-center">
        <span
          className="TextLink"
          style={{ cursor: "pointer", color: "#007bff" }}
          onClick={() => {
            setIsForgotPassword(false);
            setResetStep(1);
          }}
        >
          Back to Login
        </span>
      </div>
    </form>
  );

  return (
    <div className="d-flex flex-column h-100 p-3 login-page">
      <div className="d-flex flex-column flex-grow-1">
        <div className="row h-100">
          <div className="col-xxl-7">
            <div className="row justify-content-center h-100">
              <div className="col-lg-6 py-lg-5">
                <div className="d-flex flex-column h-100 justify-content-center">
                  <div className="auth-logo mb-4">
                    <a className="logo-dark">
                      <img
                        src="assets/images/logo-dark.png"
                        height="56"
                        alt="logo dark"
                      />
                    </a>
                  </div>

                  {isForgotPassword ? (
                    renderForgotPasswordForm()
                  ) : (
                    <>
                      <h2 className="fw-bold fs-24">Sign In</h2>
                      <p className="text-muted mt-1 mb-4">
                        Enter your email address and password to access admin
                        panel.
                      </p>

                      <div className="mb-3">
                        <form
                          className="authentication-form"
                          onSubmit={onLoginFormSubmit}
                        >
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="example-email"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              id="example-email"
                              name="username"
                              className={`form-control ${
                                errors.username ? "is-invalid" : ""
                              }`}
                              placeholder="Enter your username"
                              value={formData.username}
                              onChange={handleChange}
                            />
                            {errors.username && (
                              <div className="invalid-feedback">
                                {errors.username}
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="example-password"
                            >
                              Password
                            </label>
                            <div className="withIcon">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="example-password"
                                name="password"
                                className={`form-control ${
                                  errors.password ? "is-invalid" : ""
                                }`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                              />
                              <span
                                className="EyeIcon"
                                onClick={() => setShowPassword((prev) => !prev)}
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={EyeIcon}
                                  alt="Toggle password visibility"
                                />
                              </span>
                            </div>
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>
                          {type != "admin" && (
                        <div className="text-end mb-2">
                          <span
                            className="TextLink"
                            style={{ cursor: "pointer", color: "#007bff" }}
                            onClick={() => {
                              setIsForgotPassword(true);
                            }}
                          >
                            Forgot Password?
                          </span>
                        </div>
                      )}
                          <div className="mb-1 text-center d-grid">
                            <button
                              className="btn btn-soft-primary"
                              type="submit"
                              disabled={disableLoginButton}
                            >
                              {disableLoginButton
                                ? "Please Wait ..."
                                : "Sign In"}
                            </button>
                          </div>
                        </form>
                      </div>

                 
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-5 d-none d-xxl-flex">
            <div className="card h-100 mb-0 overflow-hidden">
              <div className="d-flex flex-column h-100">
                <img
                  src={GymRightImg}
                  alt=""
                  className="w-100 h-100 cover-page"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
