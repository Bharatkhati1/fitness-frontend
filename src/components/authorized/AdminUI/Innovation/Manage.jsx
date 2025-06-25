import React, { useState, useRef, useEffect } from "react";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import { toast } from "react-toastify";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { Link } from "react-router-dom";

const Manage = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    author: "",
    categoryId: "",
    readTime: "",
    isActive: true,
    bannerImage: null,
    date: "",
  });

  const [galleryImages, setGalleryImages] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [allinnovation, setAllInnovation] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [banneImagName, setBannerUImageName] = useState("")
  const [selectedId, setSelectedId] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  const fileInputRef = useRef(null);
  const selectedIdRef = useRef(null);
  const bannerImgRef = useRef(null);

  const fetchAllBlogs = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_blogs("innovation"));
      setAllInnovation(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response.data.message);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_master_category("innovation")
      );
      setAllCategories(res.data.data);
    } catch (error) {
      console.error("Failed to fetch blog categories:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.categoryId) {
      toast.warning("Please fill all required fields.");
      return;
    }

    if (!image && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }
    setIsLoading(true)
    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("description", formData.longDescription);
    submissionData.append("isActive", formData.isActive);
    submissionData.append("auther", formData.author);
    submissionData.append("readTime", formData.readTime);
    submissionData.append("date", formData.date);
    submissionData.append("type", "innovation");
    submissionData.append("categoryId", formData.categoryId);
    submissionData.append("shortDescription", formData.shortDescription);
    if (image) submissionData.append("blog_image", image);
    if (formData.bannerImage) submissionData.append("banner_image", formData.bannerImage);

    const loadingToastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} Innovation...`
    );

    try {
      const url = isEdit
        ? adminApiRoutes.update_blog(selectedId)
        : adminApiRoutes.create_blog;

      const response = isEdit
        ? await adminAxios.put(url, submissionData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await adminAxios.post(url, submissionData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (response.status === 200) {
        fetchAllBlogs();
        onCancelEdit();
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
      console.log(error);
      toast.update(loadingToastId, {
        render: `Failed to ${isEdit ? "update" : "create"} innnovation. ${
          error?.response?.data?.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }finally{
      setIsLoading(false)
    }
  };

  const onCancelEdit = () => {
    setFormData({
      title: "",
      shortDescription: "",
      longDescription: "",
      author: "",
      categoryId: "",
      readTime: "",
      bannerImage:null,
      isActive: true,
      date: "",
    });
    setImage(null);
    setSelectedId(null);
    setBannerUImageName("")
    setIsEdit(false);
    if( bannerImgRef.current) bannerImgRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deleteBlog = async () => {
    try {
      const idToDelete = selectedIdRef.current || selectedId;
      await adminAxios.delete(adminApiRoutes.delete_blog(idToDelete));
      toast.success("Deleted Successfully");
      fetchAllBlogs();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllBlogs();
  }, []);

  useEffect(() => {
    return () => {
      galleryImages.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [galleryImages]);

  return (
    <>
      {/* Form Section */}
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit ? "editing" : ""}`}>
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">
                {isEdit ? "Edit Innovation" : "Add Innovation"}
              </h4>
              {isEdit && <button onClick={onCancelEdit}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {[
                  { label: "Title", name: "title", placeholder: "Enter title" },
                  {
                    label: "Author",
                    name: "author",
                    placeholder: "Enter author name",
                  },
                ].map(({ label, name, placeholder }) => (
                  <div className="col-lg-6" key={name}>
                    <div className="mb-3">
                      <label className="form-label">{label}</label>
                      <input
                        type="text"
                        className="form-control"
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ))}

                {/* Date  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      style={{ textTransform: "uppercase" }}
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                    
                  {/* Read time  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Read Time (0–60 min)</label>
                    <input
                      type="number"
                      name="readTime"
                      className="form-control"
                      min="0"
                      placeholder="Enter read time (0-60 min)"
                      max="60"
                      value={formData.readTime}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val >= 0 && val <= 60) {
                          setFormData((prev) => ({ ...prev, readTime: val }));
                        } else if (e.target.value === "") {
                          setFormData((prev) => ({ ...prev, readTime: "" }));
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Image {isEdit && !image && ` : ${selectedFileName}`}</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Banner Image  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label"> Banner Image {isEdit && !formData.bannerImage && ` : ${banneImagName}`}</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      ref={bannerImgRef}
                      onChange={(e) => setFormData((prev)=> ({...prev , bannerImage:e.target.files[0]}))}
                    />
                  </div>
                </div>

                {/* Category Select */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Select Category</label>
                    <select
                      className="form-select"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
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

                {/* status  */}
                <div className="col-lg-6">
                  <label className="form-label">Status</label>
                  <div className="d-flex gap-3">
                    {["true", "false"].map((val) => (
                      <div className="form-check" key={val}>
                        <input
                          type="radio"
                          name="isActive"
                          value={val}
                          checked={formData.isActive === (val === "true")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              isActive: e.target.value === "true",
                            }))
                          }
                          className="form-check-input"
                        />
                        <label className="form-check-label">
                          {val === "true" ? "Active" : "Inactive"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="col-lg-6">
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
                        setGalleryImages(Array.from(e.target.files));
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
                </div> */}

                {/* Short description */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label">Short Description</label>
                    <Ckeditor
                      text={formData.shortDescription}
                      setText={(text) =>
                        setFormData((prev) => ({
                          ...prev,
                          shortDescription: text,
                        }))
                      }
                      limit={220}
                    />
                  </div>
                </div>

                {/* Long decsription */}
                <div className="col-lg-12">
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

              </div>
            </div>

            <div className="card-footer border-top">
              <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Innovation</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Short Description</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allinnovation.length > 0 ? (
                      allinnovation.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link target="_blank" to={item.image_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={item.image_url}
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
                                    item.image_url
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>{item?.title}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: item?.shortDescription,
                            }}
                          ></td>
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
                            <div class="d-flex gap-2">
                              <button
                                class="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setIsEdit(true);
                                  setSelectedId(item.id);
                                  setFormData({
                                    title: item.title || "",
                                    categoryId: item.categoryId || "",
                                    shortDescription:
                                      item.shortDescription || "",
                                    longDescription: item.description || "",
                                    isActive: item.isActive ?? true,
                                    author: item.auther || "",
                                    bannerImage:null,
                                    date: item.date || "",
                                    readTime: item.readTime || "",
                                  });
                                  setBannerUImageName(item.bannerImage)
                                  setSelectedFileName(item.image);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this Package ?"
                                title="Delete Package"
                                onOk={() => deleteBlog()}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
                                    onClick={() => {
                                      selectedIdRef.current = item.id;
                                      setSelectedId(item.id);
                                    }}
                                  ></iconify-icon>
                                }
                              />
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

export default Manage;
