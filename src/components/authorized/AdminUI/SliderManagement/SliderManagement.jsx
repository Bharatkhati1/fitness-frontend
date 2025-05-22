import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../utils/axios/axiosInstance.jsx";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SliderManagement = () => {
  const [sliderName, setSliderName] = useState("");
  const [sliderHeading, setSliderHeading] = useState("");
  const [sliderSubheading, setSliderSubheading] = useState("");
  const [sliderStatus, setSliderStatus] = useState("1");
  const [selectedSliderId, setSelectedSliderId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [sliderImage, setSliderImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const fileInputRef = useRef(null);
  const fetchAllSliders = async (page = 1) => {
    try {
      const res = await axiosInstance.post(`/slider/get-sliders`, {
        page,
        limit,
      });
      setSliders(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
    }
  };

  const handleSubmit = async () => {
    if (!sliderImage && !isEdit) {
      toast.warning("Please fill all required select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", sliderName);
    formData.append("heading", sliderHeading);
    formData.append("subheading", sliderSubheading);
    formData.append("is_active", sliderStatus);
    sliderImage && formData.append("image", sliderImage);

    try {
      let url = isEdit
        ? `/slider/edit-slider/${selectedSliderId}`
        : `/slider/create-slider`;
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        fetchAllSliders();
        setIsEdit(false);
        setSelectedSliderId(null);
        setSliderName("");
        setSliderHeading("");
        setSliderSubheading("");
        setSliderStatus("1");
        setSliderImage(null);
        setSelectedFileName(null);
        setSliderStatus(`1`);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success(response.data.message);
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error("Failed to create slider.");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const deleteSlider = async (id) => {
    try {
      await axiosInstance.delete(`/slider/${id}`);
      toast.success("Deleted Successfully");
      fetchAllSliders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllSliders(currentPage);
  }, [currentPage]);

  const onCancelEdit =()=>{
    setIsEdit(false);
        setSelectedSliderId(null);
        setSliderName("");
        setSliderHeading("");
        setSliderSubheading("");
        setSliderStatus("1");
        setSliderImage(null);
        setSelectedFileName(null);
        setSliderStatus(`1`);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Slider` : `Create Slider`}
              </h4>
              {isEdit && <button onClick={()=>onCancelEdit()}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Slider Name */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="slider-name" className="form-label">
                      Slider Name
                    </label>
                    <input
                      type="text"
                      id="slider-name"
                      className="form-control"
                      placeholder="Enter name"
                      value={sliderName}
                      onChange={(e) => setSliderName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Slider Image */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="slider-image" className="form-label">
                      Slider Image {isEdit && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      id="slider-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setSliderImage(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Heading */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="slider-heading" className="form-label">
                      Slider Heading
                    </label>
                    <input
                      type="text"
                      id="slider-heading"
                      className="form-control"
                      placeholder="Enter heading"
                      value={sliderHeading}
                      onChange={(e) => setSliderHeading(e.target.value)}
                    />
                  </div>
                </div>

                {/* Subheading */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="slider-subheading" className="form-label">
                      Slider SubHeading
                    </label>
                    <input
                      type="text"
                      id="slider-subheading"
                      className="form-control"
                      placeholder="Enter subheading"
                      value={sliderSubheading}
                      onChange={(e) => setSliderSubheading(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <p>Slider Status</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="slider-status"
                        value="1"
                        checked={sliderStatus === "1"}
                        onChange={() => setSliderStatus("1")}
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
                        name="slider-status"
                        value="0"
                        checked={sliderStatus === "0"}
                        onChange={() => setSliderStatus("0")}
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
                      <th>Image</th>
                      <th>Name</th>
                      <th>Heading</th>
                      <th>Subheading</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sliders.length > 0 ? (
                      sliders.map((slider, index) => (
                        <tr key={index}>
                          <td>{slider.id}</td>
                          <td>
                            <Link target="_blank" to={slider.img_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={slider.img_url}
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
                                    slider.img_url
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>{slider.name}</td>
                          <td>{slider.heading}</td>
                          <td>{slider.subheading}</td>
                          <td>
                            <span
                              className={`badge ${
                                slider.is_active === 1
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {slider.is_active === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedSliderId(slider.id);
                                  setSliderName(slider.name);
                                  setSliderHeading(slider.heading);
                                  setSliderSubheading(slider.subheading);
                                  setSelectedFileName(slider.img_name);
                                  setSliderStatus(`${slider.is_active}`);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this Slider ?"
                                title="Delete Slider "
                                onOk={() => deleteSlider(slider.id)}
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
                          No sliders found.
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

export default SliderManagement;
