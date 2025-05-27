import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your registered email.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${GATEWAY_URL}/web/forgot-password`, { email });
      toast.success("Reset instructions sent to your email.");
      setSubmitted(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send reset instructions."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ForgotPasswordPage">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="formBox" onSubmit={handleSubmit}>
              <div className="formBoxHead">
                <h3>Forgot Password</h3>
                <p>Enter your registered email to receive reset instructions.</p>
              </div>

              {!submitted ? (
                <>
                  <div className="fieldbox mb-3">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 hvr-shutter-out-horizontal"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </>
              ) : (
                <div className="text-success mt-3">
                  Instructions have been sent to your email.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
