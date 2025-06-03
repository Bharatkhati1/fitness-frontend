import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import blogDeatils from "../../../../../public/assets/img/blogDeatils.png";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { webAxios } from "../../../../utils/Api/userAxios";
import JoinImg from "../../../../../public/assets/img/JoinImg.png";

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

const BlogsDetails = () => {
  const { slug } = useParams();
  const [details, setDetails] = useState({});

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

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <section className=" BlogDeatils">
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
              By The Daily Fitness .{" "}
              {new Date(details.updatedAt).toLocaleDateString("en-GB")}
            </span>

          </div>
          <div className="contentbox"
           dangerouslySetInnerHTML={{
            __html: details?.description,
          }}
          >
          </div>
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
                    onClick={showModal}
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

      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal"
        footer={[
          <>
            <div className="modalhead">
              <h3>join our health community</h3>
            </div>

            <div className="modalbody">
              <p>
                Make fitness a way of life by availing yourself of free access
                to regular health and fitness updates through newsletters and
                our vibrant social media health community.<br></br>
                <span>
                  Staying informed helps you stay fitter in your day-to-day
                  life.
                </span>
              </p>

              <div className="row formmodal mt-4 align-items-center">
                <div className="col-md-5 me-auto">
                  <div class="form-group mb-2">
                    <label>First Name*</label>
                    <input
                      placeholder="Enter your first name"
                      class="form-control"
                      type="text"
                    />
                  </div>

                  <div class="form-group mb-2">
                    <label>Email ID*</label>
                    <input
                      placeholder="Enter your email id"
                      class="form-control"
                      type="text"
                    />
                  </div>

                  <div class="form-group mb-2">
                    <label>your contact number:</label>
                    <div class="contactInput">
                      <span>+91</span>
                      <input
                        placeholder="Enter your contact number"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="btnmodal  mt-3"> <button className="btn btn-primary max-btn">join now</button></div>
                </div>

                <div className="col-md-6">
                  <figure className="hc-img">
                    <img src={JoinImg}></img>
                  </figure>
                </div>
              </div>
            </div>
          </>,
        ]}
      ></Modal>
    </>
  );
};

export default BlogsDetails;
