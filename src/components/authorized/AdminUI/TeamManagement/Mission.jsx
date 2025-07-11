import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote.jsx";

const Mission = () => {
  const [sliderName, setSliderName] = useState("");
  const [sliderHeading, setSliderHeading] = useState("");
  const [sliderSubheading, setSliderSubheading] = useState("");
  const [sliderStatus, setSliderStatus] = useState(true);
  const [selectedSliderId, setSelectedSliderId] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [sliderImage, setSliderImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [filterService, setFilterServices] = useState([]);
  const fileInputRef = useRef(null);
  const selectedIdref = useRef(null);

  const fetchAllSliders = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_sliders("misson"));
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
    formData.append("heading", sliderHeading);
    formData.append("subHeading", "sliderSubheading");
    formData.append("isActive", true);
    formData.append("slug", "misson");
    sliderImage && formData.append("slider_image", sliderImage);

    try {
      let url = isEdit
        ? adminApiRoutes.update_slider(selectedSliderId)
        : adminApiRoutes.create_slider;
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
      toast.success(response.data.message);
      fetchAllSliders();
      onCancelEdit();
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to create slider.${error.response.data.message}`);
    }
  };

  const deleteSlider = async () => {
    try {
      const idToDelete = selectedIdref.current || selectedSliderId;
      await adminAxios.delete(adminApiRoutes.delete_slider(idToDelete));
      toast.success("Deleted Successfully");
      fetchAllSliders();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllSliders();
  }, []);

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedSliderId(null);
    setSliderName("");
    setSliderHeading("");
    setSliderSubheading("");
    setSliderStatus(true);
    setSliderImage(null);
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Message` : `Add Message`}
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
                    <label htmlFor="slider-name" className="form-label">
                      Name
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
                      Image {isEdit && !sliderImage && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="slider-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setSliderImage(e.target.files[0])}
                    />
                     <ImageDimensionNote type="teamMessage" />
                  </div>
                </div>

                {/* Heading */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="slider-heading" className="form-label">
                      Message
                    </label>
                    <input
                      type="text"
                      id="slider-heading"
                      className="form-control"
                      placeholder="Enter message"
                      value={sliderHeading}
                      onChange={(e) => setSliderHeading(e.target.value)}
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
              <h4 className="card-title">All Messages</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterService.length > 0 ? (
                      filterService.map((slider, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link target="_blank" to={slider.image_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={slider.image_url}
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
                                    slider.image_url
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>{slider.name}</td>
                          <td>{slider.heading}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setIsEdit(true);
                                  setSelectedSliderId(slider.id);
                                  setSliderName(slider.name);
                                  setSliderHeading(slider.heading);
                                  setSliderSubheading(slider.subHeading);
                                  setSelectedFileName(slider.image);
                                  setSliderStatus(slider.isActive);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this Message ?"
                                title="Delete Message "
                                onOk={() => deleteSlider()}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
                                    onClick={() => {
                                      selectedIdref.current = slider.id;
                                      setSelectedSliderId(slider.id);
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
                          No message found.
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

export default Mission;
