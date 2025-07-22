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
import ConfirmationPopup from "../../authorized/AdminUI/Popups/ConfirmationPopup";
// import ConfirmationPopup from "../../authorized/AdminUI/Popups/ConfirmationPopup";

function MyTestimonails() {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alltestimonials, setAlltestimonials] = useState([]);
  const [packages, setpackages] = useState([]);
  const [editTestimonial, setEditTestimonial] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditTestimonial(null);
    resetForm();
  };

  const resetForm = () => {
    setSelectedRating(0);
    setSelectedService("");
    setTestimonialText("");
    setEditingTestimonialId(null);
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

  const deleteTestimonial = async (id) => {
    try {
      const res = await userAxios.delete(userApiRoutes.delete_testimonial(id));
      toast.success(res.data.message);
      fetchtestimonials();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (!selectedRating || !selectedService || !testimonialText.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }

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
      let res;
      if (editTestimonial && editingTestimonialId) {
        res = await userAxios.put(
          userApiRoutes.update_testimonial(editingTestimonialId),
          payload
        );
      } else {
        res = await userAxios.post(userApiRoutes.add_testimonial, payload);
      }

      toast.success(res.data.message);
      setIsModalOpen(false);
      resetForm();
      setEditTestimonial(false);
      setEditingTestimonialId(null);
      fetchtestimonials();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
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

                  <div className="cardfooter d-flex align-items-center justify-content-between">
                    <span>
                      Submitted on{" "}
                      {moment(testimonial.createdAt).format("DD MMM YYYY")}
                    </span>
                    {testimonial?.isApproved != "Approved" && (
                      <div className="actioninfo d-flex">
                        <a
                          onClick={() => {
                            setIsModalOpen(true);
                            setSelectedService(testimonial?.packageId);
                            handleStarClick(testimonial?.rating - 1);
                            setTestimonialText(testimonial?.description);
                            setEditTestimonial(true);
                            setEditingTestimonialId(testimonial?.id);
                          }}
                        >
                          <img src={pencilicon} alt="edit" />
                          Edit
                        </a>
                        <ConfirmationPopup
                          bodyText="Are you sure you want to delete this Testimonial ?"
                          title="Delete Testimonial"
                          onOk={() => deleteTestimonial(testimonial.id)}
                          buttonText={
                            <>
                              <img src={delicon} alt="delete" />
                              Delete
                            </>
                          }
                        />
                      </div>
                    )}
                  </div>
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
          <h3>{editTestimonial ? `Edit` : `Add New`} Testimonial</h3>
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
              onChange={e => {
                const value = e.target.value;
                const words = value.split(/\s+/).filter(Boolean);
                if (words.length <= 70) {
                  setTestimonialText(value);
                } else {
                  setTestimonialText(words.slice(0, 70).join(" "));
                }
              }}
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
