import React, { useState, useEffect } from "react";
import adminApiRoutes from "../../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";

const ContactDetails = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit1, setIsEdit1] = useState(false);
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
    script:"",
  });

  const onCancelEdit = () => {
    setIsEdit1(false);
    setIsEdit(false);
    fetchContactDetails();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (value) => {
    if (value == 0) {
      if (!isEdit) return setIsEdit(true);
    } else {
      if (!isEdit1) return setIsEdit1(true);
    }

    try {
      const response = await adminAxios.post(
        adminApiRoutes.update_contact_details,
        formData
      );
      toast.success(response.data.message || "Updated successfully");
      setIsEdit(false);
      setIsEdit1(false);
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
        readOnly={value == 0 ? !isEdit : !isEdit1}
      />
    </div>
  );

  const normalFields = [
    { label: "Email", name: "email", placeholder: "Enter email" },
    { label: "Phone", name: "phone", placeholder: "Enter phone number" },
    { label: "Address", name: "address", placeholder: "Enter address" },
    { label: "Instagram", name: "instagram" },
    { label: "Facebook", name: "facebook" },
    { label: "LinkedIn", name: "linkedin" },
    { label: "Twitter", name: "twitter" },
    { label: "YouTube", name: "youtube" },
  ];

  const smartKitchenFields = [
    { label: "Smart Kitchen Instagram", name: "kitchenInstagram" },
    { label: "Smart Kitchen YouTube", name: "kitchenYoutube" },
    { label: "Smart Kitchen Twitter", name: "kitchenTwitter" },
  ];

  return (
    <div className="row">
      {/* Normal Details Card */}
      <div className="col-lg-12 mb-4">
        <div className={`card ${isEdit ? "editing" : ""}`}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">
              {isEdit ? "Edit Daily Fitness Links" : "Daily Fitness Links"}
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
                  field.placeholder ||
                    `Enter ${field.label.toLowerCase()} link`,
                  0
                )
              )}
            </div>
          </div>
          <div className="card-footer text-end border-top">
            <button className="btn btn-primary" onClick={() => handleSubmit(0)}>
              {isEdit ? "Update Changes" : "Edit"}
            </button>
          </div>
        </div>
      </div>

      {/* Smart Kitchen Details Card */}
      <div className="col-lg-12">
        <div className={`card ${isEdit1 ? "editing" : ""}`}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">
              {isEdit1 ? "Edit Smart Kitchen Links" : "Smart Kitchen Links"}
            </h4>
            {isEdit1 && (
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
              {smartKitchenFields.map((field) =>
                renderInput(
                  field.label,
                  field.name,
                  `Enter ${field.label.toLowerCase()} link`,
                  1
                )
              )}
            </div>
          </div>
          <div className="card-footer text-end border-top">
            <button className="btn btn-primary" onClick={() => handleSubmit(1)}>
              {isEdit1 ? "Update Changes" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
