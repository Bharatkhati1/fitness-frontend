import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import servicebanner from "../../../../../public/assets/img/servicebanner.png";
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

  useEffect(()=>{
    fetchServiceDetails()
  },[slug])
  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={servicebanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>disease management</h2>
            <p>
              Innovative and sustainable approach towards solution of metabolic
              diseases
            </p>
          </div>
        </div>
      </section>

      <div className="sectionSpace servicedetail">
        <div className="container">
          <p className="text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled.Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled.
          </p>

          <div className="row servicedetaillisting">
            <div className="col-md-6">
              <figure><img src={smIMG1}/></figure>

              <figcaption>
                <h3>Diabetes</h3>
                <p>
                  Type 2 diabetes is a condition that happens because of a
                  problem in the way the body regulates and uses sugar as a
                  fuel.This long-term condition results in too much sugar
                  circulating in the blood. Eventually, high blood sugar levels
                  can lead to disorders of the circulatory, nervous and immune
                  systems.
                </p>

                <div className="btn-group-box">
                  <Link className="btn btn-primary" to={"/package-details"}>smart health package</Link>
                  <Link className="btn btn-primary" to={"/experts"}>book a consultation</Link>
                  <Link className="btn btn-primary">talk to a fitness expert</Link>
                </div>
              </figcaption>
            </div>

              <div className="col-md-6">
              <figure><img src={smIMG1}/></figure>

              <figcaption>
                <h3>Diabetes</h3>
                <p>
                  Type 2 diabetes is a condition that happens because of a
                  problem in the way the body regulates and uses sugar as a
                  fuel.This long-term condition results in too much sugar
                  circulating in the blood. Eventually, high blood sugar levels
                  can lead to disorders of the circulatory, nervous and immune
                  systems.
                </p>

                <div className="btn-group-box">
                  <Link className="btn btn-primary">smart health package</Link>
                  <Link className="btn btn-primary">book a consultation</Link>
                  <Link className="btn btn-primary">talk to a fitness expert</Link>
                </div>
              </figcaption>
            </div>
              <div className="col-md-6">
              <figure><img src={smIMG1}/></figure>

              <figcaption>
                <h3>Diabetes</h3>
                <p>
                  Type 2 diabetes is a condition that happens because of a
                  problem in the way the body regulates and uses sugar as a
                  fuel.This long-term condition results in too much sugar
                  circulating in the blood. Eventually, high blood sugar levels
                  can lead to disorders of the circulatory, nervous and immune
                  systems.
                </p>

                <div className="btn-group-box">
                  <Link className="btn btn-primary">smart health package</Link>
                  <Link className="btn btn-primary">book a consultation</Link>
                  <Link className="btn btn-primary">talk to a fitness expert</Link>
                </div>
              </figcaption>
            </div>
              <div className="col-md-6">
              <figure><img src={smIMG1}/></figure>

              <figcaption>
                <h3>Diabetes</h3>
                <p>
                  Type 2 diabetes is a condition that happens because of a
                  problem in the way the body regulates and uses sugar as a
                  fuel.This long-term condition results in too much sugar
                  circulating in the blood. Eventually, high blood sugar levels
                  can lead to disorders of the circulatory, nervous and immune
                  systems.
                </p>

                <div className="btn-group-box">
                  <Link className="btn btn-primary">smart health package</Link>
                  <Link className="btn btn-primary">book a consultation</Link>
                  <Link className="btn btn-primary">talk to a fitness expert</Link>
                </div>
              </figcaption>
            </div>
              <div className="col-md-6">
              <figure><img src={smIMG1}/></figure>

              <figcaption>
                <h3>Diabetes</h3>
                <p>
                  Type 2 diabetes is a condition that happens because of a
                  problem in the way the body regulates and uses sugar as a
                  fuel.This long-term condition results in too much sugar
                  circulating in the blood. Eventually, high blood sugar levels
                  can lead to disorders of the circulatory, nervous and immune
                  systems.
                </p>

                <div className="btn-group-box">
                  <Link className="btn btn-primary">smart health package</Link>
                  <Link className="btn btn-primary">book a consultation</Link>
                  <Link className="btn btn-primary">talk to a fitness expert</Link>
                </div>
              </figcaption>
            </div>
              <div className="col-md-6">
              <figure><img src={smIMG1}/></figure>

              <figcaption>
                <h3>Diabetes</h3>
                <p>
                  Type 2 diabetes is a condition that happens because of a
                  problem in the way the body regulates and uses sugar as a
                  fuel.This long-term condition results in too much sugar
                  circulating in the blood. Eventually, high blood sugar levels
                  can lead to disorders of the circulatory, nervous and immune
                  systems.
                </p>

                <div className="btn-group-box">
                  <Link className="btn btn-primary">smart health package</Link>
                  <Link className="btn btn-primary">book a consultation</Link>
                  <Link className="btn btn-primary">talk to a fitness expert</Link>
                </div>
              </figcaption>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetails;
