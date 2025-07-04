import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ContactDetails from "../CompanySettings/ContactDetails/ContactDetails";
import { toast } from "react-toastify";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(3);
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

  const items = [
    {
      key: 0,
      label: "Profile",
    },
    {
      key: 1,
      label: "General Info",
    },
    {
      key: 2,
      label: "Social Media Links",
    },
    {
      key: 3,
      label: "Integrations",
    },
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
    <div>
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={onChange}
        className="px-3 pt-2"
      />
      {activeTab == 2 && <ContactDetails />}
      {activeTab == 3 && (
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
            <button className="btn btn-primary" onClick={() => handleSubmit(0)}>
              {"Update Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
