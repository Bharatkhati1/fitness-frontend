import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import CarrerImG from "../../../public/assets/img/CarrerRight.png";
import CarrerShape1 from "../../../public/assets/img/CarrerShape1.png";
import CarrerShape2 from "../../../public/assets/img/CarrerShape2.png";
import CarrerShape3 from "../../../public/assets/img/CarrerShape3.png";
import CarrerShape4 from "../../../public/assets/img/CarrerShape4.png";

import transformicon1 from "../../../public/assets/img/transformicon1.png";
import transformicon2 from "../../../public/assets/img/transformicon2.png";
import transformicon3 from "../../../public/assets/img/transformicon3.png";
import transformicon4 from "../../../public/assets/img/transformicon4.png";

import transformiconshape1 from "../../../public/assets/img/transformiconshape1.png";
import transformiconshape2 from "../../../public/assets/img/transformiconshape2.png";
import transformiconshape3 from "../../../public/assets/img/transformiconshap3.png";
import transformiconshape4 from "../../../public/assets/img/transformiconshap4.png";

import yogaimg1 from "../../../public/assets/img/yogaimg1.png";
import yogaimg2 from "../../../public/assets/img/yogaimg2.png";
import yogaimg3 from "../../../public/assets/img/yogaimg3.png";

import culturesliderimg1 from "../../../public/assets/img/culturesliderimg1.png";
import culturesliderimg2 from "../../../public/assets/img/culturesliderimg2.png";
import culturesliderimg3 from "../../../public/assets/img/culturesliderimg3.png";

import joinimgv from "../../../public/assets/img/joinimgv.png";

import bagicon from "../../../public/assets/img/bagicon.png";
import { webAxios } from "../../utils/constants.jsx";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes.jsx";
import { toast } from "react-toastify";

