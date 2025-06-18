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
  const selectedIdref = useRef(null)
  const fileInputRefAfter = useRef(null);
  const fileInputRefBefore = useRef(null);

  const fetchAllSuccessStories = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_success_stories);
      setSuccessStories(res.data.data);
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

    const loadingToastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} story...`
    );
    try {
      let url = isEdit
        ? adminApiRoutes.update_success_story(selectedSuccesStoryId)
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
      toast.update(loadingToastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchAllSuccessStories();
      onCancelEdit();
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.update(loadingToastId, {
        render: `Failed to ${isEdit ? "update" : "create"} Story. ${
          error?.response?.data?.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const deleteSuccessStory = async () => {
    try {
      const idToDelete = selectedIdref.current;
      await adminAxios.delete(
        adminApiRoutes.delete_success_story(idToDelete)
      );
      toast.success("Deleted Successfully");
      fetchAllSuccessStories();
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
                {isEdit
                  ? `Edit Selected Success Story`
                  : `Create Success Story`}
              </h4>
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Images */}
                <div className="col-lg-6">
                  {/*Before image */}
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Before Image {isEdit && !beforeImage &&`: ${succesStoryImage2}`}
                    </label>
                    <input
                      type="file"
                       accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="service-image"
                      ref={fileInputRefBefore}
                      className="form-control"
                      onChange={(e) => setBeforeImage(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  {/* After image */}
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      After Image {isEdit && !afterImage && `: ${succesStoryImage1}`}
                    </label>
                    <input
                      type="file"
                       accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="service-image"
                      ref={fileInputRefAfter}
                      className="form-control"
                      onChange={(e) => setAfterImage(e.target.files[0])}
                    />
                  </div>
                </div>
                {/* Description */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="service-name" className="form-label">
                      Description
                    </label>
                    <Ckeditor
                      text={description}
                      setText={(val) => setDescription(val)}
                    />
                  </div>
                </div>
                {/* Status
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
                </div> */}
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
              <h4 className="card-title">All Success Stories</h4>
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
                      {/* <th>Status</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {successStories.length > 0 ? (
                      successStories.map((story, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link target="_blank" to={story.before_image_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={story.before_image_url}
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
                            <Link target="_blank" to={story.after_image_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={story.after_image_url}
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
                          {/* <td>
                            <span
                              className={`badge ${
                                story.is_active === 1
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {story.is_active === 1 ? "Active" : "Inactive"}
                            </span>
                          </td> */}
                          <td>
                            <div class="d-flex gap-2">
                              <button
                                class="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  window.scrollTo(0, 0);
                                  setSelectedSuccesStoryId(story.id);
                                  setDescription(story.description);
                                  setSuccesStoryImage1(story.afterImage);
                                  setSuccesStoryImage2(story.beforeImage);
                                  setsSuccesStoryStatus(story.isActive);
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
                                onOk={() => deleteSuccessStory()}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
                                    onClick={() =>
                                      (selectedIdref.current = story.id)
                                    }
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
          </div>
        </div>
      </div>
    </>
  );
};
export default SuccessStories;
