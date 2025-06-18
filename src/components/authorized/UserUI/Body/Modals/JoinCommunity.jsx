import React, { useState } from "react";
import { Modal } from "antd";
import JoinImg from "../../../../../../public/assets/img/JoinImg.png";
import { sendInquiry } from "../../../../../store/auth/AuthExtraReducers";
import { toast } from "react-toastify";

const JoinCommunity = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type:"community"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }
      await sendInquiry(formData);
      setFormData({ name: "", email: "", phone: "", type:"community" });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null} 
      className="custom-modal"
      centered
    >
      <div className="modalhead">
        <h3>join our health community</h3>
      </div>

      <div className="modalbody">
        <p>
          Make fitness a way of life by availing yourself of free access to
          regular health and fitness updates through newsletters and our vibrant
          social media health community.
          <br />
          <span>
            Staying informed helps you stay fitter in your day-to-day life.
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row formmodal mt-4 align-items-center">
            <div className="col-md-5 me-auto">
              <div className="form-group mb-2">
                <label>First Name*</label>
                <input
                  placeholder="Enter your first name"
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label>Email ID*</label>
                <input
                  placeholder="Enter your email id"
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label>Your contact number:</label>
                <div className="contactInput">
                  <span>+91</span>
                  <input
                    placeholder="Enter your contact number"
                    className="form-control"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="btnmodal mt-3">
                <button
                  type="submit"
                  className="btn btn-primary max-btn"
                  disabled={loading}
                >
                  {loading ? "Joining..." : "Join Now"}
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <figure className="hc-img">
                <img src={JoinImg} alt="Join Community" />
              </figure>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default JoinCommunity;
