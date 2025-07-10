import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Select, TimePicker } from "antd";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import dayjs from "dayjs";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote.jsx";
import AddAmountModal from "../Popups/AddAmountModal.jsx";
import AvailibilityModal from "./AvailibilityModal.jsx";

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
    dailyStart: "",
    dailyEnd: "",
    image: null,
    status: true,
    platformFee: 0,
  });

  const [allConsultants, setAllConsultants] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedConsultantID, setSelectedConsultantID] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);
  const selectedIdref = useRef(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [openDebitModal, setOpenDebitModal] = useState(false);
  const [openWeeklyModa, setOpenWeeklyModal] = useState(false);

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
      // Validation for name
      if (name === "name") {
        const isValidName = /^[A-Za-z\s]*$/.test(value);
        if (!isValidName) return; // Ignore invalid input
      }

      // Validation for phone
      if (name === "phone") {
        const isValidPhone = /^\d{0,10}$/.test(value); // allow typing up to 10 digits
        if (!isValidPhone) return;
      }

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
    payload.append("dayAvailability", selectedDays);

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
      console.log(error);
      toast.error(`Failed to submit: ${error.response?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteConsultant = async () => {
    try {
      const idToDelete = selectedIdref.current || selectedConsultantID;
      await adminAxios.delete(adminApiRoutes.delete_consultant(idToDelete));
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
    setSelectedDays([]);
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
      dailyStart: "",
      dailyEnd: "",
      image: null,
      isActive: true,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    fetchAllConsultants();
  }, []);

  return (
    <>
      <AddAmountModal
        visible={openDebitModal}
        onCancel={() => setOpenDebitModal(false)}
        selectedId={selectedConsultantID}
        type="consultant"
      />
      <AvailibilityModal
        isModalOpen={openWeeklyModa}
        setIsModalOpen={setOpenWeeklyModal}
        consultant={selectedConsultant}
        fetchAllConsultants={fetchAllConsultants}
      />
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
                        { value: "therapist", label: "Therapist" },
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
                  {
                    label: "Platform Fees (%)",
                    name: "platformFee",
                    type: "numbers",
                  },
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
                      Image{" "}
                      {isEdit && !formData?.image && `: ${selectedFileName}`}
                    </label>
                    <input
                      id="consultant-image"
                      name="image"
                      type="file"
                      ref={fileInputRef}
                      className="form-control"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      onChange={handleFormDataChange}
                    />
                    <ImageDimensionNote type="manageConsultant" />
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
                      <th>Id</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Expertise</th>
                      <th>Experience</th>
                      <th>Fees</th>
                      <th>Time (In minutes)</th>
                      <th>Working Hours</th>
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
                            {consultant.dailyStart && consultant.dailyEnd
                              ? `${consultant.dailyStart} - ${consultant.dailyEnd}`
                              : "-"}
                          </td>
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
                                  setSelectedConsultantID(consultant.id);
                                  setOpenDebitModal(true);
                                }}
                              >
                                Pay
                              </button>
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setSelectedConsultant(consultant);
                                  setOpenWeeklyModal(true);
                                }}
                              >
                                Availability
                              </button>
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setIsEdit(true);
                                  setSelectedConsultantID(consultant.id);
                                  setFormData({
                                    title: consultant.title,
                                    type:
                                      consultant?.ConsultantRoles?.map(
                                        (cn) => cn.role
                                      ) || [],
                                    name: consultant.name,
                                    email: consultant.email,
                                    phone: consultant.phone,
                                    expertise: consultant.expertise,
                                    experience: consultant.experience,
                                    description: consultant.description,
                                    fees: consultant.fees,
                                    duration: consultant.duration,
                                    dailyStart: consultant.dailyStart,
                                    dailyEnd: consultant.dailyEnd,
                                    image: null,
                                    isActive: consultant.isActive,
                                    platformFee: consultant.platformFee,
                                  });
                                  setSelectedDays(
                                    consultant?.dayAvailability || []
                                  );
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
                                    onClick={() => {
                                      selectedIdref.current = consultant.id;
                                      setSelectedConsultantID(consultant.id);
                                    }}
                                  />
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12" className="text-center">
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
