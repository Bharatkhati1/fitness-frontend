import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import DOMPurify from "dompurify";
import "./services.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote.jsx";

const ServiceManagement = () => {
  const [sliderName, setSliderName] = useState("");
  const [sliderHeading, setSliderHeading] = useState("");
  const [sliderStatus, setSliderStatus] = useState(true);
  const [serviceBannerImage, setServiceBannerImage] = useState(null);
  const [emailInputs, setEmailInputs] = useState({});
  const [selectedSliderId, setSelectedSliderId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedBannerFileName, setSelectedBannerFileName] = useState("");
  const [serviceShortDescription, setServiceShortDescription] = useState("");
  const [storyImageName, setStoryImageName] = useState(null);
  const [storyImage, setStoryImage] = useState(null);
  const [sliderImage, setSliderImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [isPublished, setIsPublished] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ctaButtons, setCtaButtons] = useState([]);
  const [limit] = useState(1);
  const [filterService, setFilterServices] = useState([]);
  const fileInputRef = useRef(null);
  const fileInputBannerRef = useRef(null);
  const storyImageRef = useRef(null);
  const selectedIdref = useRef(null);

  const ctaOptions = ["Contact our Helpline", "Know more", "Talk to an Expert"];

  const fetchAllServices = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_services);
      setSliders(res.data.data);
      setFilterServices(res.data.data);
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
    formData.append("actions", JSON.stringify(ctaButtons));
    formData.append("description", sliderHeading);
    formData.append("shortDescription", serviceShortDescription);
    formData.append("isActive", sliderStatus);
    formData.append("isPublished", isPublished || false);
    sliderImage && formData.append("service_image", sliderImage);
    serviceBannerImage && formData.append("banner_image", serviceBannerImage);
    if (storyImage) formData.append("story_image", storyImage);
    const loadingToastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} service...`
    );
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
      toast.update(loadingToastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchAllServices();
      onCancelEdit();
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.update(loadingToastId, {
        render: `Failed to ${isEdit ? "update" : "create"} service. ${
          error?.response?.data?.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const deleteService = async () => {
    try {
      const idToDelete = selectedIdref.current;
      await adminAxios.delete(adminApiRoutes.delete_service(idToDelete));
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
    setServiceShortDescription("");
    setSliderHeading("");
    setSliderStatus(true);
    setSliderImage(null);
    setSelectedFileName(null);
    setSelectedBannerFileName("");
    setCtaButtons([]);
    setStoryImage(null);
    setIsPublished("")
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (storyImageRef) {
      storyImageRef.current.value = "";
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(sliders);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setSliders(reordered);
    const reordeObj = reordered.map((order, index) => ({
      id: order.id,
      order: index + 1,
    }));
    try {
      // Send the new order to the backend
      await adminAxios.put(adminApiRoutes.update_service_order, {
        sequences: reordeObj,
      });
      fetchAllServices();
      toast.success("Service order updated successfully");
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update service order");
      // Revert to the original order if the API call fails
      fetchAllServices();
    }
  };

  const handleSearch = (search) => {
    if (search.length > 0) {
      const filterValue = sliders.filter((val) =>
        val.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterServices(filterValue);
    } else {
      setFilterServices(sliders);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

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

                {/* Banner Image */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Service Banner Image{" "}
                      {isEdit &&
                        !serviceBannerImage &&
                        ` : ${selectedBannerFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="service-image"
                      ref={fileInputBannerRef}
                      className="form-control"
                      onChange={(e) => setServiceBannerImage(e.target.files[0])}
                    />
                    <ImageDimensionNote  type="innerBanner"/>
                  </div>
                </div>

                {/* Service Image */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Service Image{" "}
                      {isEdit && !sliderImage && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="service-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setSliderImage(e.target.files[0])}
                    />
                     <ImageDimensionNote  type="service"/>
                  </div>
                </div>

                {/* Story Image */}
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Our Approach Image{" "}
                      {isEdit && !storyImage && ` : ${storyImageName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="service-image"
                      ref={storyImageRef}
                      className="form-control"
                      onChange={(e) => setStoryImage(e.target.files[0])}
                    />
                     <ImageDimensionNote  type="storyImage"/>
                  </div>
                </div>

                {/* Short Description */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Short Description
                    </label>
                    <Ckeditor
                      text={serviceShortDescription}
                      setText={setServiceShortDescription}
                      limit={320}
                    />
                  </div>
                </div>

                {/* Long Description */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Long Desciption
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
                    {
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
                    }
                  </div>
                </div>

                {/*Published Status */}
                {sliderStatus == true && (
                  <div className="col-lg-6">
                    <p>Published Status</p>
                    <div className="d-flex gap-2 align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value={true}
                          checked={isPublished == true}
                          onChange={() => setIsPublished(true)}
                          id="pub-status-active"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="pub-status-active"
                        >
                          Published
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value={false}
                          checked={isPublished == false}
                          onChange={() => setIsPublished(false)}
                          id="pub-status-inactive"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="pub-status-inactive"
                        >
                          Coming Soon
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA button */}
                <div className="col-xxl-6 col-lg-8">
                  <div className="mb-3">
                    <label className="form-label">CTA Button</label>
                    <div className="">
                      {ctaOptions.map((option, index) => {
                        const matchedButton = ctaButtons?.find(
                          (btn) => btn.name === option
                        );
                        const inputValue =
                          emailInputs[option] ??
                          matchedButton?.emails.join(", ") ??
                          "";
                        return (
                          <div
                            className="row align-items-center my-1"
                            key={index}
                          >
                            <div className="col-6">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`cta-${index}`}
                                  checked={!!matchedButton}
                                  onChange={() => {
                                    if (matchedButton) {
                                      setCtaButtons((prev) =>
                                        prev?.filter(
                                          (item) => item.name !== option
                                        )
                                      );
                                      setEmailInputs((prev) => {
                                        const updated = { ...prev };
                                        delete updated[option];
                                        return updated;
                                      });
                                    } else {
                                      setCtaButtons((prev) => [
                                        ...prev,
                                        { name: option, emails: [] },
                                      ]);
                                      setEmailInputs((prev) => ({
                                        ...prev,
                                        [option]: "",
                                      }));
                                    }
                                  }}
                                />
                                <label
                                  className="form-check-label m-0"
                                  htmlFor={`cta-${index}`}
                                >
                                  {option}
                                </label>
                              </div>
                            </div>

                            {/* {matchedButton &&
                              matchedButton.name != "Know more" && (
                                <div className="col-lg-6">
                                  <div className="email-new">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter emails ',' separated"
                                      value={inputValue}
                                      onChange={(e) => {
                                        const input = e.target.value;
                                        setEmailInputs((prev) => ({
                                          ...prev,
                                          [option]: input,
                                        }));
                                      }}
                                      onBlur={() => {
                                        const emailArray = inputValue
                                          .split(",")
                                          .map((email) => email.trim())
                                          .filter((email) => email.length > 0);

                                        setCtaButtons((prev) =>
                                          prev?.map((btn) =>
                                            btn.name === option
                                              ? { ...btn, emails: emailArray }
                                              : btn
                                          )
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              )} */}
                          </div>
                        );
                      })}
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
                    {filterService.length > 0 && (
                      <Droppable droppableId={"droppable"} direction="vertical">
                        {(provided) => (
                          <tbody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {filterService.map((service, index) => (
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
                                      display: "table-row",
                                    }}
                                  >
                                    <td>{index + 1}</td>
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
                                    <td>{getShortText(service.shortDescription)}</td>
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
                                            window.scrollTo(0, 0);
                                            setIsEdit(true);
                                            setSelectedSliderId(service.id);
                                            setCtaButtons(
                                              JSON.parse(service.actions) || []
                                            );
                                            setIsPublished(service.isPublished)
                                            setSliderName(service.name);
                                            setSliderHeading(
                                              service.description
                                            );
                                            setSelectedBannerFileName(
                                              service.banner
                                            );
                                            setServiceShortDescription(
                                              service.shortDescription
                                            );
                                            setStoryImageName(
                                              service?.story_image
                                            );
                                            setSelectedFileName(service.image);
                                            setSliderStatus(service.isActive);
                                            setStoryImageName(
                                              service?.story_image
                                            );
                                            
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
                                                (selectedIdref.current =
                                                  service.id)
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
            {/* <div className="card-footer border-top">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceManagement;
