import React, { useState } from "react";
import EyeIcon from "../../../public/assets/img/eye-icon.png";
import axios from "axios";
import AppleIcon from "../../../public/assets/img/AppleIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../store/auth/AuthExtraReducers";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GATEWAY_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import Header from "../authorized/UserUI/Header/Header";
import Footer from "../authorized/UserUI/Footer/Footer";
import { webAxios } from "../../utils/constants";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { authActions } from "../../store/auth";

const LoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const disableLoginButton = useSelector(
    (state) => state.auth.disableLoginButton
  );

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingReset, setLoadingReset] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
          false
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
          type:"user"
        });
        toast.success("OTP sent to your email!");
        await new Promise((res) => setTimeout(res, 500));
        setResetStep(2);
      } else if (resetStep === 2) {
        await axios.post(`${GATEWAY_URL}/web/otp-verify`, {
          email: resetEmail,
          otp: otp,
          userType:"user"
        });
        toast.success("Verification successful!");
        await new Promise((res) => setTimeout(res, 500));
        setResetStep(3);
      } else if (resetStep === 3) {
        await axios.post(`${GATEWAY_URL}/web/change-password`, {
          email: resetEmail,
          new_password: newPassword,
          confirm_password: confirmPassword,
          type:"user"
        });
        toast.success("Password reset successful. Please login.");
        setIsForgotPassword(false);
        setResetStep(1);
        setResetEmail("");
        setOtp("");
        setNewPassword("");
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

  const renderForgotPassword = () => (
    <form className="formBox" onSubmit={handleResetSubmit}>
      <div className="formBoxHead">
        <h3>Forgot Password</h3>
      </div>

      {resetStep === 1 && (
        <>
          <div className="fieldbox mb-3">
            <label>Email Address*</label>
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
            className="btn btn-primary w-100"
            disabled={loadingReset}
          >
            {loadingReset ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {resetStep === 2 && (
        <>
          <div className="fieldbox mb-3">
            <label>Enter OTP*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loadingReset}
          >
            {loadingReset ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </>
      )}

      {resetStep === 3 && (
        <>
          <div className="fieldbox mb-3">
            <label>New Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="fieldbox mb-3">
            <label>Confirm Password*</label>
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
            className="btn btn-primary w-100"
            disabled={loadingReset || newPassword !== confirmPassword}
          >
            {loadingReset ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}

      <div className="DotHave mt-3 text-center">
        <span
          className="TextLink"
          onClick={() => {
            setIsForgotPassword(false);
            setResetStep(1);
          }}
          style={{ cursor: "pointer" }}
        >
          Back to Login
        </span>
      </div>
    </form>
  );

  const handleSocialLoginGoogle = async (dataGoogle) => {
    try {
      dispatch(authActions.checkingUserToken(true));
      dispatch(authActions.setLoginButtonDisable(true));
      const payload = {
        ...dataGoogle,
        profilePicture: dataGoogle?.picture,
      };
      const { data } = await webAxios.post(userApiRoutes.social_login, payload, {
        withCredentials: true,
      });
      console.log("data", data)
      dispatch(
        authActions.loginUser({
          isLoggedIn: true,
          isAdmin: false,
          user: { ...data?.user }
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
      console.log(error)
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <Header />
      <section className="LoginPage">
        <div className="container">
          <div className="row">
            <div className="col-md-4 me-auto">
              {isForgotPassword ? (
                renderForgotPassword()
              ) : (
                <form className="formBox" onSubmit={onLoginFormSubmit}>
                  <div className="formBoxHead">
                    <h3>login</h3>
                  </div>

                  <div className="fieldbox mb-3">
                    <label>Your Registered Email ID*</label>
                    <input
                      name="username"
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <div className="text-danger">{errors.username}</div>
                    )}
                  </div>

                  <div className="fieldbox mb-3">
                    <label>Enter Password*</label>
                    <div className="withIcon">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <span
                        className="EyeIcon"
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={EyeIcon} alt="Toggle password visibility" />
                      </span>
                    </div>
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                    <Link
                      className="TextLink text-end d-block mt-2"
                      onClick={() => setIsForgotPassword(true)}
                      style={{ cursor: "pointer" }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    className="btn btn-primary w-100 hvr-shutter-out-horizontal"
                    type="submit"
                    disabled={disableLoginButton}
                  >
                    {disableLoginButton ? "Logging in..." : "Login"}
                  </button>

                  <div className="DotHave mt-3">
                    <span>Don’t have an account?</span>
                    <Link to="/SignUpUser" className="TextLink">
                      &nbsp;Register Now
                    </Link>
                  </div>

                  <span className="or-text">Or</span>

                  <div className="SocialUsers">
                    <a className="GoogleUser">
                      {" "}
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
                    <a href="#">
                      <img src={AppleIcon} alt="Apple icon" />
                      login using apple
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LoginUser;