function Careers() {
  const [allJobs, setAllJobs] = useState([]);
  const [careersCms, setCareersCms] = useState({});
  const [selectedJob, setSelectedJob] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    role: "",
    fitnessEnthusiast: "",
    resume_file: null,
    experience: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      dob: "",
      role: "",
      fitnessEnthusiast: "",
      resume_file: null,
      experience: "",
    });
  };

  const fetchJobs = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_careers);
      setAllJobs(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const fetchCmsCareers = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_master_cms("careers"));
      setCareersCms(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "name") {
      const isValid = /^[A-Za-z\s]*$/.test(value);
      if (!isValid) return; 
    }
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({ ...prev, fitnessEnthusiast: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("dob", formData.dob);
    formPayload.append("role", formData.role);
    formPayload.append("fitnessEnthusiast", formData.fitnessEnthusiast);
    formPayload.append("experience", formData.experience);
    formPayload.append("jobId", selectedJob);
  
    if (formData.resume_file) {
      formPayload.append("resume_file", formData.resume_file);
    }
  
    const toastId = toast.loading("Submitting application...");
  
    try {
      await webAxios.post(userApiRoutes.apply_job, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.update(toastId, {
        render: "Application submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
  
      setIsModalOpen(false);
      setFormData({
        name: "",
        dob: "",
        role: "",
        fitnessEnthusiast: "",
        resume_file: null,
        experience: "",
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.error || "Submission failed. Try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  
  useEffect(() => {
    fetchJobs();
    fetchCmsCareers();
  }, []);

  return (
    <>
      <div className="Carrerbanner innerSpace mt-3">
        <span className="CarrerShape1">
          <img src={CarrerShape1}></img>
        </span>

        <span className="CarrerShape4">
          <img src={CarrerShape4}></img>
        </span>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 pe-0">
              <div className="Carrerbannerleft ">
                <h3 className="mb-3">Where Fitness meets Innovation and Empathy meets Care.</h3>
                <p className="mb-4">
                  We’re not just building programs—we’re building a healthier
                  world. If wellness drives you and purpose fuels you, you’re at
                  the right place.
                </p>

                <a  href="#WeAreHiring" className="btn btn-primary max-btn hvr-shutter-out-horizontal">
                  Shape Lives With Us
                </a>
              </div>
            </div>

            <div className="col-md-6 text-end">
              <div className="Carrerbannerright">
                <span className="CarrerShape2">
                  <img src={CarrerShape2}></img>
                </span>
                <span className="CarrerShape3">
                  <img src={CarrerShape3}></img>
                </span>
                <img src={CarrerImG}></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Trasnform">
        <div className="container">
          <div class="PageTitle text-center">
            <h2>
              Careers at DailyFitness.ai –
              <span className="uppercase-text">Care. Empower. Transform.</span>
            </h2>
          </div>

          <div className="Trasnformbox">
            <div className="row">
              <div className="col-md-3">
                <div className="Trasnformboxbox text-center">
                  <span className="transicon">
                    <img src={transformiconshape1}></img>
                  </span>
                  <figure>
                    <img src={transformicon1}></img>
                  </figure>

                  <figcaption>
                    <h3>Health & Wellness</h3>
                    <p>
                      Comprehensive health insurance, mental health support, and
                      free access to all our fitness programs.
                    </p>
                  </figcaption>
                </div>
              </div>
              <div className="col-md-3">
                <div className="Trasnformboxbox text-center">
                  <span className="transicon">
                    <img src={transformiconshape2}></img>
                  </span>
                  <figure>
                    <img src={transformicon2}></img>
                  </figure>

                  <figcaption>
                    <h3>Collaborative Culture</h3>
                    <p>
                      Work with a team of passionate fitness fitnessEnthusiasts
                      who support and inspire each other.
                    </p>
                  </figcaption>
                </div>
              </div>
              <div className="col-md-3">
                <div className="Trasnformboxbox text-center">
                  <span className="transicon">
                    <img src={transformiconshape3}></img>
                  </span>
                  <figure>
                    <img src={transformicon3}></img>
                  </figure>

                  <figcaption>
                    <h3>Growth Opportunities</h3>
                    <p>
                      Continuous learning and development programs to advance
                      your career in the fitness industry.
                    </p>
                  </figcaption>
                </div>
              </div>
              <div className="col-md-3">
                <div className="Trasnformboxbox text-center">
                  <span className="transicon">
                    <img src={transformiconshape4}></img>
                  </span>
                  <figure>
                    <img src={transformicon4}></img>
                  </figure>

                  <figcaption>
                    <h3>Work-Life Balance</h3>
                    <p>
                      Flexible work hours, remote work options, and generous
                      vacation policy.
                    </p>
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wearehiring mb-5">
        <div className="container">
          <div className="wearehiringInner">
            <div className="row align-items-center">
              <span className="col">
                <img src={yogaimg1}></img>
              </span>

              <div className="col col-4 g-0">
                <div className="wearecontent">
                  <h3>We are Hiring !</h3>
                  <p>Wellness Begins at Work. Join Us.</p>
                  <a
                    href="#WeAreHiring"
                    className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
                  >
                    join us
                  </a>
                </div>
              </div>

              <span className="col g-0 col-md-2">
                <img src={yogaimg2}></img>
              </span>

              <span className="col">
                <img src={yogaimg3}></img>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="ourvalue">
        <div class="PageTitle text-center">
          <h2>our values</h2>
        </div>
        <div className="ourvalueinner">
          <div className="container">
            <div className="row justify-content-center g-5">
              <div className="col-md-6">
                <div className="ourvaluebox  ">
                  <p>Innovation in fitness solutions</p>
                </div>

                <div className="ourvaluebox">
                  <p>Inclusivity and accessibility for all fitness levels</p>
                </div>

                <div className="ourvaluebox">
                  <p>Continuous learning and growth</p>
                </div>
              </div>

              <div className="col-md-6 ">
                <div className="ourvaluebox mt-5">
                  <p>Evidence-based approach to health and wellness</p>
                </div>

                <div className="ourvaluebox">
                  <p>Community and support in fitness journey</p>
                </div>

                <div className="ourvaluebox mb-4">
                  <p>Transparency and Integrity in processes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ourcluture">
        <div className="container">
          <div class="PageTitle text-center">
            <h2>What our culture is really like</h2>
            <p>Where every day is a step toward a healthier, happier world.</p>
          </div>

          <div>
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={4}
              merge={true}
              nav={true}
              margin={10}
              loop={true}
            >
              <div className="item">
                <div>
                  <img src={culturesliderimg1}></img>
                </div>
              </div>

              <div className="item" data-merge="2">
                <div>
                  <img src={culturesliderimg2}></img>
                </div>
              </div>

              <div className="item">
                <div>
                  <img src={culturesliderimg1}></img>
                </div>
              </div>
              <div className="item" data-merge="2">
                <div>
                  <img src={culturesliderimg2}></img>
                </div>
              </div>
              <div className="item">
                <div>
                  <img src={culturesliderimg3}></img>
                </div>
              </div>
            </OwlCarousel>
          </div>

          <p className="text-center pt-4">
            At DailyFitness, we believe wellness isn't just our mission—it's our
            lifestyle. From mindful mornings to purpose-driven projects, every
            day here is a blend of passion, progress, and positivity. Our team
            thrives in a culture that values collaboration, celebrates personal
            growth, and prioritizes mental and physical well-being. Whether
            you're coaching clients, creating content, or building digital
            tools, you're contributing to something bigger: a healthier, happier
            world—starting with yourself.
          </p>
        </div>
      </div>

      <div className="findYourfit pb-5">
        <div className="container">
          <div class="PageTitle text-center">
            <h2>find your fit with us !</h2>
            <p>Fresh Roles, Real Impact</p>
          </div>

          <div className="findYourfitrow" id="WeAreHiring">
            <div className="row g-3">
              {allJobs.map((job) => (
                <div className="col-md-6">
                  <div className="findYourfitinner">
                    <img
                      className="findYourIcon"
                      crossOrigin="anonymous"
                      src={bagicon}
                    ></img>
                    <h4>{job.title}</h4>
                    <span>
                      {job.WorkPreference} - {job.employmentType}
                    </span>
                    <p
                      className="job-description"
                      dangerouslySetInnerHTML={{
                        __html: job.description,
                      }}
                    ></p>
                    <a
                      className="btn btn-primary w-100 hvr-shutter-out-horizontal"
                      onClick={() => {
                        showModal();
                        setFormData((prev) => ({ ...prev, role: job.title }));
                        setSelectedJob(job.ID);
                      }}
                    >
                      apply now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal"
        centered
      >
        <div className="modalhead">
          <h3>join our team</h3>
        </div>

        <div className="modalbody">
          <span>Be a part of our mission to inspire healthy living.</span>
          <p>
            Submit your details below and stay connected with the latest career
            opportunities.
          </p>

          <div className="row formmodal mt-4">
            <form onSubmit={handleSubmit} className="col-lg-6">
              <div className="form-group mb-2">
                <label>Your Full Name*</label>
                <input
                  placeholder="Enter your full name"
                  className="form-control"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-2">
                <label>Your Date of Birth*</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  placeholder="Enter your DOB"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="form-group mb-2">
                <label>Your Role:</label>
                <input
                  placeholder="Fitness Trainer"
                  className="form-control"
                  type="text"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>

          

              <div className="form-group mb-2">
                <label>Upload Resume*</label>
                <input
                  type="file"
                  name="resume_file"
                  className="form-control"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleChange}
                />
              </div>

                  <div className="form-group mb-2">
                <label>Are you a fitness enthusiast?*</label>
                <ul className="form-checkList sm-checklist d-flex flex-wrap">
                  <li>
                    <div className="form-check me-4">
                      <input
                        className="form-check-input"
                        id="fitnessEnthusiast-yes"
                        type="checkbox"
                        required={!formData.fitnessEnthusiast}
                        checked={formData.fitnessEnthusiast === "Yes"}
                        onChange={() => handleCheckboxChange("Yes")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="fitnessEnthusiast-yes"
                      >
                        Yes
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        id="fitnessEnthusiast-no"
                        type="checkbox"
                        required={!formData.fitnessEnthusiast}
                        checked={formData.fitnessEnthusiast === "No"}
                        onChange={() => handleCheckboxChange("No")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="fitnessEnthusiast-no"
                      >
                        No
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="form-group mb-2">
                <label>Select your experience</label>
                <select
                  className="form-select"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option value="">Open this select menu</option>
                  <option value="1">1 year</option>
                  <option value="2">2-3 years</option>
                  <option value="3">3+ years</option>
                </select>
              </div>

              <button className="btn btn-primary max-btn mt-4" type="submit">
                Apply Now
              </button>
            </form>

            <div className="col-lg-6">
              <figure className="JoinImgvaerticle">
                <img src={joinimgv} alt="Join Team" />
              </figure>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Careers;
