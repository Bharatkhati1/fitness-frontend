import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import smIMG1 from "../../../../../public/assets/img/smIMG1.png";
import { webAxios } from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";

function ServiceDetails() {
  const {slug} = useParams()
  const [details, setDetails] = useState({})

  const fetchServiceDetails =async()=>{
    try {
      const response = await webAxios.get(userApiRoutes.get_service_details(slug))
      setDetails(response.data.data)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(html); // optional sanitization
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(()=>{
    fetchServiceDetails()
  },[slug])
  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={details?.image_url} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{details.name}</h2>
            <p>
              {stripHtml(details?.shortDescription)}
            </p>
          </div>
        </div>
      </section>

      <div className="sectionSpace servicedetail">
        <div className="container">
          <p className="text-center">
           {stripHtml(details.description)}
          </p>

          <div className="row servicedetaillisting">
          {details?.Packages?.map((pkg)=><div className="col-md-6">
              <figure><img src={pkg.image_url}/></figure>

              <figcaption>
                <h3>{pkg.name}</h3>
                <p>
                
                </p>

                <div className="btn-group-box">
                  <Link className="btn btn-primary" to={"/package-details"}>smart health package</Link>
                  <Link className="btn btn-primary" to={"/experts"}>book a consultation</Link>
                  <Link className="btn btn-primary">talk to a fitness expert</Link>
                </div>
              </figcaption>
            </div>) }
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetails;
