import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { webAxios } from "../../../../utils/constants";

import { toast } from "react-toastify";
import JoinCommunity from "./Modals/JoinCommunity";

const BlogsDetails = () => {
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
      <JoinCommunity open={open} setOpen={setOpen} />
      <section className="BlogDeatils">
        <figure>
          <img crossOrigin="anonymous" src={details?.image_url} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{details?.title}</h2>
          </div>
        </div>
      </section>
      <div className="BlogDeatilsContent">
        <div className="container">
          <div class="Bytext text-center">
            <span>
              {details.auther && <>By {details.auther}.</>}
              {details.date || details.createdAt ? (
                <>
                  {" "}
                  {new Date(
                    details.date || details.createdAt
                  ).toLocaleDateString("en-GB")}
                  .
                </>
              ) : null}
              {details.readTime && <> {details.readTime} min read</>}
            </span>
          </div>
          <div
            className="contentbox"
            dangerouslySetInnerHTML={{
              __html: details?.description,
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

export default BlogsDetails;
