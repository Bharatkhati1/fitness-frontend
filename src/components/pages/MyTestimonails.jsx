import React from "react";
import { useState } from "react";

import Header from "../authorized/UserUI/Header/Header.jsx";
import Footer from "../authorized/UserUI/Footer/Footer.jsx";

import profileuserimg from "../../../public/assets/img/profileuserimg.png";
import pencilicons from "../../../public/assets/img/pencilicon.png";
import logouticon from "../../../public/assets/img/logouticon.png";

import fillstar from "../../../public/assets/img/fillstar.png";

import pencilicon from "../../../public/assets/img/pencilicon.png";
import delicon from "../../../public/assets/img/delicon.png";

import { Modal, Button } from "antd";

function MyTestimonails() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Header />

      <div className="spacetop">
        <div className="container">
          <div className="Carduserinfo pt-4 mb-4">
            <div className="row">
              <div className="col-auto">
                <div className="cardprofile">
                  <figure>
                    <img src={profileuserimg}></img>
                  </figure>

                  <a className="editprofile">
                    <img src={pencilicons}></img>
                  </a>
                </div>
              </div>

              <div className="col">
                <div className="cardcontent">
                  <h3>Hello Smriti Pandey !</h3>
                  <p>
                    Everything about you, your journey, and your progress — all
                    in one calm, curated space.
                  </p>
                  <div className="tabscardbox d-flex justify-content-between align-items-center  mt-3">
                    <ul className="tabslist">
                      <li>
                        <a>Personal Information</a>
                      </li>
                      <li className="active">
                        <a>my packages</a>
                      </li>
                      <li>
                        <a>my consultations</a>
                      </li>
                      <li>
                        <a>my testimonials</a>
                      </li>
                    </ul>

                    <a className="logoutbtn">
                      <img src={logouticon}></img>Log Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="CardBody">
            <div className="CardBodybtn text-end mb-4">
              <a
                className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
                onClick={showModal}
              >
                add testimonial
              </a>
            </div>
            <div className="pakagesbox ratingsbox mb-4">
              <div className="pakagehead">
                <div className="row">
                  <div className="col">
                    <div className="pakageheadtitle">
                      <h4>diabetes</h4>
                      <span>disease management</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pakagebody">
                <div className="row ">
                  <div className="col">
                    <ul className="rating d-flex">
                      <li>
                        <a>
                          <img src={fillstar} />
                        </a>
                      </li>
                      <li>
                        <a>
                          <img src={fillstar} />
                        </a>
                      </li>
                      <li>
                        <a>
                          <img src={fillstar} />
                        </a>
                      </li>
                      <li>
                        <a>
                          <img src={fillstar} />
                        </a>
                      </li>
                      <li>
                        <a>
                          <img src={fillstar} />
                        </a>
                      </li>
                    </ul>
                    <p>
                      DailyFitness helped me understand and manage my sugar
                      levels like never before. With personalized diet plans and
                      constant check-ins, my HbA1c dropped significantly in just
                      3 months. I feel more in control of my health
                    </p>

                    <div className="cardfooter d-flex align-items-center justify-content-between">
                      <span>Submitted on 02 June 2025</span>

                      <div className="actioninfo d-flex">
                        <a>
                          <img src={pencilicon} />
                          Edit
                        </a>
                        <a className="dele-btn">
                          <img src={delicon} />
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onOk={handleOk} className="custom-modal">
        <div class="modalhead">
          <h3>Add New Testimonial</h3>
        </div>

        <div class="modalbody">
          <div className="form-field mb-3">
            <label>Service</label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="form-field mb-3">
            <label>Ratings</label>
            <ul className="rating d-flex">
              <li>
                <a>
                  <img src={fillstar} />
                </a>
              </li>
              <li>
                <a>
                  <img src={fillstar} />
                </a>
              </li>
              <li>
                <a>
                  <img src={fillstar} />
                </a>
              </li>
              <li>
                <a>
                  <img src={fillstar} />
                </a>
              </li>
              <li>
                <a>
                  <img src={fillstar} />
                </a>
              </li>
            </ul>
          </div>

          <div className="form-field">
            <label>Your Experience</label>

            <textarea
              className="form-control"
              placeholder="Share your experience with this service...."
            ></textarea>

            <div className="ModalFooter mt-4">
            
              <button className="btn btn-primary">Sumbit Tesimonial</button>
              <button className="btn btn-danger ms-3">Cancel</button>
            </div>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  );
}

export default MyTestimonails;
