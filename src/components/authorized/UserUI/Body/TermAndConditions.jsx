import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { webAxios } from "../../../../utils/constants";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";

const TermAndConditions = () => {
  const [termAndConditions, setTermAndConditions] = useState({});
  const fetchTermAndConditions = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_term_consitions);
      setTermAndConditions(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchTermAndConditions();
  }, []);
  return (
    <>
      <section className="innerbanner ">
        <figure>
          <img
            crossOrigin="anonymous"
            src={termAndConditions?.banner_url}
            alt="s"
          />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>{termAndConditions?.title}</h2>
            <p>{termAndConditions?.description}</p>
          </div>
        </div>
      </section>

      <div className="ToolsPageMain sectionSpace">
        <div
          className="container"
          dangerouslySetInnerHTML={{
            __html: termAndConditions?.content,
          }}
        ></div>
      </div>
    </>
  );
};

export default TermAndConditions;
