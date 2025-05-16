import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptedTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      });
      setMessage("Signup successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="d-flex flex-column flex-grow-1">
        <div className="row h-100">
          <div className="col-xxl-7">
            <div className="row justify-content-center h-100">
              <div className="col-lg-6 py-lg-5">
                <div className="d-flex flex-column h-100 justify-content-center">
                  <div className="auth-logo mb-4">
                    <a  className="logo-dark">
                      <img src="assets/images/logo-dark.png" height="24" alt="logo dark" />
                    </a>
                  </div>

                  <h2 className="fw-bold fs-24">Sign Up</h2>
                  <p className="text-muted mt-1 mb-4">New to our platform? Sign up now!</p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        name="acceptedTerms"
                        id="acceptedTerms"
                        className="form-check-input"
                        checked={formData.acceptedTerms}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="acceptedTerms">
                        I accept Terms and Condition
                      </label>
                    </div>

                    <div className="mb-1 text-center d-grid">
                      <button type="submit" className="btn btn-soft-primary" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                      </button>
                    </div>

                    {message && (
                      <div className="alert alert-info mt-2 text-center">{message}</div>
                    )}
                  </form>

                  <p className="mt-auto text-danger text-center">
                    Already have an account? <Link to="/signin" className="text-dark fw-bold ms-1">Sign In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-5 d-none d-xxl-flex">
            <div className="card h-100 mb-0 overflow-hidden">
              <img src="assets/images/small/img-10.jpg" alt="" className="w-100 h-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
