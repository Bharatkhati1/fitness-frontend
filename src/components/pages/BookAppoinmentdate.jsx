import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import fulldocterImg from "../../../public/assets/img/fulldocterImg.png";
import Calender from "../authorized/UserUI/Calender";
import { webAxios } from "../../utils/Api/userAxios";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";

function BookAppoinmentdate() {
  const { slug, encodedId } = useParams();
  const [consultant, setConsultant] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // Decode the encoded ID
  let id = "";
  try {
    id = atob(encodedId);
  } catch (err) {
    toast.error("Invalid consultant ID");
  }

  useEffect(() => {
    if (id) {
      fetchConsultantDetails();
    }
  }, [id]);

  const fetchConsultantDetails = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_package_consultants(id)
      );
      setConsultant(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to load consultant");
    }
  };

  const handleAppointment = () => {
    if (!selectedDate || !selectedTime || !contactNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    // Submit or log the appointment info
    console.log({
      consultantId: id,
      consultantName: consultant?.name,
      date: selectedDate,
      time: selectedTime,
      contact: contactNumber,
    });

    toast.success("Appointment Confirmed!");
  };

  return (
    <section className="InnerpageSpace bookappoinmentdetail">
      <div className="container">
        <div className="row">
          <div className="col-md-4 badetailleft">
            <figure>
              <img src={consultant?.image || fulldocterImg} alt="consultant" />
            </figure>
          </div>

          <div className="col-md-8 badetailright">
            <div className="baheadtitle">
              <h3>{consultant?.name || "Dr. Expert"}</h3>
              <p>{consultant?.expertise || "Specialist"}</p>
              <p>{consultant?.experience} years of experience</p>
            </div>

            <div className="apdinfo d-flex justify-content-between align-items-center">
              <div className="pricetime">
                ₹ {consultant?.fees || 0} | {consultant?.duration || 15} min
              </div>

              <div className="appoinmentsdetails">
                <h5>appointment details:</h5>
                <ul className="adlistinfo d-flex">
                  <li>
                    <h4>date:</h4>
                    <span>{selectedDate || "--"}</span>
                  </li>
                  <li>
                    <h4>time:</h4>
                    <span>{selectedTime || "--"}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row slotdatebox">
              <div className="col-md-6 slotdateboxleft">
                <h4 className="slottitle">Please select a date:</h4>
                <Calender onDateSelect={setSelectedDate} />

                <div className="provideContactinfo mt-4">
                  <h4 className="slottitle">
                    Please provide your contact number:
                  </h4>

                  <div className="contactInput">
                    <span>+91</span>
                    <input
                      placeholder="Enter your contact number"
                      className="form-control"
                      type="text"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6 slotdateboxright">
                <h4 className="slottitle">Available Time Slots:</h4>

                <ul className="slottimelist">
                  {[
                    "10:00 AM", "10:15 AM", "11:45 AM", "12:15 PM",
                    "1:00 PM", "2:00 PM", "2:30 PM", "3:00 PM",
                    "4:00 PM", "4:45 PM", "5:00 PM",
                  ].map((time) => (
                    <li
                      key={time}
                      className={selectedTime === time ? "slottimeactive" : ""}
                      onClick={() => setSelectedTime(time)}
                      style={{ cursor: "pointer" }}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="btnbox mt-4 text-center">
              <button
                className="btn btn-primary max-width hvr-shutter-out-horizontal"
                onClick={handleAppointment}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookAppoinmentdate;
