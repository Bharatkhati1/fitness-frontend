import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote.jsx";

const WhyUsImage = () => {
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
        const res = await adminAxios.get(adminApiRoutes.get_sliders("whyus"));
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
      formData.append("name", "sliderName");
      formData.append("heading", "sliderHeading");
      formData.append("subHeading", "sliderSubheading");
      formData.append("isActive", true);
      formData.append("slug", "whyus");
      sliderImage && formData.append("slider_image", sliderImage);
  
      try {
        let url = adminApiRoutes.update_slider(24)
        let response;
          response = await adminAxios.put(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        toast.success(response.data.message);
        fetchAllSliders();
        onCancelEdit();
      } catch (error) {
        console.error("Something went wrong:", error);
        toast.error(`Failed to create slider.${error.response.data.message}`);
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
  
    return (
        <div className="row">
          <div className="col-lg-12">
            <div className={`card ${isEdit && `editing`}`}>
              <div className="card-header">
                <h4 className="card-title">
                  { `Upadte Image`}
                </h4>
                {isEdit && (
                  <button onClick={() => onCancelEdit()}>Cancel Edit</button>
                )}
              </div>
              <div className="card-body">
                <div className="row">
  
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
                      <ImageDimensionNote type="innerBanner"/>
                    </div>
                    <p>Preview:</p>
                    <img style={{width:"90px", height:"90px"}} crossOrigin="anonymous" src={sliders[0]?.image_url}/>
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
                  {`Update Changes`}
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default WhyUsImage
