import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import { Link } from "react-router-dom";

const Events = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    spots: "",
    eventType: "",
    description: "",
    longDescription: "",
    isActive: true,
    address: "",
    image: null,
  });

  const [events, setEvents] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const selectedIdRef = useRef(null);

  const fetchAllEvents = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_events);
      setEvents(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch events.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "radio" ? value === "true" : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setSelectedFileName(file?.name || "");
  };

  const handleSubmit = async () => {
    if (!formData.image && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        data.append("image", value);
      } else {
        data.append(key, value);
      }
    });
    galleryImages.forEach((img) => {
      if (img.type === "new") {
        data.append("optional_image", img.data); 
      }
    });

    const toastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} event...`
    );
    setIsLoading(true);
    try {
      const url = isEdit
        ? adminApiRoutes.update_events(selectedId)
        : adminApiRoutes.create_events;
      const method = isEdit ? "put" : "post";

      const res = await adminAxios[method](url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.update(toastId, {
        render: res.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchAllEvents();
      onCancelEdit();
    } catch (error) {
      toast.update(toastId, {
        render: `Failed to ${isEdit ? "update" : "create"} event. ${
          error?.response?.data?.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async () => {
    try {
      const id = selectedIdRef.current;
      await adminAxios.delete(adminApiRoutes.delete_events(id));
      toast.success("Event deleted successfully");
      fetchAllEvents();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onCancelEdit = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      spots: "",
      eventType: "",
      description: "",
      longDescription: "",
      isActive: true,
      address: "",
      image: null,
    });
    setGalleryImages([])
    setSelectedId(null);
    setSelectedFileName("");
    setIsEdit(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = async (id, index) => {
    try {
      const res = await adminAxios.delete(
        adminApiRoutes.delete_optional_images(id)
      );
      setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    return () => {
      galleryImages.forEach((img) => {
        if (img.type === "new") URL.revokeObjectURL(img.data);
      });
    };
  }, [galleryImages]);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="row">
      {/* Form */}
      <div className="col-lg-12">
        <div className={`card ${isEdit ? "editing" : ""}`}>
          <div className="card-header d-flex justify-content-between">
            <h4 className="card-title">
              {isEdit ? "Edit Event" : "Create Event"}
            </h4>
            {isEdit && <button onClick={onCancelEdit}>Cancel Edit</button>}
          </div>
          <div className="card-body">
            <div className="row">
              {[
                {
                  label: "Title",
                  name: "title",
                  type: "text",
                  placeholder: "Enter event title",
                },
                { label: "Date", name: "date", type: "date", placeholder: "" },
                { label: "Time", name: "time", type: "time", placeholder: "" },
                {
                  label: "Spots",
                  name: "spots",
                  type: "number",
                  placeholder: "Enter available spots",
                },
              ].map(({ label, name, type, placeholder }) => (
                <div className="col-lg-6" key={name}>
                  <div className="mb-3">
                    <label className="form-label">{label}</label>
                    <input
                      type={type}
                      className="form-control"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                    />
                  </div>
                </div>
              ))}

              {/* Event Type */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Select Event Type</label>
                  <select
                    className="form-select"
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        eventType: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select type</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">
                    Event Image {isEdit && `: ${selectedFileName}`}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Short Description</label>
                  <Ckeditor
                    text={formData.description}
                    setText={(text) =>
                      setFormData((prev) => ({ ...prev, description: text }))
                    }
                  />
                </div>
              </div>

              {/* Long Description */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Long Description</label>
                  <Ckeditor
                    text={formData.longDescription}
                    setText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        longDescription: text,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Gallery  Images  */}
             {isEdit && <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">gallery Images(optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    ref={galleryInputRef}
                    multiple
                    onChange={(e) => {
                      const selected = Array.from(e.target.files)
                      const newFiles = selected.map((file) => ({
                        type: "new",
                        data: file,
                      }));

                      setGalleryImages((prev) => [...prev, ...newFiles]);
                      e.target.value = null;
                    }}
                  />
                </div>
              </div>}
              {galleryImages.length > 0 && (
                <div className="d-flex flex-wrap gap-2">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="gary-img-div">
                      <img
                        crossOrigin="anonymous"
                        src={
                          img.type === "existing"
                            ? img.data
                            : URL.createObjectURL(img.data)
                        }
                        alt={`preview-${index}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          img.type === "existing"
                            ? handleRemoveImage(img.id, index)
                            : setGalleryImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                        }
                        className="remove-img-btn-gly"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Status */}
              <div className="col-lg-6">
                <p>Status</p>
                <div className="d-flex gap-3 align-items-center">
                  {["true", "false"].map((value) => (
                    <div className="form-check" key={value}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={value}
                        checked={formData.isActive === (value === "true")}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        {value === "true" ? "Active" : "Inactive"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              {formData.eventType == "Offline" && (
                <div className="col-lg-6" key={name}>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="Enter event address/location"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card-footer border-top">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isEdit ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="col-xl-12 mt-4">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">All Events</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0 table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length > 0 ? (
                    events.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link target="_blank" to={item.image_url}>
                            <img
                              src={item.image_url}
                              alt="event"
                              crossOrigin="anonymous"
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                                border: "1px solid #ddd",
                              }}
                            />
                          </Link>
                        </td>
                        <td>{item.title}</td>
                        <td>{item.date}</td>
                        <td>{item.eventType}</td>
                        <td>
                          <span
                            className={`badge ${
                              item.isActive ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {item.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() => {
                                window.scrollTo(0, 0);
                                setFormData({
                                  title: item.title,
                                  date: item.date,
                                  time: item.time,
                                  spots: item.spots,
                                  eventType: item.eventType,
                                  description: item.description,
                                  longDescription: item.longDescription,
                                  isActive: item.isActive,
                                  address: item.address,
                                  image: null,
                                });
                                setGalleryImages(
                                  item?.OptionalImages?.map((img) => ({
                                    type: "existing",
                                    data: img.image_url,
                                    id: img.id,
                                  })) || []
                                );
                                setSelectedId(item.id);
                                setSelectedFileName(item.image);
                                setIsEdit(true);
                              }}
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                class="fs-18"
                              />
                            </button>

                            <ConfirmationPopup
                              title="Delete Event"
                              bodyText="Are you sure you want to delete this event?"
                              onOk={deleteEvent}
                              buttonText={
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  class="fs-18"
                                  onClick={() => {
                                    selectedIdRef.current = item.id;
                                    setSelectedId(item.id);
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
                      <td colSpan="7" className="text-center">
                        No events found.
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
  );
};

export default Events;
