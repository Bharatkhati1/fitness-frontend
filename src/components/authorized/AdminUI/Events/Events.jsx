import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Ckeditor from "../CkEditor/Ckeditor.jsx";

const Events = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    seats: "",
    description: "",
    isActive: true,
  });
  const [image, setImage] = useState(null);
  const [events, setEvents] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);
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

  const handleSubmit = async () => {
    if (!image && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) data.append("event_image", image);

    const toastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} event...`
    );
    try {
      const url = isEdit
        ? adminApiRoutes.update_event(selectedId)
        : adminApiRoutes.create_event;

      const method = isEdit ? "put" : "post";
      const res = await adminAxios[method](url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        fetchAllEvents();
        onCancelEdit();
        toast.update(toastId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: `Failed to ${isEdit ? "update" : "create"} event. ${
          error?.response?.data?.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const deleteEvent = async () => {
    try {
      const id = selectedIdRef.current;
      await adminAxios.delete(adminApiRoutes.delete_event(id));
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
      location: "",
      seats: "",
      description: "",
      isActive: true,
    });
    setImage(null);
    setSelectedId(null);
    setSelectedFileName("");
    setIsEdit(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="row">
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
                {
                  label: "Date",
                  name: "date",
                  type: "date",
                  placeholder: "Select event date",
                },
                {
                  label: "Time",
                  name: "time",
                  type: "time",
                  placeholder: "Select event time",
                },
                {
                  label: "Location",
                  name: "location",
                  type: "text",
                  placeholder: "Enter event location",
                },
                {
                  label: "Seats",
                  name: "seats",
                  type: "number",
                  placeholder: "Enter available seats",
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

              {/* Image  */}
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
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
 
              {/* Description  */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <Ckeditor
                    text={formData.description}
                    setText={(text) =>
                      setFormData((prev) => ({ ...prev, description: text }))
                    }
                  />
                </div>
              </div>

              {/* Status  */}
              <div className="col-lg-6">
                <p>Status</p>
                <div className="d-flex gap-2 align-items-center">
                  {[
                    { label: "Active", value: "true" },
                    { label: "Inactive", value: "false" },
                  ].map(({ label, value }) => (
                    <div className="form-check" key={value}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={value}
                        checked={formData.isActive === (value === "true")}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer border-top">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {isEdit ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      </div>

      {/* Event Table */}
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
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length > 0 ? (
                    events.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.image_url}
                            alt="event"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              border: "1px solid #ddd",
                            }}
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.date}</td>
                        <td>{item.location}</td>
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
                                  location: item.location,
                                  seats: item.seats,
                                  description: item.description,
                                  isActive: item.isActive,
                                });
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
