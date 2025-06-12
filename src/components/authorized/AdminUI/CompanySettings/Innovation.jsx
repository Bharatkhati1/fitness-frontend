import React, { useState, useEffect, useRef } from "react";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";
import Ckeditor from "../CkEditor/Ckeditor";

const Innovation = () => {
  const [formData, setFormData] = useState({
    title: "Innovation",
    banner:"",
    optional_image:[]
  });

  const [galleryImages, setGalleryImages] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const optionalInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFormDataChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "banner" && type === "file") {
      setFormData((prev) => ({ ...prev, banner: files[0] }));
    } else if (name === "optional_images" && type === "file") {
      if (files.length > 5) {
        toast.error("You can upload up to 5 optional images.");
        return;
      }
      setFormData((prev) => ({ ...prev, optional_images: [...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = new FormData();

    // Append all regular fields
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "optional_image") {
        if (val.length) {
          [...val].forEach((file) => payload.append("optional_image", galleryImages));
        }
      } else if (val !== null && val !== undefined) {
        payload.append(key, val);
      }
    });

    const loadingToastId = toast.loading("Updating  innovation...");
    try {
      const url = adminApiRoutes.update_policy(formData.id);
      const method = adminAxios.put;

      const response = await method(url, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchPPDetails();
      toast.update(loadingToastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      onCancelEdit();
    } catch (error) {
      console.error(error);
      toast.update(loadingToastId, {
        render: `Failed to submit: ${error.response?.data?.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setFormData({
      title: "Innovation",
      banner:"",
      optional_image:[]
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (optionalInputRef.current) optionalInputRef.current.value = "";
  };

  const fetchPPDetails = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_policy_details("innovations")
      );
      setFormData((prev) => ({
        ...prev,
        ...res.data.data,
        optional_images: [],
      }));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchPPDetails();
  }, []);

  useEffect(() => {
    return () => {
      galleryImages.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [galleryImages]);
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={`card ${isEdit ? "editing" : ""}`}>
          <div className="card-header d-flex justify-content-between">
            <h4 className="card-title">
              {isEdit ? "Edit Innovation" : "Innovation"}
            </h4>
            {isEdit && <button onClick={onCancelEdit}>Cancel Edit</button>}
          </div>

          <div className="card-body">
            <div className="row">
              {/* Title */}
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleFormDataChange}
                  />
                </div>
              </div>

              {/* Banner Image */}
              <div className="col-lg-8">
                <div className="mb-3">
                  <label className="form-label">Banner Image</label>
                  <input
                    name="banner"
                    type="file"
                    ref={fileInputRef}
                    className="form-control"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                    onChange={handleFormDataChange}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">
                    Gallery Images (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    ref={galleryInputRef}
                    multiple
                    onChange={(e) => {
                      const selected = Array.from(e.target.files);

                      if (selected.length + galleryImages.length > 5) {
                        toast.error("You can upload a maximum of 5 images.");
                        e.target.value = null;
                        return;
                      }

                      setGalleryImages((prev) => [...prev, ...selected]);
                      e.target.value = null;
                    }}
                  />
                </div>

                {galleryImages.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {galleryImages.map((file, index) => (
                      <div key={index} className="gary-img-div">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryImages((prev) =>
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
              </div>
            </div>
          </div>

          <div className="card-footer border-top">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Update Innovation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovation;
