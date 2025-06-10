import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userApiRoutes from "../../../../../utils/Api/Routes/userApiRoutes";
import { webAxios } from "../../../../../utils/constants";
import { toast } from "react-toastify";
import JoinCommunity from "./../Modals/JoinCommunity";

const NewsAndMediaDetails = () => {
  const { slug } = useParams();
  const [newsDetails, setNewsDetails] = useState({});
  const [open, setOpen] = useState(false);

  const fetchNewsDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_news_details(slug) 
      );
      setNewsDetails(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch details");
    }
  };

  useEffect(() => {
    fetchNewsDetails();
  }, [slug]);

  return (
    <>
      <JoinCommunity open={open} setOpen={setOpen} />
      <section className="NewsDetailsBanner">
        <figure>
          <img crossOrigin="anonymous" src={newsDetails?.image_url} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{newsDetails?.title}</h2>
          </div>
        </div>
      </section>

      <div className="NewsDetailsContent">
        <div className="container">
          <div className="Bytext text-center">
            <span>
              By The Daily Fitness ·{" "}
              {new Date(newsDetails.updatedAt).toLocaleDateString("en-GB")}
            </span>
          </div>
          <div
            className="contentbox"
            dangerouslySetInnerHTML={{
              __html: newsDetails?.description,
            }}
          ></div>

          <section className="JoinourhealthMain mb-4">
            <div className="container">
              <div className="Joinourhealth">
                <div className="JoinourhealthContent">
                  <h3>join our health community</h3>
                  <p>
                    Join our WhatsApp health community today! Connect with
                    like-minded individuals and get valuable health insights and
                    support, free of cost.
                  </p>
                  <a
                    type="primary"
                    onClick={() => setOpen(true)}
                    className="btn btn-primary hvr-shutter-out-horizontal"
                  >
                    join our free community
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default NewsAndMediaDetails;
