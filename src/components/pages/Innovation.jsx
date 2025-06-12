import React, { useState } from "react";
import { Modal, Button } from "antd";

import innovationimg1 from "../../../public/assets/img/innovationimg1.png";
import innovationimg2 from "../../../public/assets/img/innovationimg2.png";
import innovationimg3 from "../../../public/assets/img/innovationimg3.png";

import innovationicon1 from "../../../public/assets/img/innovationicon1.png";
import innovationicon2 from "../../../public/assets/img/innovationicon2.png";
import innovationicon3 from "../../../public/assets/img/innovationicon3.png";

import rvimg1 from "../../../public/assets/img/rv-img1.png";

import Header from "../authorized/UserUI/Header/Header";
import Footer from "../authorized/UserUI/Footer/Footer";

function Innovation() {
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
      <div className="innerSpace mt-4">
        <div className="container">
          <div className="innovation">
            <div className="row g-1">
              <div className="col-md-7">
                <div className="imgcard">
                  <img src={innovationimg1}></img>

                  <div className="imgcardcontent">
                    <h4>Intelligence. Innovation. Impact.</h4>
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="row g-1">
                  <div className="col-md-6 ">
                    <div className="imgsmcard">
                      {" "}
                      <img src={innovationimg2}></img>
                    </div>
                  </div>
                  <div className="col-md-6  ">
                    <div className="innovationcontent">
                      <span className="dotsicon">
                        <img src={innovationicon3}></img>
                      </span>
                      <img src={innovationicon1}></img>
                      <h4>Where daily health meets deep tech.</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="innovationcontent">
                      <span className="dotsicon">
                        <img src={innovationicon3}></img>
                      </span>
                      <img src={innovationicon2}></img>
                      <h4>Where daily health meets deep tech.</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="imgsmcard">
                      {" "}
                      <img src={innovationimg3}></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="innovationlist mt-4">
            <div className="row align-items-center mb-4">
              <div className="col-md-5">
                <figure>
                  <img src={rvimg1}></img>
                </figure>
              </div>

              <div className="col-md-7 text-center">
                <div className="innovationlistcontent">
                  <h3 className="">Revolutionizing Wellness with AI & ML</h3>
                  <div class="Bytext text-center">
                    <span>By The Daily Fitness . 4/21/2025</span>
                  </div>

                  <hr className="dashed-text"></hr>
                  <p>
                    Explore how we leverage Artificial Intelligence and Machine
                    Learning to tailor diet plans, workout routines, and mental
                    wellness guidance for each user, based on their lifestyle
                    and biological markers.
                  </p>

                  <a className="btn btn-primary max-width">read now</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stayaheadbg">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <h4>Stay Ahead in Health — One Inbox at a Time</h4>
                <span>
                  Get powerful fitness tips, nutrition insights, mental wellness
                  hacks, and exclusive updates delivered straight to you.
                </span>

                <p>
                  Join a growing community that believes in smart,
                  science-backed living — because your wellness journey deserves
                  the latest, every step of the way.
                </p>

                <a className="btn btn-primary max-width" onClick={showModal}>
                  subscribe to our newsletter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="stayModal"
      >
        <div className="staybgmodal">
          <div className="container">
            
             
                <h4>Don’t Miss a Beat of Your Wellness Journey</h4>

                <p>
                  Be the first to receive expert fitness tips, nutrition
                  insights, mental health hacks, event invites, and more —
                  straight to your inbox.
                </p>

                     <div className="formfield mb-4">
                        <label>Your Email ID*</label>
                        <input type="text" placeholder="Enter your email id" className="form-control"></input>
                 
                    </div> 

                <a className="btn btn-primary max-width">subscribe</a>
              
           
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Innovation;
