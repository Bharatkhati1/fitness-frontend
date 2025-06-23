import React, { useState, useEffect, useRef } from "react";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";
import Ckeditor from "../CkEditor/Ckeditor";
import { Link } from "react-router-dom";

const Innovation = () => {
  const [formData, setFormData] = useState({
    title: "Innovation",
    banner: "",
    optional_image: [],
  });

  const [galleryImages, setGalleryImages] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [innovationSliders, setinnovationSliders] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
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
      if (key !== "optional_image" && val !== null && val !== undefined) {
        payload.append(key, val);
      }
    });

    // Append gallery images one-by-one
    galleryImages.forEach((img) => {
      if (img.type === "new") {
        payload.append("optional_image", img.data); // send only new files
      }
    });

    // optionally send IDs of deleted images (if needed on backend)
    const loadingToastId = toast.loading("Updating innovation...");
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
      banner: "",
    });
    setGalleryImages([]);

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
      }));
      setSelectedImage(res.data.data.banner);
      setGalleryImages(
        res.data?.data?.OptionalImages?.map((img) => ({
          type: "existing",
          data: img.image_url,
          id: img.id,
        })) || []
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const handleRemoveImage = async (id) => {
    try {
      const res = await adminAxios.delete(
        adminApiRoutes.delete_optional_images(id)
      );
      fetchPPDetails();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const fetchAllSliders = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_sliders("innovation-page")
      );
      setinnovationSliders(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response.data.message);
    }
  };

  console.log(innovationSliders);
  useEffect(() => {
    fetchPPDetails();
    fetchAllSliders();
  }, []);

  useEffect(() => {
    return () => {
      galleryImages.forEach((img) => {
        if (img.type === "new") URL.revokeObjectURL(img.data);
      });
    };
  }, [galleryImages]);

  return (
    <>
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
                <div className="col-lg-6">
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
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Main Image {selectedImage && `${selectedImage}`}
                    </label>
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

                {/* Images  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Optional Images</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      ref={galleryInputRef}
                      multiple
                      onChange={(e) => {
                        const selected = Array.from(e.target.files);

                        // Count total including existing + new
                        const totalImages = galleryImages.length;
                        const remainingSlots = 5 - totalImages;

                        if (selected.length > remainingSlots) {
                          toast.error(
                            `You can only upload ${remainingSlots} more image${
                              remainingSlots === 1 ? "" : "s"
                            }.`
                          );
                          galleryInputRef.current.value = "";
                          return;
                        }

                        const newFiles = selected.map((file) => ({
                          type: "new",
                          data: file,
                        }));

                        setGalleryImages((prev) => [...prev, ...newFiles]);
                        e.target.value = null;
                      }}
                    />
                  </div>
                </div>
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
                              ? handleRemoveImage(img.id)
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
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Items</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Heading</th>
                      <th>Subheading</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {innovationSliders.length > 0 ? (
                      innovationSliders.map((slider, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link target="_blank" to={slider.image_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={slider.image_url}
                                alt="Slider"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "contain",
                                  border: "1px solid #eee",
                                }}
                                onError={(e) => {
                                  console.error(
                                    "Image failed to load:",
                                    slider.image_url
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>{slider.name}</td>
                          <td>{slider.heading}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: slider.subHeading,
                            }}
                          ></td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {}}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No sliders found.
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

export default Innovation;
