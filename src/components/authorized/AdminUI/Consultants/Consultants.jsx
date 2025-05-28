import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";

const Consultants = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    yoe: "",
    overview: "",
    price: "",
    timeInMin: 0,
    image: null,
    status: true,
  });

  const [sliders, setSliders] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSliderId, setSelectedSliderId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchAllConsultants();
  }, []);

  const fetchAllConsultants = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_sliders);
      setSliders(res.data.data);
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

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== undefined) payload.append(key, val);
    });

    try {
      const url = isEdit
        ? adminApiRoutes.update_slider(selectedSliderId)
        : adminApiRoutes.create_slider;

      const method = isEdit ? adminAxios.put : adminAxios.post;
      const response = await method(url, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message);
      fetchAllConsultants();
      onCancelEdit();
    } catch (error) {
      toast.error(`Failed to submit: ${error.response?.data?.message}`);
    }
  };

  const deleteSlider = async () => {
    try {
      await adminAxios.delete(adminApiRoutes.delete_slider(selectedSliderId));
      toast.success("Deleted successfully");
      fetchAllConsultants();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedSliderId(null);
    setSelectedFileName("");
    setFormData({
      name: "",
      specialization: "",
      yoe: "",
      overview: "",
      price: "",
      timeInMin: 0,
      image: null,
      status: true,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Specialization", name: "specialization", type: "text" },
                  { label: "Experience (Years)", name: "yoe", type: "number" },
                  { label: "Price", name: "price", type: "number" },
                  { label: "Time (minutes)", name: "timeInMin", type: "number" },
                  { label: "Overview", name: "overview", type: "text" },
                ].map(({ label, name, type }) => (
                  <div className="col-lg-6" key={name}>
                    <div className="mb-3">
                      <label htmlFor={`consultant-${name}`} className="form-label">
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
                        name="status"
                        value="true"
                        checked={formData.status === true}
                        onChange={handleFormDataChange}
                      />
                      <label className="form-check-label" htmlFor="consultant-status-active">
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="consultant-status-inactive"
                        className="form-check-input"
                        type="radio"
                        name="status"
                        value="false"
                        checked={formData.status === false}
                        onChange={handleFormDataChange}
                      />
                      <label className="form-check-label" htmlFor="consultant-status-inactive">
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer border-top">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {isEdit ? "Update Consultant" : "Save Consultant"}
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
                      <th>Heading</th>
                      <th>Subheading</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sliders.length ? (
                      sliders.map((slider, index) => (
                        <tr key={slider.id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={slider.image_url} target="_blank">
                              <img
                                src={slider.image_url}
                                alt="Consultant"
                                style={{ width: 50, height: 50, objectFit: "contain", border: "1px solid #ccc" }}
                                onError={() => console.error("Image load failed")}
                              />
                            </Link>
                          </td>
                          <td>{slider.name}</td>
                          <td>{slider.heading}</td>
                          <td>{slider.subHeading}</td>
                          <td>
                            <span className={`badge ${slider.isActive ? "bg-success" : "bg-danger"}`}>
                              {slider.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedSliderId(slider.id);
                                  setFormData({
                                    name: slider.name,
                                    specialization: slider.specialization,
                                    yoe: slider.yoe,
                                    overview: slider.overview,
                                    price: slider.price,
                                    timeInMin: slider.timeInMin,
                                    image: null,
                                    status: slider.isActive,
                                  });
                                  setSelectedFileName(slider.image);
                                }}
                              >
                                <iconify-icon icon="solar:pen-2-broken" class="fs-18" />
                              </button>
                              <ConfirmationPopup
                                title="Delete Consultant"
                                bodyText="Are you sure you want to delete this consultant?"
                                onOk={deleteSlider}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="fs-18"
                                    onClick={() => setSelectedSliderId(slider.id)}
                                  />
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
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
