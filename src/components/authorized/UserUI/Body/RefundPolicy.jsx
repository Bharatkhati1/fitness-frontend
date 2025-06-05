import React, { useState, useEffect } from "react";
import { webAxios } from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";

const RefundPolicy = () => {
  const [refundPolicy, setRefundPolicy] = useState({});
  const fetchPrivacypolicy = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_refund_policy_details);
      setRefundPolicy(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchPrivacypolicy();
  }, []);
  return (
    <>
      <section className="innerbanner ">
        <figure>
          <img crossOrigin="anonymous" src={refundPolicy?.banner_url} alt="s" />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{refundPolicy?.title}</h2>
            <p>{refundPolicy?.description}</p>
          </div>
        </div>
      </section>

      <div className="ToolsPageMain sectionSpace">
        <div
          className="container"
          dangerouslySetInnerHTML={{
            __html: refundPolicy?.content,
          }}
        ></div>
      </div>
    </>
  );
};

export default RefundPolicy;
