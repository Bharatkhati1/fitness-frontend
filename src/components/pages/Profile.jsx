import React, { useEffect, useState } from "react";
import profileuserimg from "../../../public/assets/img/profileuserimg.png";
import pencilicons from "../../../public/assets/img/pencilicon.png";
import logouticon from "../../../public/assets/img/logouticon.png";
import { toast } from "react-toastify";
import userAxios from "../../utils/Api/userAxios";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";

function Profile() {
  const [profileDetails, setProfileDetails] = useState({});

  const fetchProfileDetails = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_profile_details);
      setProfileDetails(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  console.log(profileDetails)

  useEffect(() => {
    fetchProfileDetails();
  }, []);
  return (
    <>
      <div className="spacetop">
        <div className="container">
          <div className="Carduserinfo pt-4 mb-4">
            <div className="row">
              <div className="col-auto">
                <div className="cardprofile">
                  <figure>
                    <img crossOrigin="anonymous" src={profileDetails?.profilePictureUrl}></img>
                  </figure>

                  <a className="editprofile">
                    <img src={pencilicons}></img>
                  </a>
                </div>
              </div>

              <div className="col">
                <div className="cardcontent">
                  <h3>Hello {profileDetails?.firstName} !</h3>
                  <p>
                    Everything about you, your journey, and your progress — all
                    in one calm, curated space.
                  </p>
                  <div className="tabscardbox d-flex justify-content-between align-items-center  mt-3">
                    <ul className="tabslist">
                      <li className="active">
                        <a>Personal Information</a>
                      </li>
                      <li>
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

          <div className="CardBbox mb-4">
            <div className="cardhead">
              <h3>basic details</h3>
            </div>

            <div className="Cardbody">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>full name*</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="form-control"
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email ID*</label>
                  <input
                    type="text"
                    placeholder="Enter your email id"
                    className="form-control"
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Age*</label>
                  <input
                    type="text"
                    placeholder="Enter your age"
                    className="form-control"
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Gender*</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select your gender</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Contact Number</label>
                  <div class="contactInput">
                    <span>+91</span>
                    <input
                      placeholder="Enter your contact number"
                      class="form-control"
                      type="number"
                      value=""
                      name="phone"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Address (Pin Code / Zip Code)</label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className="form-control"
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="CardBbox mb-4">
            <div className="cardhead d-flex justify-content-between">
              <h3>current physical measurements</h3>
              <a className="btn btn-secondy hvr-shutter-out-horizontal">
                update measurements
              </a>
            </div>

            <div className="Cardbody">
              <div className="row">
                <div class="col-md-6">
                  <label>Weight</label>
                  <div class="contactInput weightkg">
                    <input
                      placeholder="Enter your weight"
                      class="form-control"
                      type="number"
                      value=""
                      name="phone"
                    />
                    <span>kg</span>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Height</label>
                  <div class="contactInput weightkg">
                    <input
                      placeholder="Enter your height"
                      class="form-control"
                      type="number"
                      value=""
                      name="phone"
                    />
                    <span>cm</span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Chest Size</label>
                  <input
                    type="text"
                    placeholder="Enter your chest size (inches/cm)"
                    className="form-control"
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Waist Circumference</label>
                  <input
                    type="text"
                    placeholder="Enter your waist size (inches/cm)"
                    className="form-control"
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Neck Circumference</label>
                  <input
                    type="text"
                    placeholder="Enter your neck circumference (inches/cm)"
                    className="form-control"
                  ></input>
                </div>
              </div>

              <div className="tablebox">
                <h3>Measurement History</h3>
                <table className="table">
                  <tr>
                    <th>Date</th>
                    <th>Weight(kg)</th>
                    <th>Height(cm)</th>
                    <th>Chest(cm)</th>
                    <th>Waist(cm)</th>
                    <th>Neck(cm)</th>
                  </tr>

                  <tr>
                    <td>Jan 15, 2024</td>
                    <td>75</td>
                    <td>175</td>
                    <td>95</td>
                    <td>85</td>
                    <td>38</td>
                  </tr>
                  <tr>
                    <td>Jan 15, 2024</td>
                    <td>75</td>
                    <td>175</td>
                    <td>95</td>
                    <td>85</td>
                    <td>38</td>
                  </tr>
                  <tr>
                    <td>Jan 15, 2024</td>
                    <td>75</td>
                    <td>175</td>
                    <td>95</td>
                    <td>85</td>
                    <td>38</td>
                  </tr>
                  <tr>
                    <td>Jan 15, 2024</td>
                    <td>75</td>
                    <td>175</td>
                    <td>95</td>
                    <td>85</td>
                    <td>38</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className="CardBbox mb-4">
            <div className="cardhead">
              <h3>Fitness & Health Overview</h3>
            </div>

            <div className="Cardbody">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Diet Preference</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select diet preference</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Workout Preference</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select your workout preference</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-md-12 mb-3">
                  <label>Pre-existing Medical Conditions (if any)</label>
                  <ul className="form-checkList d-flex flex-wrap">
                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="check-27"
                          type="checkbox"
                        />
                        <label class="form-check-label" for="check-27">
                          Diabetes
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="check-28"
                          type="checkbox"
                        />
                        <label class="form-check-label" for="check-28">
                          Hypertension (High BP)
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="check-29"
                          type="checkbox"
                        />
                        <label class="form-check-label" for="check-29">
                          Thyroid
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="check-30"
                          type="checkbox"
                        />
                        <label class="form-check-label" for="check-30">
                          PCOS/PCOD
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="check-31"
                          type="checkbox"
                        />
                        <label class="form-check-label" for="check-31">
                          others
                        </label>
                      </div>
                    </li>
                  </ul>
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="form-control"
                  ></input>
                </div>

                <div className="col-md-12">
                  <label>
                    Pre-existing Sports Injury (If Yes, please describe)
                  </label>
                  <input
                    type="text"
                    placeholder="Describe here"
                    className="form-control"
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="formbtn text-center  mt-4 mb-4">
            <a className="btn btn-primary sm-btn hvr-shutter-out-horizontal">
              save profile
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
