import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Ckeditor from "../CkEditor/Ckeditor.jsx";

const BlogsManagement = () => {
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDescription, setLongDescription] = useState("")
  const [status, setStatus] = useState(true);
  const [allCategories, setAllCategories] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const fileInputRef = useRef(null);

  const fetchAllBlogs = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_blogs);
      setBlogs(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
       toast.error(error.response.data.message)
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
    formData.append("categoryId", categoryId);
    formData.append("shortDescription", shortDesc);
    image && formData.append("blog_image", image);

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
        toast.success(response.data.message);
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to create slider.${error.response.data.message}`);
    }
  };

  const deleteBlog = async () => {
    try {
      await adminAxios.delete(adminApiRoutes.delete_blog(selectedId));
      toast.success("Deleted Successfully");
      fetchAllBlogs();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const onCancelEdit =()=>{
    setIsEdit(false);
    setSelectedId(null);
    setName("");
    setCategoryId("");
    setLongDescription("");
    setShortDesc("");
    setStatus("1");
    setImage(null)
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(html); // optional sanitization
    return tempDiv.textContent || tempDiv.innerText || "";
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
              {isEdit && <button onClick={()=>onCancelEdit()}>Cancel Edit</button>}
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
                      Blog Image {isEdit && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      id="service-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
  
                 {/* Short Description  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                    Short Desciption
                    </label>
                    <Ckeditor
                      text={shortDesc}
                      setText={setShortDesc}
                    />
                  </div>
                </div>
                 
                 {/* Long Description  */}
                <div className="col-lg-6">
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
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-footer border-top">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {isEdit ? `Update Changes` : `Save Change`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
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
                    {blogs.length > 0 ? (
                      blogs.map((item, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
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
                          <td>{stripHtml(item.shortDescription)}</td>
                          <td>{item?.categoryId}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.isActive 
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {item.isActive  ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div class="d-flex gap-2">
                              <button
                                class="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedId(item.id);
                                  setName(item.title);
                                  setCategoryId(item.categoryId);
                                  setShortDesc(item.shortDescription);
                                  setLongDescription(item.description);
                                  setStatus(item.isActive);
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
                                    onClick={() => setSelectedId(item.id)}
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

export default BlogsManagement
