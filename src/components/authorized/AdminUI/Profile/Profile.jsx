import React, { useState, useEffect, useRef } from "react";
import { Tabs } from "antd";
import ContactDetails from "../CompanySettings/ContactDetails/ContactDetails";
import { toast } from "react-toastify";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GATEWAY_URL } from "../../../../utils/constants";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BasicInfo = ({ user, type }) => {
  const profileImgref = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
    currentPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
    current: false,
  });

  // Sync props with local state on mount or when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        email: user.email || "",
      });
      setPreviewImage(user.image || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordSubmit = async () => {
    if (!passwords.newPassword || !passwords.confirmPassword || !passwords.currentPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await axios.post(`${GATEWAY_URL}/web/change-password`, {
        email: formData.email,
        new_password: passwords.newPassword,
        current_password: passwords.currentPassword,
        confirm_password: passwords.confirmPassword,
        userType: type,
      });
      toast.success(res.data.message);
      setPasswords({
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = () => {
    // Collect formData and profileImage for submission
    console.log("Profile Updated Data:", { ...formData, profileImage });
    toast.success("Profile data collected for update.");
  };

  return (
    <>
      {/* Profile Info Card */}
      <div className="card">
        <div className="card-body row">
          <div className="col-lg-6 mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              disabled
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label className="form-label">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              ref={profileImgref}
              className="form-control"
              onChange={handleProfileImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  border: "1px solid #eee",
                  marginTop: "10px",
                }}
              />
            )}
          </div>

          <div className="text-start border-top pt-3">
            <button className="btn btn-primary" onClick={handleProfileSubmit}>
              Update Changes
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Card */}
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="card-title">Change Password</h4>
        </div>
        <div className="card-body row">
          {/* Current Password */}
          <div className="col-lg-6 mb-3">
            <label className="form-label">Current Password</label>
            <div className="input-group">
              <input
                type={showPassword.current ? "text" : "password"}
                className="form-control"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />
              <span
                className="input-group-text"
                onClick={() => toggleVisibility("current")}
                style={{ cursor: "pointer" }}
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* New Password */}
          <div className="col-lg-6 mb-3">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <input
                type={showPassword.new ? "text" : "password"}
                className="form-control"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
              <span
                className="input-group-text"
                onClick={() => toggleVisibility("new")}
                style={{ cursor: "pointer" }}
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="col-lg-6 mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showPassword.confirm ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />
              <span
                className="input-group-text"
                onClick={() => toggleVisibility("confirm")}
                style={{ cursor: "pointer" }}
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="text-start border-top pt-3">
            <button className="btn btn-primary" onClick={handlePasswordSubmit}>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const GeneralInfo = ({ type }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    kitchenYoutube: "",
    kitchenInstagram: "",
    kitchenTwitter: "",
    script: "",
  });

  const onCancelEdit = () => {
    setIsEdit(false);
    fetchContactDetails();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (value) => {
    if (!isEdit) return setIsEdit(true);

    try {
      const response = await adminAxios.post(
        adminApiRoutes.update_contact_details,
        formData
      );
      toast.success(response.data.message || "Updated successfully");
      setIsEdit(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const fetchContactDetails = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_contact_details);
      setFormData(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch details");
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const renderInput = (label, name, placeholder = "", value) => (
    <div className="col-lg-6 mb-3" key={name}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        readOnly={!isEdit}
      />
    </div>
  );

  const normalFields = [
    { label: "Email", name: "email", placeholder: "Enter email" },
    { label: "Phone", name: "phone", placeholder: "Enter phone number" },
    { label: "Address", name: "address", placeholder: "Enter address" },
  ];
  return (
    <div className="row">
      {/* Normal Details Card */}
      <div className="col-lg-12 mb-4">
        <div className={`card ${isEdit ? "editing" : ""}`}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">
              {isEdit ? "Edit General Info" : "General Info"}
            </h4>
            {isEdit && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={onCancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="row">
              {normalFields.map((field) =>
                renderInput(
                  field.label,
                  field.name,
                  field.placeholder || `Enter ${field.label.toLowerCase()} link`
                )
              )}
            </div>
          </div>
          <div className="card-footer text-end border-top">
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              {isEdit ? "Update Changes" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    kitchenYoutube: "",
    kitchenInstagram: "",
    kitchenTwitter: "",
  });

  let type = "";
  if (pathname.includes("/admin")) {
    type = "admin";
  } else if (pathname.includes("/b2b-partner")) {
    type = "partner";
  } else if (pathname.includes("/service-provider")) {
    type = "consultant";
  }

  const items = [
    {
      key: 0,
      label: "Profile",
    },
    ...(type == "admin"
      ? [
          {
            key: 1,
            label: "General Info",
          },
          { key: 2, label: "Social Media Links" },
          { key: 3, label: "Integrations" },
        ]
      : []),
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onChange = (key) => {
    setActiveTab(key);
  };

  const handleSubmit = async () => {
    try {
      const response = await adminAxios.post(
        adminApiRoutes.update_contact_details,
        formData
      );
      toast.success(response.data.message || "Updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const fetchContactDetails = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_contact_details);
      setFormData(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch details");
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  return (
    <div style={{ height: "calc(100vh - 179px)" }}>
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={onChange}
        className="px-3 pt-2"
      />
      <div className="profile-admin-container">
        {activeTab == 0 && <BasicInfo user={user} type={type} />}
        {activeTab == 1 && type == "admin" && <GeneralInfo type={type} />}
        {activeTab == 2 && type == "admin" && <ContactDetails />}
        {activeTab == 3 && type == "admin" && (
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <label className="form-label">Google Script</label>
                  <textarea
                    type="text"
                    id="script"
                    name="script"
                    className="form-control"
                    value={formData.script}
                    onChange={handleChange}
                    style={{ minHeight: "130px", resize: "vertical" }}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer text-end border-top">
              <button
                className="btn btn-primary"
                onClick={() => handleSubmit(0)}
              >
                {"Update Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
