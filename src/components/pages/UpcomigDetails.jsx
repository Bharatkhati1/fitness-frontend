import React, { useState, useEffect } from "react";
import iconImg1 from "../../../public/assets/img/iconimg1.png";
import iconImg2 from "../../../public/assets/img/iconimg2.png";
import iconImg3 from "../../../public/assets/img/iconimg3.png";

import upcomigeventsbg from "../../../public/assets/img/upcomigeventsbg.png";
import { useParams } from "react-router-dom";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { webAxios } from "../../utils/constants";
import { toast } from "react-toastify";

function UpcomigDetails() {
  const { slug } = useParams();
  const [details, setDetails] = useState({});
  const [open, setOpen] = useState(false);

  const fetchServiceDetails = async () => {
    try {
      const response = await webAxios.get(userApiRoutes.get_blog_details(slug));
      setDetails(response.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [slug]);
  return (
    <>
      <section className="BlogDeatils">
        <figure>
          <img src={details.image_url} crossOrigin="anonymous" />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{details.title}</h2>
          </div>
        </div>
      </section>

      {details.type !== "innovation" ? (
        <div className="topcontentbox text-center">
          <div className="container">
            <h4>Fuel Your Body Right - Eat Smart, Live Strong</h4>
            <ul className="topcontentboxlist">
              <li>
                <img src={iconImg1}></img>
                <span>{details.date}</span>
              </li>
              <li>
                <img src={iconImg2}></img>
                <span>11:00 AM – 1:00 PM IST</span>
              </li>
              <li>
                <img src={iconImg3}></img>
                <span>Online (Live on Zoom)</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div class="Bytext text-center">
          <span>
            By {details.auther} . {details.date} . {details.readTime} min read
          </span>
        </div>
      )}

      <div className="">
        <div
          className="container"
          dangerouslySetInnerHTML={{
            __html: details?.description,
          }}
        ></div>
      </div>
    </>
  );
}

export default UpcomigDetails;
