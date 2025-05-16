import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../store/auth/AuthExtraReducers";
import PageLoader from "../PageLoader";
import "./unAuthorized.scss";

const Login = () => {
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
        LoginUser(
          { username: formData.username, password: formData.password },
          navigate
        )
      );
    }
  };
  return (
    <>
      {disableLoginButton ? (
        <PageLoader />
      ) : (
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

                      <h2 className="fw-bold fs-24">Sign In</h2>
                      <p className="text-muted mt-1 mb-4">
                        Enter your email address and password to access admin
                        panel.
                      </p>

                      <div className="mb-5">
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
                            <input
                              type="password"
                              id="example-password"
                              name="password"
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="checkbox-signin"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkbox-signin"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>

                          <div className="mb-1 text-center d-grid">
                            <button
                              className="btn btn-soft-primary"
                              type="submit"
                            >
                              Sign In
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-5 d-none d-xxl-flex">
                <div className="card h-100 mb-0 overflow-hidden">
                  <div className="d-flex flex-column h-100">
                    <img
                      src="https://ithemeslab.com/sitetemplate/befit/male/assets/images/slider-show/s-5.jpg"
                      alt=""
                      className="w-100 h-100 cover-page"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
