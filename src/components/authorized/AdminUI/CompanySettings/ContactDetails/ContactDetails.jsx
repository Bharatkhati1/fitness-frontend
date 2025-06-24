import React, { useState, useEffect } from "react";
import adminApiRoutes from "../../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";

const ContactDetails = () => {
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
  });

  const onCancelEdit = () => {
    setIsEdit(false);
    fetchContactDetails(); // Reset form with saved data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
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

  const renderInput = (label, name, placeholder = "") => (
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

  const socialFields = [
    { label: "Instagram", name: "instagram" },
    { label: "Facebook", name: "facebook" },
    { label: "LinkedIn", name: "linkedin" },
    { label: "Twitter", name: "twitter" },
    { label: "YouTube", name: "youtube" },
    { label: "Kitchen Instagram", name: "kitchenInstagram" },
    { label: "Kitchen YouTube", name: "kitchenYoutube" },
  ];

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={`card ${isEdit ? "editing" : ""}`}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">
              {isEdit ? "Edit Contact Details" : "Contact Details"}
            </h4>
            {isEdit && (
              <button className="btn btn-sm btn-outline-secondary" onClick={onCancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>

          <div className="card-body">
            <div className="row">
              {renderInput("Email", "email", "Enter email")}
              {renderInput("Phone", "phone", "Enter phone number")}
              {renderInput("Address", "address", "Enter address")}
              {socialFields.map((field) =>
                renderInput(field.label, field.name, `Enter ${field.label.toLowerCase()} link`)
              )}
            </div>
          </div>

          <div className="card-footer text-end border-top">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {isEdit ? "Update Changes" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
