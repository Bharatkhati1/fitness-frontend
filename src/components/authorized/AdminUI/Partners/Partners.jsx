import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../Popups/ConfirmationPopup";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote";

const Partners = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    categoryId: "",
    email: "",
    isActive: true,
  });
  const [allCategories, setAllCategories] = useState([]);
  const [partners, setPartners] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);
  const selectedIdref = useRef(null);

  const fetchAllPartners = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_partners);
      setPartners(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch partners");
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_master_category("partners")
      );
      const activeCategories = res.data?.data.filter((item)=> item.isActive == true);
      setAllCategories(activeCategories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("categoryId", formData.categoryId);
    submitData.append("email", formData.email);
    submitData.append("isActive", formData.isActive);
    formData.image && submitData.append("image", formData.image);

    const loadingToastId = toast.loading(
      isEdit ? "Updating partner..." : "Creating partner..."
    );

    try {
      const url = isEdit
        ? adminApiRoutes.update_partner(selectedId)
        : adminApiRoutes.create_partner;

      const method = isEdit ? adminAxios.put : adminAxios.post;
      const response = await method(url, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.update(loadingToastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchAllPartners();
      resetForm();
    } catch (error) {
      toast.update(loadingToastId, {
        render: `Failed to ${isEdit ? "update" : "create"} partner. ${
          error?.response?.data?.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const idToDelete = selectedIdref.current;
      await adminAxios.delete(adminApiRoutes.delete_partner(idToDelete));
      toast.success("Partner deleted successfully");
      fetchAllPartners();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete partner");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: null,
      categoryId: "",
      email: "",
      isActive: true,
    });
    setIsEdit(false);
    setSelectedId(null);
    setSelectedFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    fetchAllPartners();
    fetchAllCategories();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && "editing"}`}>
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">
                {isEdit ? "Edit Partner" : "Create Partner"}
              </h4>
              {isEdit && <button onClick={resetForm}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Partner Name */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Partner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter name"
                    />
                  </div>
                </div>

                {/* Partner Image */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Partner Image {isEdit && !formData.image && `: ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      ref={fileInputRef}
                      onChange={(e) => {
                        handleChange("image", e.target.files[0]);
                      }}
                    />
                    <ImageDimensionNote type="partners" />
                  </div>
                </div>

                {/* Partner Email */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Partner Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter name"
                    />
                  </div>
                </div>

                {/* Partner Category */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Select Category</label>
                    <select
                      className="form-select"
                      value={formData.categoryId}
                      onChange={(e) =>
                        handleChange("categoryId", e.target.value)
                      }
                    >
                      <option value="">Select category</option>
                      {allCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label d-block">Status</label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={formData.isActive}
                      onChange={() => handleChange("isActive", true)}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={!formData.isActive}
                      onChange={() => handleChange("isActive", false)}
                    />
                    <label className="form-check-label">Inactive</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="card-footer">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {isEdit ? "Update Partner" : "Save Partner"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Table */}
      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">All Partners</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Id</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partners.length > 0 ? (
                      partners.map((partner, index) => (
                        <tr key={partner.id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={partner.image_url} target="_blank">
                              <img
                                src={partner.image_url}
                                alt="partner"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "contain",
                                  border: "1px solid #ccc",
                                }}
                                crossOrigin="anonymous"
                                onError={(e) =>
                                  console.error("Image failed to load")
                                }
                              />
                            </Link>
                          </td>
                          <td>{partner.name}</td>
                          <td>{partner.email}</td>
                          <td>{partner.Master.name || partner.categoryId}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setIsEdit(true);
                                  setSelectedId(partner.id);
                                  setFormData({
                                    name: partner.name,
                                    image: null,
                                    email: partner.email,
                                    categoryId: partner.categoryId,
                                    isActive: partner.isActive,
                                  });
                                  setSelectedFileName(partner.image);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="fs-18"
                                />
                              </button>

                              <ConfirmationPopup
                                title="Delete Partner"
                                bodyText="Are you sure you want to delete this partner?"
                                onOk={handleDelete}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="fs-18"
                                    onClick={() =>
                                      (selectedIdref.current = partner.id)
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
                        <td colSpan="5" className="text-center">
                          No partners found.
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

export default Partners;
