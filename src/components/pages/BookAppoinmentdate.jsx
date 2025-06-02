import React from "react";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";

import fulldocterImg from "../../../public/assets/img/fulldocterImg.png";

import dummyimg from "../../../public/assets/img/dummyimg.png";

function BookAppoinmentdate() {
  return (
    <>
      <section className="InnerpageSpace bookappoinmentdetail">
        <div className="container">
          <div className="row">
            <div className="col-md-4 badetailleft">
              <figure>
                <img src={fulldocterImg}></img>
              </figure>
            </div>

            <div className="col-md-8 badetailright">
              <div className="baheadtitle">
                <h3>dr. rakhi gupta</h3>
                <p>diabetes specialist</p>
                <p>13 years of experience</p>
              </div>

              <div className="apdinfo d-flex justify-content-between align-items-center">
                <div class="pricetime">₹ 549.00 | 15 min</div>

                <div className="appoinmentsdetails">
                  <h5>appointment details:</h5>
                  <ul className="adlistinfo d-flex">
                    <li>
                      <h4>date:</h4>
                      <span>17.05.25</span>
                    </li>
                    <li>
                      <h4>time:</h4>
                      <span>1:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row slotdatebox">
                <div className="col-md-6 slotdateboxleft">
                  <h4 className="slottitle">Please select a date:</h4>

                  <figure className="dummyimg">
                    <img src={dummyimg}></img>
                  </figure>

                  <div className="provideContactinfo mt-4">
                    <h4 className="slottitle">
                      Please provide your contact number:
                    </h4>

                    <div class="contactInput">
                      <span>+91</span>
                      <input
                        placeholder="Enter your contact number"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 slotdateboxright">
                  <h4 className="slottitle">available Time slots :</h4>

                  <ul className="slottimelist">
                    <li>10.00 AM</li>

                    <li>10.00 AM</li>
                    <li>10:15 aM</li>
                    <li>11:45 aM</li>
                    <li>12:15 PM</li>

                    <li className="slottimeactive">1:00 PM</li>

                    <li>2:00 PM</li>

                    <li>2:30 PM</li>

                    <li>3:00 PM</li>

                    <li>4:00 PM</li>

                    <li>4:45 PM</li>

                    <li>5:00 PM</li>

                    <li>5:00 PM</li>
                  </ul>
                </div>
              </div>

              <div className="btnbox mt-4 text-center">
                <a className="btn btn-primary max-width hvr-shutter-out-horizontal">
                  confirm appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookAppoinmentdate;
