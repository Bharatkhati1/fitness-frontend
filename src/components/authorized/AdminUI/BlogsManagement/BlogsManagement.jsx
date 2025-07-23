import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote.jsx";

const BlogsManagement = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [readTime, setReadTime] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [bannerName, setBannername] = useState("");
  const [image, setImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filteredData, setfilteredData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const fileInputRef = useRef(null);
  const bannerImgref = useRef(null);
  const selectedIdref = useRef(null);
  const readTimeDefault = useRef("");

  const fetchAllBlogs = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_blogs("blogs"));
      setBlogs(res.data.data);
      setfilteredData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response.data.message);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_categories);
      setAllCategories(res.data.data);
    } catch (error) {
      console.error("Failed to fetch blog categories:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (!image && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", longDescription);
    formData.append("isActive", status);
    formData.append("auther", author);
    formData.append("readTime", readTime);
    formData.append("date", date);
    formData.append("type", "blogs");
    formData.append("categoryId", categoryId);
    formData.append("shortDescription", shortDesc);
    image && formData.append("blog_image", image);
    bannerImage && formData.append("banner_image", bannerImage);
    const loadingToastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} blog...`
    );
    setIsLoading(true);
    try {
      let url = isEdit
        ? adminApiRoutes.update_blog(selectedId)
        : adminApiRoutes.create_blog;

      let response;
      if (isEdit) {
        response = await adminAxios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await adminAxios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.status == 200) {
        fetchAllBlogs();
        onCancelEdit();
        toast.update(loadingToastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.update(loadingToastId, {
        render: `Failed to ${isEdit ? "update" : "create"} blog. ${
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

  const deleteBlog = async () => {
    try {
      const idToDelete = selectedIdref.current;
      await adminAxios.delete(adminApiRoutes.delete_blog(idToDelete));
      toast.success("Deleted Successfully");
      fetchAllBlogs();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = (search) => {
    if (search.length > 0) {
      const filterValue = blogs.filter((val) =>
        val.title.toLowerCase().includes(search.toLowerCase())
      );
      setfilteredData(filterValue);
    } else {
      setfilteredData(blogs);
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedId(null);
    setName("");
    setDate("");
    setCategoryId("");
    setBannername("");
    setBannerImage(null);
    setLongDescription("");
    setShortDesc("");
    setStatus("1");
    setImage(null);
    setReadTime("");
    setAuthor("");
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (bannerImgref.current) {
      bannerImgref.current.value = "";
    }
  };

  useEffect(() => {
    fetchAllBlogs();
    fetchAllCategories();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Blog` : `Create Blog`}
              </h4>
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Blog title  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-name" className="form-label">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      id="service-name"
                      className="form-control"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Blog Image  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Blog Image {isEdit && !image && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="service-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <ImageDimensionNote type="innerBanner" />
                  </div>
                </div>

                {/* Banner Image  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Banner Image{" "}
                      {isEdit && !bannerImage && ` : ${bannerName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="service-image"
                      ref={bannerImgref}
                      className="form-control"
                      onChange={(e) => setBannerImage(e.target.files[0])}
                    />
                    <ImageDimensionNote type="blogImage" />
                  </div>
                </div>

                {/* Author  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-author" className="form-label">
                      Author Name
                    </label>
                    <input
                      type="text"
                      id="service-author"
                      className="form-control"
                      placeholder="Enter author name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                </div>

                {/* Read Time  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-time" className="form-label">
                      Read Time (minutes)
                    </label>
                    <input
                      type="text"
                      id="service-time"
                      className="form-control"
                      placeholder="Enter read time (0-60)"
                      min="0"
                      max="60"
                      value={readTime}
                      inputMode="numeric"
                      onInput={e => {
                        const input = e.target.value;
                        const regex = /^[0-9]*$/; 
                        if (regex.test(input)) {
                          if (input.length <= 2 && parseInt(input) <= 60) {
                            readTimeDefault.current = input;
                            setReadTime(input);
                          } else {
                            e.target.value = readTimeDefault.current;
                          }
                        } else {
                          e.target.value = readTimeDefault.current;
                        }
                      }}
                      onKeyPress={e => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Category  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="package-type" className="form-label">
                      Select Category
                    </label>
                    <select
                      id="package-type"
                      className="form-select"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value="">Select category</option>
                      {allCategories?.map((category) => (
                        <option value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Select Date */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="select-date" className="form-label">
                      Select Date
                    </label>
                    <input
                      type="date"
                      id="select-date"
                      style={{ textTransform: "uppercase" }}
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <p>Blog Status</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="service-status"
                        value={true}
                        checked={status}
                        onChange={() => setStatus(true)}
                        id="status-active"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="service-status"
                        value={false}
                        checked={!status}
                        onChange={() => setStatus(false)}
                        id="status-inactive"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>

                {/* Long Description  */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Long Desciption
                    </label>
                    <Ckeditor
                      text={longDescription}
                      setText={setLongDescription}
                    />
                  </div>
                </div>
                {/* Short Description  */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Short Desciption
                    </label>
                    <Ckeditor
                      text={shortDesc}
                      setText={setShortDesc}
                      limit={320}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-footer border-top">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isEdit ? `Update Changes` : `Save Change`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
      <div className="d-flex justify-content-end mb-3">
          <input
            className="w-50"
            placeholder="Search here"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginLeft: "20px" }}
          />
        </div>
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Blogs</h4>
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
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
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
                          <td>{item?.BlogCategory?.name}</td>
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
                                  setName(item.title);
                                  setBannername(item.bannerImage);
                                  setCategoryId(item.categoryId);
                                  setShortDesc(item.shortDescription);
                                  setLongDescription(item.description);
                                  setStatus(item.isActive);
                                  setDate(item.date || "");
                                  setReadTime(item.readTime);
                                  setAuthor(item?.auther);
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
                                      selectedIdref.current = item.id;
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

export default BlogsManagement;
