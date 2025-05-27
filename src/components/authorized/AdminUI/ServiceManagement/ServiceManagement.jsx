import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import DOMPurify from "dompurify";
import "./services.scss"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";

const ServiceManagement = () => {
  const [sliderName, setSliderName] = useState("");
  const [sliderHeading, setSliderHeading] = useState("");
  const [sliderStatus, setSliderStatus] = useState(true);
  const [serviceBannerImage, setServiceBannerImage] = useState(null);
  const [selectedSliderId, setSelectedSliderId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedBannerFileName, setSelectedBannerFileName] = useState("");
  const [serviceShortDescription, setServiceShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [sliderImage, setSliderImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ctaButtons, setCtaButtons] = useState([]);
  const [limit] = useState(1);
  const fileInputRef = useRef(null);
  const fileInputBannerRef = useRef(null);

  const ctaOptions = [
    "Join",
    "Book A Consultation",
    "Smart Health Package",
    "Talk To A Fitness Expert",
    "Talk To A Therapist",
  ];

  const fetchAllServices = async (page = 1) => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_services, {
        page,
        limit,
      });
      setSliders(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (!sliderImage && !isEdit) {
      toast.warning("Please fill all required select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", sliderName);
    formData.append("description", sliderHeading);
    formData.append("isActive", sliderStatus);
    sliderImage && formData.append("service_image", sliderImage);

    try {
      let url = isEdit
        ? adminApiRoutes.update_service(selectedSliderId)
        : adminApiRoutes.create_service;

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

      fetchAllServices();
      onCancelEdit();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to create - ${error.response.data.message}`);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const deleteService = async () => {
    try {
      await adminAxios.delete(adminApiRoutes.delete_service(selectedSliderId));
      toast.success("Deleted Successfully");
      fetchAllServices();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
    setSelectedSliderId(null);
    setSliderName("");
    setSliderHeading("");
    setSliderStatus(true);
    setSliderImage(null);
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(sliders);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setSliders(reordered);

    // try {
    //   // Send the new order to the backend
    //   await adminAxios.post(adminApiRoutes.update_service_order, {
    //     orderedIds: reordered.map((item) => item.id),
    //   });
    //   toast.success("Service order updated successfully");
    // } catch (error) {
    //   console.error("Failed to update order:", error);
    //   toast.error("Failed to update service order");
    //   // Revert to the original order if the API call fails
    //   fetchAllServices(currentPage);
    // }
  };

  useEffect(() => {
    fetchAllServices(currentPage);
  }, [currentPage]);

  
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Service` : `Add Service`}
              </h4>
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Slider Name */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-name" className="form-label">
                      Service Name
                    </label>
                    <input
                      type="text"
                      id="service-name"
                      className="form-control"
                      placeholder="Enter name"
                      value={sliderName}
                      onChange={(e) => setSliderName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Service Banner Image{" "}
                      {isEdit && ` : ${selectedBannerFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      id="service-image"
                      ref={fileInputBannerRef}
                      className="form-control"
                      onChange={(e) => setServiceBannerImage(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      id="service-des"
                      style={{ resize: "vertical", minHeight: "100px" }}
                      className="form-control"
                      placeholder="Enter short description"
                      value={serviceShortDescription}
                      onChange={(e) => {
                        const text = e.target.value;
                        if (text.length <= 200) {
                          setServiceShortDescription(text);
                        }
                      }}
                    />
                    <small className="text-muted">
                      {serviceShortDescription.length}/200 characters
                    </small>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Long Desciption
                    </label>
                    <textarea
                      type="text"
                      id="service-des"
                      style={{ resize: "vertical", minHeight: "100px" }}
                      className="form-control"
                      placeholder="Enter long description"
                      value={longDescription}
                      onChange={(e) => setLongDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Service Image {isEdit && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      id="service-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setSliderImage(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* CTA button */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">CTA Button</label>
                    <div className="d-flex flex-wrap gap-3">
                      {ctaOptions.map((option, index) => (
                        <div className="form-check" key={index}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`cta-${index}`}
                            checked={ctaButtons.includes(option)}
                            onChange={(e) => {
                              const selected = ctaButtons.includes(option);
                              setCtaButtons(
                                selected
                                  ? ctaButtons.filter((item) => item !== option)
                                  : [...ctaButtons, option]
                              );
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`cta-${index}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Heading */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Service Desciption
                    </label>
                    <Ckeditor text={sliderHeading} setText={setSliderHeading} />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <p>Service Status</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="service-status"
                        value={true}
                        checked={sliderStatus == true}
                        onChange={() => setSliderStatus(true)}
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
                        checked={sliderStatus == false}
                        onChange={() => setSliderStatus(false)}
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
              <h4 className="card-title">All Services</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    {sliders.length > 0 && (
                      <Droppable droppableId={"droppable"}>
                        {(provided) => (
                          <tbody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {sliders.map((service, index) => (
                              <Draggable
                                key={service.id.toString()}
                                draggableId={service.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <tr
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      display: 'table-row',
                                    }}
                                  >
                                    <td>{service.id}</td>
                                    <td>
                                      <Link
                                        target="_blank"
                                        to={service.image_url}
                                      >
                                        <img
                                          crossOrigin="anonymous"
                                          src={service.image_url}
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
                                              service.image_url
                                            );
                                          }}
                                        />
                                      </Link>
                                    </td>
                                    <td>{service.name}</td>
                                    <td>{getShortText(service.description)}</td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          service.isActive
                                            ? "bg-success"
                                            : "bg-danger"
                                        }`}
                                      >
                                        {service.isActive
                                          ? "Active"
                                          : "Inactive"}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="d-flex gap-2">
                                        <button
                                          className="btn btn-soft-primary btn-sm"
                                          onClick={() => {
                                            setIsEdit(true);
                                            setSelectedSliderId(service.id);
                                            setSliderName(service.name);
                                            setSliderHeading(
                                              service.description
                                            );
                                            setSelectedFileName(service.image);
                                            setSliderStatus(service.isActive);
                                          }}
                                        >
                                          <iconify-icon
                                            icon="solar:pen-2-broken"
                                            class="align-middle fs-18"
                                          ></iconify-icon>
                                        </button>

                                        <ConfirmationPopup
                                          bodyText="Are you sure you want to delete this Service?"
                                          title="Delete Service"
                                          onOk={() => deleteService()}
                                          buttonText={
                                            <iconify-icon
                                              icon="solar:trash-bin-minimalistic-2-broken"
                                              class="align-middle fs-18"
                                              onClick={() =>
                                                setSelectedSliderId(service.id)
                                              }
                                            ></iconify-icon>
                                          }
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </tbody>
                        )}
                      </Droppable>
                    )}
                  </DragDropContext>
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

export default ServiceManagement;
