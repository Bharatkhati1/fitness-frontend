import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { webAxios } from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";

function ServiceDetails() {
  const { slug } = useParams();
  const [details, setDetails] = useState({});

  const fetchServiceDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_service_details(slug)
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
    fetchServiceDetails();
  }, [slug]);
  return (
    <>
      <section className="innerbanner">
        <figure>
          <img crossOrigin="anonymous" src={details?.banner_url} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{details?.name}</h2>
            <p>{stripHtml(details?.shortDescription)}</p>
          </div>
        </div>
      </section>

      <div className="sectionSpace servicedetail">
        <div className="container">
          <p className="text-center">{stripHtml(details.description)}</p>

          <div className="row servicedetaillisting">
            {details?.Packages?.map((pkg) => {
              const parsedActions = JSON.parse(pkg.actions || "[]");
              const actionNames = parsedActions.map((action) => action.name);

              const showButton = (label) => actionNames.includes(label);

              return (
                <div className="col-md-6" key={pkg.id}>
                  <figure>
                    <img crossOrigin="anonymous" src={pkg.image_url} />
                  </figure>

                  <figcaption>
                    <h3>{pkg.name}</h3>
                    <p>{stripHtml(pkg.description)}</p>

                    <div className="btn-group-box">
                      {showButton("Talk To A Fitness Expert") && (
                        <Link to={`/experts/${pkg.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`} className="btn btn-primary hvr-shutter-out-horizontal">
                          Talk To A Fitness Expert
                        </Link>
                      )}
                      {showButton("Smart Health Package") && (
                        <Link to={`/package/${pkg.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`} className="btn btn-primary hvr-shutter-out-horizontal">
                          Smart Health Package
                        </Link>
                      )}
                      {showButton("Talk To A Therapist") && (
                        <a className="mt-1 btn btn-primary hvr-shutter-out-horizontal">
                          Talk To A Therapist
                        </a>
                      )}

                      {showButton("Join") && (
                        <a className="mt-1 btn btn-primary hvr-shutter-out-horizontal">
                          Join
                        </a>
                      )}
                      {showButton("Book A Consultation") && (
                        <a className="mt-1 btn btn-primary hvr-shutter-out-horizontal">
                          Book A Consultation
                        </a>
                      )}
                    </div>
                  </figcaption>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetails;
