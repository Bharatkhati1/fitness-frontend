import React, { useEffect, useState } from "react";
import fillstar from "../../../../public/assets/img/fillstar.png";
import pencilicon from "../../../../public/assets/img/pencilicon.png";
import delicon from "../../../../public/assets/img/delicon.png";
import { Modal } from "antd";
import { toast } from "react-toastify";
import userAxios from "../../../utils/Api/userAxios";
import userApiRoutes from "../../../utils/Api/Routes/userApiRoutes";
import { useSelector } from "react-redux";
import moment from "moment";

function MyTestimonails() {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alltestimonials, setAlltestimonials] = useState([]);
  const [packages, setpackages] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [testimonialText, setTestimonialText] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedRating(0);
    setSelectedService("");
    setTestimonialText("");
  };

  const fetchtestimonials = async () => {
    try {
      const res = await userAxios.get(
        userApiRoutes.get_testimonials(null, user.id)
      );
      setAlltestimonials(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    const matchingEntry = packages.find(
      (item) => item.PackagePlan?.Package?.id == selectedService
    );
    const serviceId = matchingEntry?.PackagePlan?.Package?.Service?.id || null;
    const payload = {
      rating: selectedRating,
      packageId: selectedService,
      description: testimonialText,
      serviceId: serviceId,
    };
    try {
      const res = await userAxios.post(userApiRoutes.add_testimonial, payload);
      toast.success(res.data.message);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleStarClick = (index) => {
    setSelectedRating(index + 1);
  };

  const fetchFeedbackPackages = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_feedback_package);
      setpackages(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchtestimonials();
    fetchFeedbackPackages();
  }, []);
  return (
    <>
      <div className="CardBody">
        <div className="CardBodybtn text-end mb-4">
          <button
            className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
            onClick={showModal}
          >
            Add Testimonial
          </button>
        </div>

        {/* Example static testimonial card */}
        {alltestimonials.map((testimonial) => (
          <div className="pakagesbox ratingsbox mb-4">
            <div className="pakagehead">
              <div className="row">
                <div className="col">
                  <div className="pakageheadtitle">
                    <h4>{testimonial?.Package?.name}</h4>
                    <span>{testimonial?.Service?.name}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pakagebody">
              <div className="row ">
                <div className="col">
                  <ul className="rating d-flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <li key={i}>
                        <img src={fillstar} alt="star" />
                      </li>
                    ))}
                  </ul>
                  <p>{testimonial.description}</p>

                  {/* <div className="cardfooter d-flex align-items-center justify-content-between">
                  <span>Submitted on {moment(testimonial.createdAt).format("DD MMM YYYY")}</span>
                  <div className="actioninfo d-flex">
                    <a>
                      <img src={pencilicon} alt="edit" />
                      Edit
                    </a>
                    <a className="dele-btn">
                      <img src={delicon} alt="delete" />
                      Delete
                    </a>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
        {alltestimonials.length == 0 && (
          <div className="col-12 text-center py-5">
            <h5>No data found.</h5>
          </div>
        )}
      </div>

      {/* Modal Section */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        <div className="modalhead">
          <h3>Add New Testimonial</h3>
        </div>

        <div className="modalbody">
          <div className="form-field mb-3">
            <label>Packages</label>
            <select
              className="form-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Select a package</option>
              {packages?.map((pkg) => (
                <option value={pkg?.PackagePlan?.Package?.id}>
                  {pkg?.PackagePlan?.Package?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field mb-3">
            <label>Ratings</label>
            <ul className="rating d-flex">
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <a onClick={() => handleStarClick(i)}>
                    <img
                      src={fillstar}
                      alt={`star-${i + 1}`}
                      style={{
                        opacity: selectedRating > i ? 1 : 0.3,
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="form-field">
            <label>Your Experience</label>
            <textarea
              className="form-control"
              placeholder="Share your experience with this service...."
              value={testimonialText}
              onChange={(e) => setTestimonialText(e.target.value)}
            />
          </div>

          <div className="ModalFooter mt-4">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Testimonial
            </button>
            <button className="btn btn-danger ms-3" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MyTestimonails;
