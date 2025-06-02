import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import docterImg1 from "../../../public/assets/img/docterImg1.png";
import docterImg2 from "../../../public/assets/img/docterImg2.png";
import docterImg3 from "../../../public/assets/img/docterImg3.png";
import { toast } from "react-toastify";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { webAxios } from "../../utils/Api/userAxios";
import BookAppoinmentdate from "./BookAppoinmentdate";

function BookAppoinment() {
  const { encodedId } = useParams();
  const [details, setDetails] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState(null)

  useEffect(() => {
    if (!encodedId) return;

    let decodedId = "";
    try {
      decodedId = atob(encodedId);
    } catch (err) {
      console.error("Invalid encoded ID", err);
      toast.error("Invalid expert ID.");
      return;
    }

    const fetchProductConsultantDetails = async () => {
      try {
        const response = await webAxios.get(
          userApiRoutes.get_package_consultants(decodedId)
        );
        setDetails(response.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to load consultant details.");
      }
    };

    fetchProductConsultantDetails();
  }, [encodedId]);

  if(selectedConsultant){
    return(
     <BookAppoinmentdate/>
    )
 }
  return (
    <>
      <section className="fixspace bookappoinment">
        <div class="OurTEAMhead text-center">
          <span>health consultation</span>
          <h2>meet our diabetes health experts</h2>
          <p>
            Your trusted guide in managing and understanding diabetes. With
            expert knowledge in nutrition, lifestyle planning, and blood sugar
            management, <br></br>they’re here to help you take control of your
            health—one step at a time.
          </p>
        </div>
      </section>

      <section className="bookappoinmentdcoter">
        <div className="container">
          <div className="bookappoinmentinner">
            <div className="row">
              <div className="col-md-5 ">
                <div className="bookappoinmentl">
                  <figure>
                    <img crossOrigin="anonymous" src={details?.image_url} />
                  </figure>
                </div>
              </div>

              <div className="col-md-7 ">
                <div className="bookappoinmentr">
                  <div className="bookappoinmenthead d-flex justify-content-between align-items-end">
                    <div className="bpheadleft">
                      <h4>{details?.title}{details?.name}</h4>
                      <p>{details?.expertise}</p>
                      <p>{details?.experience} years of experience</p>
                    </div>

                    <div className="pricetime">₹ {details?.fees} | {details?.duration} min</div>
                  </div>

                  <hr></hr>

                  <div className="bookappoinmentbody">
                    <h5>Overview:</h5>
                    <p>
                     {details?.description}
                    </p>

                    <a onClick={()=> setSelectedConsultant("test")} className="btn btn-primary max-width mt-2 hvr-shutter-out-horizontal">
                      make an appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bookappoinmentinner">
            <div className="row">
              <div className="col-md-5 ">
                <div className="bookappoinmentl">
                  <figure>
                    <img src={docterImg2} />
                  </figure>
                </div>
              </div>

              <div className="col-md-7 ">
                <div className="bookappoinmentr">
                  <div className="bookappoinmenthead d-flex justify-content-between align-items-end">
                    <div className="bpheadleft">
                      <h4>Dr. rajesh joshi</h4>
                      <p>diabetes specialist</p>
                      <p>23 years of experience</p>
                    </div>

                    <div className="pricetime">₹ 549.00 | 15 min</div>
                  </div>

                  <hr></hr>

                  <div className="bookappoinmentbody">
                    <h5>Overview:</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled
                    </p>

                    <a className="btn btn-primary max-width mt-2 hvr-shutter-out-horizontal">
                      make an appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bookappoinmentinner">
            <div className="row">
              <div className="col-md-5 ">
                <div className="bookappoinmentl">
                  <figure>
                    <img src={docterImg3} />
                  </figure>
                </div>
              </div>

              <div className="col-md-7 ">
                <div className="bookappoinmentr">
                  <div className="bookappoinmenthead d-flex justify-content-between align-items-end">
                    <div className="bpheadleft">
                      <h4>Dr. mithilesh gaur</h4>
                      <p>diabetes specialist</p>
                      <p>20 years of experience</p>
                    </div>

                    <div className="pricetime">₹ 549.00 | 15 min</div>
                  </div>

                  <hr></hr>

                  <div className="bookappoinmentbody">
                    <h5>Overview:</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled
                    </p>

                    <a className="btn btn-primary max-width mt-2 hvr-shutter-out-horizontal">
                      make an appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
}

export default BookAppoinment;
