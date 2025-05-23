import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import DOMPurify from "dompurify";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import TextArea from "antd/es/input/TextArea.js";

const SuccessStories = () => {
  const [description, setDescription] = useState("");
  const [succesStoryStatus, setsSuccesStoryStatus] = useState(true);
  const [afterImage, setAfterImage] = useState("");
  const [beforeImage, setBeforeImage] = useState(null);
  const [succesStoryImage2, setSuccesStoryImage2] = useState(null);
  const [succesStoryImage1, setSuccesStoryImage1] = useState(null);
  const [selectedSuccesStoryId, setSelectedSuccesStoryId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [successStories, setSuccessStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fileInputRefAfter = useRef(null);
  const fileInputRefBefore = useRef(null);

  const fetchAllSuccessStories = async (page = 1) => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_success_stories);
      setSliders(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if ((!afterImage || !beforeImage) && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    beforeImage && formData.append("before_image", beforeImage);
    afterImage && formData.append("after_image", afterImage);

    try {
      let url = isEdit
        ? adminApiRoutes.update_success_story(selectedSliderId)
        : adminApiRoutes.create_success_story;

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

        fetchAllSuccessStories();
        onCancelEdit();
        toast.success(response.data.message);
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to create slider.${error.response.data.message}`);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const deleteSuccessStory = async (id) => {
    try {
      await adminAxios.delete(adminApiRoutes.delete_service(id));
      toast.success("Deleted Successfully");
      fetchAllServices();
    } catch (error) {
      console.log(error);
    }
  };

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(html); // optional sanitization
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const getShortText = (html, limit = 80) => {
    const plainText = stripHtml(html);
    return plainText.length > limit
      ? plainText.slice(0, limit) + "..."
      : plainText;
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedSuccesStoryId(null);
    setDescription("");
    setSuccesStoryImage2(null);
    setSuccesStoryImage1(null);
    setBeforeImage(null);
    setAfterImage(null);
    if (fileInputRefBefore.current) {
      fileInputRefBefore.current.value = "";
    }
    if (fileInputRefAfter.current) {
      fileInputRefAfter.current.value = "";
    }
  };

  useEffect(() => {
    fetchAllSuccessStories();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
               {isEdit ? `Edit Selected Service` : `Create Service`}
              </h4>
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )} 
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-name" className="form-label">
                      Description
                    </label>
                    <TextArea
                      type="text"
                      minLength={6}
                      id="service-name"
                      className="form-control"
                      placeholder="Enter name"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Before Image {isEdit && ` : ${beforeImage}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      id="service-image"
                      ref={fileInputRefBefore}
                      className="form-control"
                      onChange={(e) => setBeforeImage(e.target.files[0])}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      After Image {isEdit && ` : ${beforeImage}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      id="service-image"
                      ref={fileInputRefAfter}
                      className="form-control"
                      onChange={(e) => setAfterImage(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <p>Status</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="service-status"
                        value={true}
                        checked={succesStoryStatus == true}
                        onChange={() => setsSuccesStoryStatus(true)}
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
                        checked={succesStoryStatus == false}
                        onChange={() => setsSuccesStoryStatus(false)}
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
              <h4 className="card-title">All Sliders</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Before Image</th>
                      <th>After Image</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {successStories.length > 0 ? (
                      successStories.map((story, index) => (
                        <tr key={index}>
                          <td>{story.id}</td>
                          <td>
                            <Link target="_blank" to={story.before_img}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={story.before_img}
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
                                    story.img_url
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>
                            <Link target="_blank" to={story.before_img}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={story.after_img}
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
                                    story.after_img
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>{getShortText(story.description)}</td>
                          <td>
                            <span
                              className={`badge ${
                                story.is_active === 1
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {story.is_active === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div class="d-flex gap-2">
                              <button
                                class="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedSuccesStoryId(story.id);
                                  setDescription(story.description);
                                  setAfterImage(story.after_img);
                                  setBeforeImage(story.before_img);
                                  setSliderStatus(story.isActive);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this Success Story ?"
                                title="Delete Success Story "
                                onOk={() => deleteSuccessStory(story.id)}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
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
                          No Success Story found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer border-top">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SuccessStories;
