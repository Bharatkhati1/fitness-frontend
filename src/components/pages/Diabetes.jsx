import React, { useState, useEffect } from "react";
import daishape from "../../../public/assets/img/daishape.png";
import DOMPurify from "dompurify";
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
                <img crossOrigin="anonymous" src={details.image_url} />
              </figure>
            </div>

            <div className="col-md-6 Diabetespageright">
              <h3>{details.name} </h3>
              <p>{stripHtml(details.description)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="PackageINclusion mt-5 pt-3 pb-5">
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
      </section>
    </>
  );
}

export default PackageDetails;
