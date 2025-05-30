import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Select } from "antd";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";

const Consultants = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: [],
    name: "",
    email: "",
    phone: "",
    expertise: "",
    experience: "",
    description: "",
    fees: "",
    duration: "",
    image: null,
    status: true,
  });

  const [allConsultants, setAllConsultants] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedConsultantID, setSelectedConsultantID] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  const fetchAllConsultants = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_consultants);
      setAllConsultants(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    }
  };

  const handleFormDataChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setSelectedFileName(files[0]?.name || "");
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.image && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }

    setLoading(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== undefined) payload.append(key, val);
    });

    try {
      const url = isEdit
        ? adminApiRoutes.update_consultant(selectedConsultantID)
        : adminApiRoutes.create_consultant;
      const method = isEdit ? adminAxios.put : adminAxios.post;

      const response = await method(url, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message);
      fetchAllConsultants();
      onCancelEdit();
    } catch (error) {
      console.log(error)
      toast.error(`Failed to submit: ${error.response?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteConsultant = async () => {
    try {
      await adminAxios.delete(
        adminApiRoutes.delete_consultant(selectedConsultantID)
      );
      toast.success("Deleted successfully");
      fetchAllConsultants();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedConsultantID(null);
    setSelectedFileName("");
    setFormData({
      title: "",
      type: [],
      name: "",
      email: "",
      phone: "",
      expertise: "",
      experience: "",
      description: "",
      fees: "",
      duration: "",
      image: null,
      isActive: true,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    fetchAllConsultants();
  }, []);

  console.log(formData)
  return (
    <>
      {/* Form Section */}
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit ? "editing" : ""}`}>
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">
                {isEdit ? "Edit Consultant" : "Add Consultant"}
              </h4>
              {isEdit && <button onClick={onCancelEdit}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Title Dropdown */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <Select
                      value={formData.title || undefined}
                      size="large"
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, title: value }))
                      }
                      placeholder="Select Title"
                      className="w-100"
                      options={[
                        { value: "Mr.", label: "Mr." },
                        { value: "Mrs.", label: "Mrs." },
                        { value: "Dr.", label: "Dr." },
                      ]}
                    />
                  </div>
                </div>

                {/* Type Dropdown */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <Select
                      mode="multiple"
                      value={formData.type || undefined}
                      size="large"
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, type: value }))
                      }
                      placeholder="Select Type"
                      className="w-100"
                      options={[
                        { value: "Doctor", label: "Doctor" },
                        { value: "Consultant", label: "Consultant" },
                      ]}
                    />
                  </div>
                </div>

                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "phone", type: "numbers" },
                  { label: "Specialization", name: "expertise", type: "text" },
                  {
                    label: "Experience (Years)",
                    name: "experience",
                    type: "number",
                  },
                  { label: "Price", name: "fees", type: "number" },
                  { label: "Time (minutes)", name: "duration", type: "number" },
                  { label: "Overview", name: "description", type: "text" },
                ].map(({ label, name, type }) => (
                  <div className="col-lg-6" key={name}>
                    <div className="mb-3">
                      <label
                        htmlFor={`consultant-${name}`}
                        className="form-label"
                      >
                        {label}
                      </label>
                      <input
                        id={`consultant-${name}`}
                        name={name}
                        type={type}
                        className="form-control"
                        placeholder={`Enter ${label.toLowerCase()}`}
                        value={formData[name]}
                        onChange={handleFormDataChange}
                      />
                    </div>
                  </div>
                ))}

                {/* Image Upload */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="consultant-image" className="form-label">
                      Image {isEdit && `: ${selectedFileName}`}
                    </label>
                    <input
                      id="consultant-image"
                      name="image"
                      type="file"
                      ref={fileInputRef}
                      className="form-control"
                      accept="image/*"
                      onChange={handleFormDataChange}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <label className="form-label d-block">Status</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        id="consultant-status-active"
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={true}
                        checked={formData.isActive === true}
                        onChange={handleFormDataChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="consultant-status-active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="consultant-status-inactive"
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={false}
                        checked={formData.isActive === false}
                        onChange={handleFormDataChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="consultant-status-inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer border-top">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update Consultant"
                  : "Save Consultant"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">All Consultants</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Expertise</th>
                      <th>Experience</th>
                      <th>Fees</th>
                      <th>Time (In minutes)</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allConsultants.length ? (
                      allConsultants.map((consultant, index) => (
                        <tr key={consultant.id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={consultant.image_url} target="_blank">
                              <img
                                src={consultant.image_url}
                                  crossorigin="anonymous"
                                alt="Consultant"
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "contain",
                                  border: "1px solid #ccc",
                                }}
                                onError={() =>
                                  console.error("Image load failed")
                                }
                              />
                            </Link>
                          </td>
                          <td>{consultant.name}</td>
                          <td>{consultant.email}</td>
                          <td>{consultant.phone}</td>
                          <td>{consultant.expertise}</td>
                          <td>{consultant.experience}</td>
                          <td>{consultant.fees}</td>
                          <td>{consultant.duration}</td>
                          <td>
                            <span
                              className={`badge ${
                                consultant.isActive ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {consultant.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedConsultantID(consultant.id);
                                  console.log(consultant)
                                  setFormData({
                                    title:consultant.title,
                                    type:consultant?.ConsultantRoles?.map((cn)=> cn.role)||[],
                                    name: consultant.name,
                                    email: consultant.email,
                                    phone: consultant.phone,
                                    expertise: consultant.expertise,
                                    experience: consultant.experience,
                                    description: consultant.description,
                                    fees: consultant.fees,
                                    duration: consultant.duration,
                                    image: null,
                                    isActive: consultant.isActive,
                                  });
                                  setSelectedFileName(consultant.image);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="fs-18"
                                />
                              </button>
                              <ConfirmationPopup
                                title="Delete Consultant"
                                bodyText="Are you sure you want to delete this consultant?"
                                onOk={deleteConsultant}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="fs-18"
                                    onClick={() =>
                                      setSelectedConsultantID(consultant.id)
                                    }
                                  />
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">
                          No consultants found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultants;
