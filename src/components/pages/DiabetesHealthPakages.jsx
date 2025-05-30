import React from "react";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";

import healthpakgesimg1 from "../../../public/assets/img/healthpakgesimg1.png";

function DiabetesHealthPakages() {
  return (
    <>
      <Header />

      <section className="InnerpageSpace DiabetesHealthPakages">
        <div className="container">
          <div class="InnerPageTitle ">
            <h4>DIABETES HEALTH PACKAGEs</h4>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="DiabetesHealthcontent">
                <figure>
                  <img src={healthpakgesimg1}></img>
                </figure>

                <figcaption>
                  <h3>₹11,999.00 | 3 months</h3>
                  <span>Package description:</span>

                  <ul className="Packagedescriptionlist">
                    <li>Personalised Nutrition Plans. </li>

                    <li>
                      Personalised Workout Plans. Our user-friendly and detailed
                      workout videos are here to make you enjoy the fitness
                      journey.
                    </li>

                    <li>Consultations with health experts </li>

                    <li>
                      One expert consultation with doctor each month, as needed.
                    </li>
                  </ul>

                  <div className="btnbox text-center">
                    <a className="btn btn-primary sm-btn mb-2 hvr-shutter-out-horizontal">
                      buy now
                    </a>
                    <a className="btn btn-primary sm-btn hvr-shutter-out-horizontal">
                      add to bag
                    </a>
                  </div>
                </figcaption>
              </div>
            </div>
            <div className="col-md-3">
              <div className="DiabetesHealthcontent">
                <figure>
                  <img src={healthpakgesimg1}></img>
                </figure>

                <figcaption>
                  <h3>₹11,999.00 | 3 months</h3>
                  <span>Package description:</span>

                  <ul className="Packagedescriptionlist">
                    <li>Personalised Nutrition Plans. </li>

                    <li>
                      Personalised Workout Plans. Our user-friendly and detailed
                      workout videos are here to make you enjoy the fitness
                      journey.
                    </li>

                    <li>Consultations with health experts </li>

                    <li>
                      One expert consultation with doctor each month, as needed.
                    </li>
                  </ul>

                  <div className="btnbox text-center">
                    <a className="btn btn-primary sm-btn mb-2 hvr-shutter-out-horizontal">
                      buy now
                    </a>
                    <a className="btn btn-primary sm-btn hvr-shutter-out-horizontal">
                      add to bag
                    </a>
                  </div>
                </figcaption>
              </div>
            </div>
            <div className="col-md-3">
              <div className="DiabetesHealthcontent">
                <figure>
                  <img src={healthpakgesimg1}></img>
                </figure>

                <figcaption>
                  <h3>₹11,999.00 | 3 months</h3>
                  <span>Package description:</span>

                  <ul className="Packagedescriptionlist">
                    <li>Personalised Nutrition Plans. </li>

                    <li>
                      Personalised Workout Plans. Our user-friendly and detailed
                      workout videos are here to make you enjoy the fitness
                      journey.
                    </li>

                    <li>Consultations with health experts </li>

                    <li>
                      One expert consultation with doctor each month, as needed.
                    </li>
                  </ul>

                  <div className="btnbox text-center">
                    <a className="btn btn-primary sm-btn mb-2 hvr-shutter-out-horizontal">
                      buy now
                    </a>
                    <a className="btn btn-primary sm-btn hvr-shutter-out-horizontal">
                      add to bag
                    </a>
                  </div>
                </figcaption>
              </div>
            </div>
            <div className="col-md-3">
              <div className="DiabetesHealthcontent">
                <figure>
                  <img src={healthpakgesimg1}></img>
                </figure>

                <figcaption>
                  <h3>₹11,999.00 | 3 months</h3>
                  <span>Package description:</span>

                  <ul className="Packagedescriptionlist">
                    <li>Personalised Nutrition Plans. </li>

                    <li>
                      Personalised Workout Plans. Our user-friendly and detailed
                      workout videos are here to make you enjoy the fitness
                      journey.
                    </li>

                    <li>Consultations with health experts </li>

                    <li>
                      One expert consultation with doctor each month, as needed.
                    </li>
                  </ul>

                  <div className="btnbox text-center">
                    <a className="btn btn-primary sm-btn mb-2 hvr-shutter-out-horizontal">
                      buy now
                    </a>
                    <a className="btn btn-primary sm-btn hvr-shutter-out-horizontal">
                      add to bag
                    </a>
                  </div>
                </figcaption>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default DiabetesHealthPakages;
