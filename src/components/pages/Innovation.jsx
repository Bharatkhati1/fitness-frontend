import React from "react";

import innovationimg1 from "../../../public/assets/img/innovationimg1.png";
import innovationimg2 from "../../../public/assets/img/innovationimg2.png";
import innovationimg3 from "../../../public/assets/img/innovationimg3.png";

import innovationicon1 from "../../../public/assets/img/innovationicon1.png";
import innovationicon2 from "../../../public/assets/img/innovationicon2.png";
import innovationicon3 from "../../../public/assets/img/innovationicon3.png";

function Innovation() {
  return (
    <>
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

        <div className="innovationlist">
          <div className="row">
            <div className="col-md-6">
              <figure></figure>
            </div>

            <div className="col-md-6">
              <h3>Revolutionizing Wellness with AI & ML</h3>
              <div class="Bytext text-center">
                <span>By The Daily Fitness .Invalid Date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Innovation;
