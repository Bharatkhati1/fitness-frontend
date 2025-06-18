import React from "react";
import Header from "../authorized/UserUI/Header/Header.jsx";
import Footer from "../authorized/UserUI/Footer/Footer.jsx";

import profileuserimg from "../../../public/assets/img/profileuserimg.png";
import pencilicons from "../../../public/assets/img/pencilicon.png";
import logouticon from "../../../public/assets/img/logouticon.png";

import watchicon from "../../../public/assets/img/watchicon.png";
import calendericon from "../../../public/assets/img/calendericon.png";

function ProfileMyPakages() {
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
            <div className="pakagesbox mb-4">
              <div className="pakagehead">
                <div className="row">
                  <div className="col">
                    <div className="pakageheadtitle">
                      <h4>hypertension: Smart HEalth Package - 3 months</h4>
                      <span>disease management</span>
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="pakageheadbtn">
                      <a className="xs-btn">Active</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pakagebody">
                <div className="row ">
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={watchicon} />
                    </figure>
                    <span>Duration: 6 Months</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>Start: 20 June 2025</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>End: 20 December 2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pakagesbox mb-4">
              <div className="pakagehead">
                <div className="row">
                  <div className="col">
                    <div className="pakageheadtitle">
                      <h4>hypertension: Smart HEalth Package - 3 months</h4>
                      <span>disease management</span>
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="pakageheadbtn">
                      <a className="xs-btn">Active</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pakagebody">
                <div className="row ">
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={watchicon} />
                    </figure>
                    <span>Duration: 6 Months</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>Start: 20 June 2025</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>End: 20 December 2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pakagesbox mb-4">
              <div className="pakagehead">
                <div className="row">
                  <div className="col">
                    <div className="pakageheadtitle">
                      <h4>hypertension: Smart HEalth Package - 3 months</h4>
                      <span>disease management</span>
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="pakageheadbtn">
                      <a className="xs-btn">Active</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pakagebody">
                <div className="row ">
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={watchicon} />
                    </figure>
                    <span>Duration: 6 Months</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>Start: 20 June 2025</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>End: 20 December 2025</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pakagesbox mb-4">
              <div className="pakagehead">
                <div className="row">
                  <div className="col">
                    <div className="pakageheadtitle">
                      <h4>hypertension: Smart HEalth Package - 3 months</h4>
                      <span>disease management</span>
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="pakageheadbtn">
                      <a className="xs-btn sx-btn-info">Completed</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pakagebody">
                <div className="row ">
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={watchicon} />
                    </figure>
                    <span>Duration: 6 Months</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>Start: 20 June 2025</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>End: 20 December 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfileMyPakages;
