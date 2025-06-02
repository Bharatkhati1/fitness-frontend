import shapeangelleft from "../../../public/assets/img/shapeangelleft.png";
import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { useParams } from "react-router-dom";
import { webAxios } from "../../utils/Api/userAxios";
import { toast } from "react-toastify";

import healthpakgesimg1 from "../../../public/assets/img/healthpakgesimg1.png";

function Diabetes() {
  const { slug } = useParams();
  const [details, setDetails] = useState({});


  const fetchPackageDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_package_details(slug)
      );
      setDetails(response.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(html); // optional sanitization
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    fetchPackageDetails();
  }, [slug]);


  return (
    <>
      <section className="Diabetespage InnerpageSpace pb-0">
        <span className="daishape">
          <img src={shapeangelleft}></img>
        </span>

        <span className="daishaperight">
          <img src={shapeangelleft}></img>
        </span>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 Diabetespageleft">
              <figure>
                <img crossOrigin="anonymous" src={details.image_url} />
              </figure>
            </div>

            <div className="col-md-6 Diabetespageright">
              <h3>{details.name} </h3>
              <p>{stripHtml(details.description)}</p>
            </div>
          </div>

          <div className="DiabetesHealthPakages mt-4 mb-0">
            <div class="InnerPageTitle text-center">
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
                        Personalised Workout Plans. Our user-friendly and
                        detailed workout videos are here to make you enjoy the
                        fitness journey.
                      </li>

                      <li>Consultations with health experts </li>

                      <li>
                        One expert consultation with doctor each month, as
                        needed.
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
                        Personalised Workout Plans. Our user-friendly and
                        detailed workout videos are here to make you enjoy the
                        fitness journey.
                      </li>

                      <li>Consultations with health experts </li>

                      <li>
                        One expert consultation with doctor each month, as
                        needed.
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
                        Personalised Workout Plans. Our user-friendly and
                        detailed workout videos are here to make you enjoy the
                        fitness journey.
                      </li>

                      <li>Consultations with health experts </li>

                      <li>
                        One expert consultation with doctor each month, as
                        needed.
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
                        Personalised Workout Plans. Our user-friendly and
                        detailed workout videos are here to make you enjoy the
                        fitness journey.
                      </li>

                      <li>Consultations with health experts </li>

                      <li>
                        One expert consultation with doctor each month, as
                        needed.
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
        </div>
     

      <div className="PackageINclusion mt-5 pt-3 pb-5">
        <div className="container">
          <h3 className="pn-title text-center">
            {details.name} Management Package inclusions
          </h3>
          <div className="row">
            {details?.PackageInclusions?.map((inclusion) => (
              <div className="col-md-4 Packagecontent">
                <figure>
                  <img crossOrigin="anonymous" src={inclusion.image_url}></img>
                </figure>

                <figcaption>
                  <h4>{inclusion.name}</h4>
                  <p>{stripHtml(inclusion.description)}</p>
                </figcaption>
              </div>
            ))}
          </div>

          <div className="btn-box text-center mt-4">
            <a className="btn btn-primary max-btn hvr-shutter-out-horizontal">
              join
            </a>
          </div>
        </div>
      </div>

       </section>
    </>
  );
}

export default Diabetes;
