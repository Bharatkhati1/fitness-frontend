import React, { useState } from "react";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Login } from "../../../store/auth/AuthExtraReducers";
import { authActions } from "../../../store/auth";
import EyeIcon from "../../../../public/assets/img/eye-icon.png";
import { useDispatch } from "react-redux";
import AppleLoginButton from "../AppleLogin";
import { webAxios } from "../../../utils/constants";
import userApiRoutes from "../../../utils/Api/Routes/userApiRoutes";

const LoginModal = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [disableLoginButton, setDisableLoginButton] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    let errs = {};
    if (!formData.username) errs.username = "Email is required";
    if (!formData.password) errs.password = "Password is required";
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
          false,
          "admin",
          false,
          true,
          onClose
        )
      );
    }
  };

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
      onClose();
      dispatch(
        authActions.loginUser({
          isLoggedIn: true,
          isAdmin: false,
          user: { ...data?.user },
        })
      );
      dispatch(authActions.setUserDetails({ ...data?.user }));
      dispatch(authActions.setUserAcccessToken(data?.accessToken || ""));
      localStorage.setItem("isAdmin", false);
      dispatch(authActions.checkingUserToken(false));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Modal
      title="Login"
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <form className="formBox" onSubmit={onLoginFormSubmit}>
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

        <div className="SocialUsers d-flex flex-column gap-3">
          {/* Google Login Button */}
          <div className="SocialButton w-100">
            <div className="btn-wrapper">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  handleSocialLoginGoogle(decoded);
                }}
                onError={() => {
                  toast.error("Login Failed: Server Error");
                }}
              />
            </div>
          </div>

          {/* Apple Login Button */}
          <div className="SocialButton w-100">
            <div className="btn-wrapper">
              <AppleLoginButton
                handleSocialLoginGoogle={handleSocialLoginGoogle}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
