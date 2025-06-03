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
          <img crossOrigin="anonymous" src={details.image_url} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>Understanding Glutathione : Benefits and Myths</h2>
          </div>
        </div>
      </section>
      <div className="BlogDeatilsContent">
        <div className="container">
          <div class="Bytext text-center">
            <span>By Nivesh Sharma . 4/21/2025 . 2 min read</span>
          </div>
          <div className="contentbox">
            <h4>Understanding Glutathione</h4>
            <p>
              Glutathione is a powerful antioxidant naturally found in our
              bodies, composed of three amino acids: cysteine, glutamine, and
              glycine. It plays a crucial role in combating oxidative stress,
              detoxifying harmful substances, and maintaining overall cellular
              health. While the significance of glutathione is well-documented
              in scientific literature, numerous myths surrounding its benefits
              and usage can lead to misunderstanding and misinformation.
            </p>
          </div>
          <div className="contentbox">
            <h4>Common Myths About Glutathione</h4>
            <p>
              One prevalent myth is that supplementing with glutathione will
              lead to direct detoxification in the body. However, research
              indicates that orally ingested glutathione doesn’t significantly
              increase its levels in human tissues. A study published in the
              journal Nutrition Research (2011) demonstrated that when
              glutathione is taken orally, it is largely broken down in the
              digestive tract before it can exert any beneficial effects in our
              cells.
            </p>
            <p>
              Another misconception is that high doses of glutathione
              supplements can effectively boost the immune system. While
              maintaining optimal levels of glutathione is essential for immune
              function, it is important to recognize that excess amounts do not
              necessarily equate to enhanced immune response. The body regulates
              glutathione levels meticulously, and the introduction of an excess
              can create an imbalance, leading to potential health
              complications.
            </p>
          </div>
          <div className="heighlighttext">
            "Glutathione isn't magic — it's science. Know the facts, not the
            fads."
          </div>
          <div className="contentbox">
            <h4>Scientific Backing and Evidence</h4>
            <p>
              Numerous studies suggest that glutathione plays a crucial role in
              various bodily functions, and the importance of maintaining
              healthy levels cannot be overstated. For example, a review
              published in the journal Free Radical Biology and Medicine
              elucidates the antioxidant properties of glutathione, emphasizing
              its protective effects against free radical damage and its
              involvement in enzymatic reactions vital for detoxification.
            </p>
            <p>
              Moreover, recent research published in the Journal of Clinical
              Medicine explored the correlation between glutathione levels and
              chronic diseases such as cardiovascular ailments and diabetes. The
              study concluded that low glutathione levels are often linked with
              inflammation and oxidative stress, indicating that maintaining
              adequate levels is crucial for health.
            </p>
            <p>
              Despite the myths, maintaining gut health and consuming a balanced
              diet rich in fruits and vegetables can naturally support
              glutathione production. Foods such as garlic, onions, and
              cruciferous vegetables contain compounds that help enhance the
              body's production of this vital antioxidant.
            </p>
          </div>
          <div className="contentbox">
            <h4>Scientific Backing and Evidence</h4>
            <p>
              The discussion around glutathione is pivotal in understanding its
              importance for health and wellness. While it is essential to
              acknowledge its benefits as an antioxidant, it is equally crucial
              to dispel the myths that surround its supplementation. Reliable
              scientific research provides clarity and helps navigate the
              complexities of glutathione, enabling individuals to make informed
              decisions about their health.
            </p>
            <p>
              <i>
                In summary, rather than relying on supplements claiming
                miraculous benefits, individuals should focus on holistic
                approaches to boost their natural glutathione production through
                a balanced diet and healthy lifestyle choices.
              </i>
            </p>
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
