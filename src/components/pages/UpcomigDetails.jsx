import React, { useState, useEffect } from "react";
import iconImg1 from "../../../public/assets/img/iconimg1.png";
import iconImg2 from "../../../public/assets/img/iconimg2.png";
import iconImg3 from "../../../public/assets/img/iconimg3.png";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useParams } from "react-router-dom";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { webAxios } from "../../utils/constants";
import { toast } from "react-toastify";

function UpcomigDetails({ type }) {
  const { slug } = useParams();
  const [details, setDetails] = useState({});
  const [modifyOptionalImages, setModifyOptionalImages] = useState([]);

  const fetchServiceDetails = async () => {
    try {
      let response = {};
      if (type == "event") {
        response = await webAxios.get(userApiRoutes.get_event_detail(slug));
        if (response.data?.data?.OptionalImages.length > 0) {
          const servicesData = response.data.data.OptionalImages;
          const chunkSize = 4;
          const chunkedServices = [];
          for (let i = 0; i < servicesData.length; i += chunkSize) {
            chunkedServices.push(servicesData.slice(i, i + chunkSize));
          }
          setModifyOptionalImages(chunkedServices);
        }
      } else {
        response = await webAxios.get(userApiRoutes.get_blog_details(slug));
      }
      setDetails(response.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const formatTimeTo12Hour = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const prevArrow = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="60" viewBox="0 0 30 60" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.60766 31.7776L18.7502 45.9201L22.2852 42.3851L9.91016 30.0101L22.2852 17.6351L18.7502 14.1001L4.60766 28.2426C4.13898 28.7114 3.87569 29.3472 3.87569 30.0101C3.87569 30.673 4.13898 31.3088 4.60766 31.7776Z" fill="#2A2A2A"/>
  </svg>
`;

  const nextArrow = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="60" viewBox="0 0 30 60" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.3923 31.7776L11.2498 45.9201L7.71484 42.3851L20.0898 30.0101L7.71484 17.6351L11.2498 14.1001L25.3923 28.2426C25.861 28.7114 26.1243 29.3472 26.1243 30.0101C26.1243 30.673 25.861 31.3088 25.3923 31.7776Z" fill="#2A2A2A"/>
  </svg>
`;

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

      {details.type !== "innovation" || type == "event" ? (
        <div className="topcontentbox text-center">
          <div className="container">
            <h4>Fuel Your Body Right - Eat Smart, Live Strong</h4>
            <ul className="topcontentboxlist">
              <li>
                <img src={iconImg1}></img>
                <span>
                  {new Date(details.date)
                    .toLocaleDateString("en-GB")
                    .replaceAll("/", "-")}
                </span>
              </li>
              <li>
                <img src={iconImg2}></img>
                <span>{formatTimeTo12Hour(details?.time)}</span>
              </li>
              <li>
                <img src={iconImg3}></img>
                <span>{details?.eventType}</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div class="Bytext text-center">
          <span>
            By {details.auther} .{" "}
            {new Date(details.date)
              .toLocaleDateString("en-GB")
              .replaceAll("/", "-")}{" "}
            . {details.readTime} min read
          </span>
        </div>
      )}

      <div className="pb-3">
        <div
          className="container mb-3"
          dangerouslySetInnerHTML={{
            __html: details?.description,
          }}
        ></div>
          <div className="clearfix"></div>
        {type == "event" &&
          Array.isArray(modifyOptionalImages) &&
          modifyOptionalImages?.length > 0 &&
          Array.isArray(modifyOptionalImages[0]) && (
            <div className="container">
            <OwlCarousel
              className="owl-theme"
              autoplay={false}
              dots={true}
              items={1}
              loop={false}
              margin={10}
              nav={true}
              navText={[prevArrow, nextArrow]}
              autoplaySpeed={3000}
              autoplayTimeout={9000}
            >
              {modifyOptionalImages?.map((group, index) => (
                <div className="row g-2 event-images-optional" key={index}>
                  {group.map((srv, idx) => {
                    return (
                      <div className="col-md-6" key={idx}>
                        <div className=" ">
                          <figure>
                            <img
                              crossOrigin="anonymous"
                              src={srv.image_url}
                              alt={srv.image}
                            />
                          </figure>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </OwlCarousel>
            </div>
          )}
      
      </div>
    </>
  );
}

export default UpcomigDetails;
