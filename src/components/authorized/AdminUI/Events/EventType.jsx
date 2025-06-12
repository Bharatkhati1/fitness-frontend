import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const EventType = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    isActive: true,
    description: "",
  });

  const [preview, setPreview] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const fileInputRef = useRef();
  const selectedIdref = useRef();
  const isEdit = editIndex !== null;

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_master_category("events")
      );
      setEventTypes(res.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {

    const formPayload = new FormData();
    formPayload.append("name", formData.title);
    formPayload.append("slug", "events");
    formPayload.append("isActive", formData.isActive);
    formPayload.append("description", formData.description);
    if (formData.image) {
      formPayload.append("image", formData.image);
    }
    const toastId = toast.loading("Submitting...");
    try {
      const selectedId = selectedIdref?.current;
      const url = isEdit
        ? adminApiRoutes.update_master_category(selectedId)
        : adminApiRoutes.create_master_category;

      const method = isEdit ? adminAxios.put : adminAxios.post;

      const response = await method(url, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        fetchAllCategories();
        onCancelEdit();
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: error.response?.data?.message || "Submission failed.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to submit. ${error.response?.data?.message || ""}`);
    }
  };

  const handleEdit = (index) => {
    const data = eventTypes[index];
    selectedIdref.current = data.id;
    setFormData({
      title: data.name,
      description: data.description,
      image: data.image,
      isActive: data.isActive,
    });
    setPreview(data.image);
    setEditIndex(index);
  };

  const deleteCategory = async () => {
    try {
      const idToDelete = selectedIdref.current;
      await adminAxios.delete(
        adminApiRoutes.delete_master_category(idToDelete)
      );
      toast.success("Deleted Successfully");
      fetchAllCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onCancelEdit = () => {
    setEditIndex(null);
    setFormData({ image: null, title: "", description: "", isActive: true });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(()=>{
   fetchAllCategories()
  },[])
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={`card ${isEdit ? "editing" : ""}`}>
          <div className="card-header d-flex justify-content-between">
            <h4 className="card-title">
              {isEdit ? "Edit Event Type" : "Create Event Type"}
            </h4>
            {isEdit && (
              <button className="btn btn-warning" onClick={onCancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="row">
              {/* Title */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Image {isEdit && `: ${preview}`}</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="col-lg-12">
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter description"
                  />
                </div>

                {/* Status */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label d-block">Status</label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={formData.isActive}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, isActive: true }))
                      }
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={!formData.isActive}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, isActive: false }))
                      }
                    />
                    <label className="form-check-label">Inactive</label>
                  </div>
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
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {eventTypes.length > 0 ? (
                    eventTypes.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.image_url}
                            crossOrigin="anonymous"
                            alt="event"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              border: "1px solid #ddd",
                            }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                            <span
                              className={`badge ${
                                item.isActive == "1" ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {item.isActive == "1" ? "Active" : "Inactive"}
                            </span>
                          </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(index)}
                          >
                            <iconify-icon
                              icon="solar:pen-2-broken"
                              class="align-middle fs-18"
                            ></iconify-icon>
                          </button>
                          <ConfirmationPopup
                            bodyText="Are you sure you want to delete this Category ?"
                            title="Delete Category"
                            onOk={() => deleteCategory()}
                            buttonText={
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                class="align-middle fs-18"
                                onClick={() =>
                                  (selectedIdref.current = item.id)
                                }
                              ></iconify-icon>
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
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

export default EventType;
