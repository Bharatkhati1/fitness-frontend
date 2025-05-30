import React, {useState, useEffect} from "react";
import diabetesimg from "../../../public/assets/img/diabetesimg.png";

import daishape from "../../../public/assets/img/daishape.png";
import DOMPurify from "DOMPurify"
import daibetesimg1 from "../../../public/assets/img/daibetesimg1.png";
import daibetesimg2 from "../../../public/assets/img/daibetesimg2.png";
import daibetesimg3 from "../../../public/assets/img/daibetesimg3.png";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { useParams } from "react-router-dom";
import { webAxios } from "../../utils/Api/userAxios";
import { toast } from "react-toastify";

function PackageDetails() {
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
  console.log(details);

  useEffect(() => {
    fetchPackageDetails();
  }, [slug]);
  return (
    <>
      <section className="Diabetespage InnerpageSpace">
        <span className="daishape">
          <img src={daishape}></img>
        </span>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 Diabetespageleft">
              <figure>
                <img src={diabetesimg} />
              </figure>
            </div>

            <div className="col-md-6 Diabetespageright">
              <h3>Diabetes </h3>
              <p>
                Type 2 diabetes is a condition that happens because of a problem
                in the way the body regulates and uses sugar as a fuel.This
                long-term condition results in too much sugar circulating in the
                blood. Eventually, high blood sugar levels can lead to disorders
                of the circulatory, nervous and immune systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="PackageINclusion mt-5 pt-3 pb-5">
        <div className="container">
          <h3 className="pn-title text-center">
            Diabetes Management Package inclusions
          </h3>
          <div className="row">
            <div className="col-md-4 Packagecontent">
              <figure>
                <img src={daibetesimg1}></img>
              </figure>

              <figcaption>
                <h4>Nutrition Strategies</h4>
                <p>
                  Our expert nutritionists shall curate sustainable and healthy
                  diet specially for you as per your needs.
                </p>
              </figcaption>
            </div>

            <div className="col-md-4 Packagecontent">
              <figure>
                <img src={daibetesimg2}></img>
              </figure>

              <figcaption>
                <h4>Personalised Exercise Plans</h4>
                <p>
                  Get personalised plans tailored to your needs, focusing on
                  exercises for diabetes management. Our user-friendly and
                  detailed workout videos are here to make you enjoy the fitness
                  journey.
                </p>
              </figcaption>
            </div>

            <div className="col-md-4 Packagecontent">
              <figure>
                <img src={daibetesimg3}></img>
              </figure>

              <figcaption>
                <h4>Medical Support</h4>
                <p>
                  Get consultations and expert medical advice from our team of
                  experienced doctors.
                </p>
              </figcaption>
            </div>
          </div>

          <div className="btn-box text-center mt-4">
            <a className="btn btn-primary max-btn hvr-shutter-out-horizontal">
              join
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default PackageDetails;
