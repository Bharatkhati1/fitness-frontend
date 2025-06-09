import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { webAxios } from "../../../../utils/constants";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState({});
  const fetchPrivacypolicy = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_privacy_policy_details);
      setPrivacyPolicy(res.data.data);
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
          <img
            crossOrigin="anonymous"
            src={privacyPolicy?.banner_url}
            alt="s"
          />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{privacyPolicy?.title}</h2>
            <p>{privacyPolicy?.description}</p>
          </div>
        </div>
      </section>

      <div className="ToolsPageMain sectionSpace">
        <div
          className="container"
          dangerouslySetInnerHTML={{
            __html: privacyPolicy.content,
          }}
        ></div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
