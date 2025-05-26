import React, { useState } from "react";
import EyeIcon from "../../../public/assets/img/eye-icon.png";
import GoogleIcon from "../../../public/assets/img/GoogleIcon.png";
import AppleIcon from "../../../public/assets/img/AppleIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../store/auth/AuthExtraReducers";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginUser = ({setIsAdminLocal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const disableLoginButton = useSelector(
    (state) => state.auth.disableLoginButton
  );

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
          setIsAdminLocal
        )
      );
    }
  };

  return (
    <section className="LoginPage">
      <div className="container">
        <div className="row">
          <div className="col-md-4 me-auto">
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
                <Link to="forgot-password" className="TextLink text-end d-block mt-2">
                  Forgot Password?
                </Link>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
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
               <a className="GoogleUser"> <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    console.log('Decoded User:', decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /></a>
                <a href="#">
                  <img src={AppleIcon} alt="Apple icon" />
                  login using apple
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginUser;
