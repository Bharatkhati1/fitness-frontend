import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Ckeditor from "../CkEditor/Ckeditor.jsx";

const NewsAndMediaManagement = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "TDF",
    readTime: "2",
    date: "12-6-2025",
    shortDescription: "",
    description: "",
    isActive: true,
    bannerImage: null,
    categoryId: "",
    image: null,
  });
  const [allCategories, setAllCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerImageName, setBannerImageName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);
  const selectedIdRef = useRef(null);
  const bannerImageRef = useRef(null);

  const fetchAllArticles = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_blogs("news-media"));
      setArticles(res.data.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      toast.error(error.response?.data?.message);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_master_category("news-media")
      );
      const activeCategories = res.data.data.filter(
        (cat) => cat.isActive == true
      );
      setAllCategories(activeCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.image && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("auther", formData.author);
    payload.append("readTime", formData.readTime);
    payload.append("date", formData.date);
    payload.append("type", "news-media");
    payload.append("shortDescription", formData.shortDescription);
    payload.append("description", formData.description);
    payload.append("isActive", formData.isActive);
    payload.append("categoryId", formData.categoryId);
    if (formData.image) payload.append("blog_image", formData.image);
    if (formData.bannerImage)
      payload.append("banner_image", formData.bannerImage);

    const loadingToastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} article...`
    );
    setIsLoading(true);
    try {
      const url = isEdit
        ? adminApiRoutes.update_blog(selectedId)
        : adminApiRoutes.create_blog;

      const response = isEdit
        ? await adminAxios.put(url, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await adminAxios.post(url, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (response.status === 200) {
        fetchAllArticles();
        resetForm();
        toast.update(loadingToastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: `Failed to ${isEdit ? "update" : "create"} article. ${
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

  const deleteArticle = async () => {
    try {
      const idToDelete = selectedIdRef.current || selectedId;
      await adminAxios.delete(
        adminApiRoutes.delete_blog(idToDelete)
      );
      toast.success("Deleted Successfully");
      fetchAllArticles();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const resetForm = () => {
    setIsEdit(false);
    setSelectedId(null);
    setSelectedFileName("");
    setFormData({
      title: "",
      author: "TDF",
      readTime: "2",
      date: "12-6-2025",
      shortDescription: "",
      description: "",
      isActive: true,
      categoryId: "",
      bannerImage: null,
      image: null,
    });
    setBannerImageName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (bannerImageRef.current) bannerImageRef.current.value = "";
  };

  useEffect(() => {
    fetchAllArticles();
    fetchAllCategories();
  }, []);

  return (
    <>
      {/* Form */}
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && "editing"}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? "Edit Selected" : "Create News And Media"}
              </h4>
              {isEdit && <button onClick={resetForm}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Title */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                {/* Image */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">
                    Image {isEdit && !formData.image && `: ${selectedFileName}`}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="form-control"
                    onChange={(e) =>
                      handleInputChange("image", e.target.files[0])
                    }
                  />
                </div>

                {/* Banner Image */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">
                    Banner Image{" "}
                    {isEdit && !formData.bannerImage && `: ${bannerImageName}`}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={bannerImageRef}
                    className="form-control"
                    onChange={(e) =>
                      handleInputChange("bannerImage", e.target.files[0])
                    }
                  />
                </div>

                {/* Category */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Select Category</label>
                  <select
                    className="form-select"
                    value={formData.categoryId}
                    onChange={(e) =>
                      handleInputChange("categoryId", e.target.value)
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

                {/* Read Time
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Read Time (minutes)</label>
                  <input
                    type="number"
                    id="read-time"
                    className="form-control"
                    placeholder="Enter read time (0-60)"
                    min="0"
                    max="60"
                    value={formData.readTime}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow empty value
                      if (value === "") {
                        handleInputChange("readTime", "");
                        return;
                      }

                      const numericValue = parseInt(value, 10);

                      // Only allow 0–60
                      if (
                        !isNaN(numericValue) &&
                        numericValue >= 0 &&
                        numericValue <= 60
                      ) {
                        handleInputChange("readTime", numericValue);
                      }
                    }}
                  />
                </div> */}

                {/* Short Description */}
                <div className="col-lg-12 mb-3">
                  <label className="form-label">Short Description</label>
                  <Ckeditor
                    text={formData.shortDescription}
                    setText={(val) =>
                      handleInputChange("shortDescription", val)
                    }
                  />
                </div>

                {/* Long Description */}
                <div className="col-lg-12 mb-3">
                  <label className="form-label">Long Description</label>
                  <Ckeditor
                    text={formData.description}
                    setText={(val) => handleInputChange("description", val)}
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
                      onChange={() => handleInputChange("isActive", true)}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={!formData.isActive}
                      onChange={() => handleInputChange("isActive", false)}
                    />
                    <label className="form-check-label">Inactive</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer border-top">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isEdit ? "Update Changes" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All News and Media</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Id</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Short Description</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.length ? (
                      articles.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={item.image_url} target="_blank">
                              <img
                                src={item.image_url}
                                alt="Article"
                                crossOrigin="anonymous"
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "contain",
                                  border: "1px solid #eee",
                                }}
                                onError={(e) =>
                                  console.error(
                                    "Failed to load image:",
                                    item.image_url
                                  )
                                }
                              />
                            </Link>
                          </td>
                          <td>{item.title}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: item.shortDescription,
                            }}
                          />
                          <td>{item?.Master?.name}</td>
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
                                  setIsEdit(true);
                                  setSelectedId(item.id);
                                  setSelectedFileName(item.image);
                                  setFormData({
                                    title: item.title,
                                    author: item.author,
                                    readTime: item.readTime,
                                    shortDescription: item.shortDescription,
                                    description: item.description,
                                    isActive: item.isActive,
                                    bannerImage: null,
                                    categoryId: item.categoryId,
                                    image: null,
                                  });
                                  setBannerImageName(item.bannerImage);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                />
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this article?"
                                title="Delete Article"
                                onOk={()=>deleteArticle()}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
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
                          No articles found.
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

export default NewsAndMediaManagement;
