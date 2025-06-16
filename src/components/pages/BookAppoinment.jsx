import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { webAxios } from "../../utils/constants";
import BookAppoinmentdate from "./BookAppoinmentdate";

function BookAppoinment() {
  const { encodedId, type } = useParams();
  const [details, setDetails] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [isFollowUp, setIsFollowUp] = useState(false);

  useEffect(() => {
    if (!encodedId) return;

    let decodedId = "";
    let typeOF = "";
    try {
      decodedId = atob(encodedId);
      typeOF = type;
    } catch (err) {
      toast.error("Invalid expert ID.");
      return;
    }

    const fetchProductConsultantDetails = async () => {
      try {
        const response = await webAxios.get(
          userApiRoutes.get_package_consultants(decodedId, typeOF)
        );
        setDetails(response.data.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.error || "Failed to load consultant details."
        );
      }
    };

    fetchProductConsultantDetails();
  }, [encodedId]);

  if (selectedConsultant) {
    const packageId = atob(encodedId);
    return (
      <BookAppoinmentdate
        isFollowUp={isFollowUp}
        consultant={selectedConsultant}
        packageId={packageId}
      />
    );
  }
  return (
    <>
      <section className="fixspace bookappoinment">
        <div class="OurTEAMhead text-center">
          <span>HEALTH CONSULTATION</span>
          <h2>MEET OUR HEALTH EXPERTS</h2>
          <p>
            Your trusted guide in navigating your health journey. With expert
            support in lifestyle, nutrition, and personalized care, <br></br>
            we’re here to help you take control of your well-being—one step at a
            time.
          </p>
        </div>
      </section>

      <section className="bookappoinmentdcoter">
        <div className="container">
          {details?.map((cons) => (
            <div className="bookappoinmentinner">
              <div className="row">
                <div className="col-md-5 ">
                  <div className="bookappoinmentl">
                    <figure>
                      <img crossOrigin="anonymous" src={cons?.image_url} />
                    </figure>
                  </div>
                </div>
                <div className="col-md-7 ">
                  <div className="bookappoinmentr">
                    <div className="bookappoinmenthead d-flex justify-content-between align-items-end">
                      <div className="bpheadleft">
                        <h4>
                          {cons?.title} {cons?.name}
                        </h4>
                        <p>{cons?.expertise}</p>
                        <p>{cons?.experience} years of experience</p>
                      </div>

                      <div className="pricetime">
                        ₹ {cons?.fees} | {cons?.duration} min
                      </div>
                    </div>

                    <hr></hr>

                    <div className="bookappoinmentbody">
                      <h5>Overview:</h5>
                      <p>{cons?.description}</p>
                      <div className="d-flex justify-content-start gap-3">
                        <a
                          onClick={() => setSelectedConsultant(cons)}
                          className="btn btn-primary mt-2 hvr-shutter-out-horizontal"
                        >
                          make an appointment
                        </a>
                        <a
                          onClick={() => {
                            setIsFollowUp(true);
                            setSelectedConsultant(cons);
                          }}
                          className="btn btn-primary mt-2 hvr-shutter-out-horizontal"
                        >
                          Follow up
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {details.length == 0 && (
            <div className="col-12 text-center py-5">
              <h5>No data found.</h5>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default BookAppoinment;
