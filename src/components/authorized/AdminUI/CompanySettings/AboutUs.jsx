import React, { useState, useEffect, useRef } from "react";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";
const AboutUs = () => {
    const [formData, setFormData] = useState({
        title: "Our Story",
        banner: null,
        description: "desc",
        content: "cont",
      });
    
      const [isEdit, setIsEdit] = useState(false);
      const [loading, setLoading] = useState(false);
      const [selectedFileName, setSelectedFileName] = useState("");
      const fileInputRef = useRef(null);
    
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
          toast.error(`Failed to submit: ${error.response?.data?.message}`);
        } finally {
          setLoading(false);
        }
      };
    
      const onCancelEdit = () => {
        setIsEdit(false);
        setSelectedFileName("");
        setFormData({
            banner: null,
            description: "desc",
            content: "cont",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
    
      const fetchPPDetails = async () => {
        try {
          const res = await adminAxios.get(
            adminApiRoutes.get_policy_details("about-us")
          );
          setFormData(res.data.data);
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.error);
        }
      };
    
      useEffect(() => {
        fetchPPDetails();
      }, []);
    
      console.log(formData)
      return (
        <div className="row">
          <div className="col-lg-12">
            <div className={`card ${isEdit ? "editing" : ""}`}>
              <div className="card-header d-flex justify-content-between">
                <h4 className="card-title">
                  {isEdit ? "Edit About Us" : "About Us"}
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
    
                  {/* Banner Image Upload */}
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
                  </div>
                </div>
              </div>
    
              <div className="card-footer border-top">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                 {loading ? "Saving..." : "Update About Us" }
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
export default AboutUs
