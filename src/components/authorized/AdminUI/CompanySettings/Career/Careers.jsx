import React, { useState, useEffect, useRef } from "react";
import adminApiRoutes from "../../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";
import Ckeditor from "../../CkEditor/Ckeditor";

const Careers = () => {
    const [formData, setFormData] = useState({
        title: "",
        banner: null,
        description: "",
      });
     const [galleryImages, setGalleryImages] = useState([]);
      const [isEdit, setIsEdit] = useState(false);
      const [loading, setLoading] = useState(false);
      const [selectedFileName, setSelectedFileName] = useState("");
      const fileInputRef = useRef(null);
      const galleryInputRef = useRef(null);
    
      const handleFormDataChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
          setFormData((prev) => ({ ...prev, banner: files[0] }));
          setSelectedFileName(files[0]?.name || "");
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
      };
    
      const handleSubmit = async () => {
        setLoading(true);
        const payload = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          if (val !== null && val !== undefined) payload.append(key, val);
        });
        galleryImages.forEach((img) => {
          if (img.type === "new") {
            payload.append("optional_image", img.data);
          }
        });
        const loadingToastId = toast.loading("Updating policies...");
        try {
          const url = adminApiRoutes.update_policy(formData.id);
          const method = adminAxios.put;
    
          const response = await method(url, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          fetchPPDetails()
          toast.update(loadingToastId, {
            render: response.data.message,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          onCancelEdit();
        } catch (error) {
          console.log(error);
          setLoading(false)
          toast.error(`Failed to submit: ${error.response?.data?.message}`);
        } finally {
          setLoading(false);
        }
      };
    
      const onCancelEdit = () => {
        setIsEdit(false);
        setSelectedFileName("");
        setFormData({
          title: "",
          image: null,
          description: "",
          body: "",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
    
      const fetchPPDetails = async () => {
        try {
          const res = await adminAxios.get(
            adminApiRoutes.get_policy_details("careers")
          );
          setFormData(res.data.data);
          setGalleryImages(
            res.data.data?.OptionalImages?.map((img) => ({
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
        fetchPPDetails();
      }, []);

        useEffect(() => {
          return () => {
            galleryImages.forEach((img) => {
              if (img.type === "new") URL.revokeObjectURL(img.data);
            });
          };
        }, [galleryImages]);
    
      return (
        <div className="row">
          <div className="col-lg-12">
            <div className={`card ${isEdit ? "editing" : ""}`}>
              <div className="card-header d-flex justify-content-between">
                <h4 className="card-title">
                  {isEdit ? "Edit Careers" : "Careers"}
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
                        id={`privacy-title`}
                        name="title"
                        type="text"
                        className="form-control"
                        placeholder={`Enter title`}
                        value={formData.title}
                        onChange={handleFormDataChange}
                      />
                    </div>
                  </div>
    
                  {/* Banner Image Upload
                  <div className="col-lg-8">
                    <div className="mb-3">
                      <label htmlFor="privacy-image" className="form-label">
                        Banner Image {formData?.banner && `: ${formData.banner}`}
                      </label>
                      <input
                        id="privacy-image"
                        name="banner"
                        type="file"
                        ref={fileInputRef}
                        className="form-control"
                         accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                        onChange={handleFormDataChange}
                      />
                    </div>
                  </div> */}
    
                  {/* desciption  */}
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        id={`privacy-desc`}
                        name="description"
                        type="text"
                        rows={4}
                        className="form-control"
                        placeholder={`Enter description`}
                        value={formData.description}
                        onChange={handleFormDataChange}
                      />
                    </div>
                  </div>
    
                  {/* Body
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Body</label>
                      <Ckeditor
                        text={formData.content}
                        setText={(text) =>
                          setFormData((prev) => ({ ...prev, content: text }))
                        }
                      />
                    </div>
                  </div> */}

                {/* Gallery  Images  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">
                    Images
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      ref={galleryInputRef}
                      multiple
                      onChange={(e) => {
                        const selected = Array.from(e.target.files);
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
                </div>
              </div>
    
              <div className="card-footer border-top">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                 {loading ? "Saving..." : "Update Job" }
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Careers
