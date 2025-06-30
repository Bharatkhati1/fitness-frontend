import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import fulldocterImg from "../../../public/assets/img/fulldocterImg.png";
import Calender from "../authorized/UserUI/Calender";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import userAxios from "../../utils/Api/userAxios";
import { useSelector } from "react-redux";
import moment from "moment";

function BookAppoinmentdate({ consultant, packageId, isFollowUp, type }) {
  const { encodedId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState("");

  const [bookingId, setBookingId] = useState("");
  const [isfollowUpDiscountApplied, setIsFollowUpDiscountApplied] =
    useState(null);
  const [slots, setSlots] = useState([]);

  let id = "";
  try {
    id = atob(encodedId);
  } catch (err) {
    toast.error("Invalid consultant ID");
  }

  const handleAppointment = () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please fill all required fields");
      return;
    }
    const fees = isfollowUpDiscountApplied
      ? consultant?.fees - isfollowUpDiscountApplied
      : consultant?.fees;
    const appointmentData = {
      packageId: packageId,
      type: type,
      consultantId: consultant?.id,
      consultantName: consultant?.name,
      consultantImage: consultant?.image_url,
      consultantExpertise: consultant?.expertise,
      consultantExperience: consultant?.experience,
      consultantFees: fees,
      bookingCharge: fees,
      consultantDuration: consultant?.duration,
      selectedDate,
      isFollowUp,
      startTime: selectedSlot?.start,
      endTime: selectedSlot?.end,
      date: selectedDate,
      selectedSlot,
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
      },
    };

    localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    navigate("/checkout/appointment");
  };

  const validateBookingid = async () => {
    try {
      const res = await userAxios.post(
        userApiRoutes.check_previous_booking_id,
        {
          previousBookingId: bookingId,
          consultantId: consultant?.id,
        }
      );
      if (res.data.data) {
        toast.success("Follow up descount applied.");
        setIsFollowUpDiscountApplied(res.data?.data?.followUpDiscount);
      } else {
        toast.info(res.data.message);
        setIsFollowUpDiscountApplied(null);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      setIsFollowUpDiscountApplied(null);
    }
  };
  const fetchAvailibilitySlots = async (id) => {
    try {
      const res = await userAxios.get(
        userApiRoutes.consultant_availibility_slots(id, selectedDate)
      );
      setSlots(res.data.data);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    setSelectedSlot("");
    if (consultant) {
      fetchAvailibilitySlots(consultant?.id);
    }
  }, [consultant, selectedDate]);

  return (
    <section className="InnerpageSpace bookappoinmentdetail">
      <div className="container">
        <div className="row">
          <div className="col-md-4 badetailleft">
            <figure>
              <img
                crossOrigin="anonymous"
                src={consultant?.image_url || fulldocterImg}
                alt="consultant"
              />
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
                {isfollowUpDiscountApplied && consultant?.fees ? (
                  <>
                    <del style={{ color: "orange" }}>₹ {consultant.fees}</del>{" "}
                    &nbsp; ₹ {consultant.fees - isfollowUpDiscountApplied} |{" "}
                    {consultant.duration || 15} min
                  </>
                ) : (
                  <>
                    ₹ {consultant?.fees || 0} | {consultant?.duration || 15} min
                  </>
                )}
              </div>

              <div className="appoinmentsdetails">
                <h5>appointment details:</h5>
                <ul className="adlistinfo d-flex">
                  <li>
                    <h4>Date:</h4>
                    <span>
                      {selectedDate
                        ? moment(selectedDate).format("DD-MM-YYYY")
                        : "--"}
                    </span>
                  </li>
                  <li>
                    <h4>time:</h4>
                    <span>{selectedSlot?.start || "--"}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row slotdatebox">
              <div className="col-md-6 slotdateboxleft">
                <h4 className="slottitle">Please select a date:</h4>
                <Calender onDateSelect={setSelectedDate} />
                {isFollowUp && (
                  <div className="provideContactinfo mt-4">
                    <h4 className="slottitle">
                      Please provide your booking id:
                    </h4>
                    <div className="contactInput d-flex gap-2">
                      <input
                        placeholder="Enter your booking id"
                        className="form-control"
                        type="text"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                      />
                      <button
                        onClick={() => validateBookingid()}
                        className="btn btn-primary  hvr-shutter-out-horizontal"
                      >
                        check
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-6 slotdateboxright">
                <h4 className="slottitle">Available Time Slots:</h4>

                <ul className="slottimelist">
                  {slots.map((slot) => (
                    <li
                      key={slot.start}
                      className={`
                         ${
                           selectedSlot?.start === slot.start
                             ? "slottimeactive"
                             : ""
                         }
                         ${slot.status === "booked" ? "booked-slot" : ""}
                       `}
                      onClick={() =>
                        slot.status !== "booked" && setSelectedSlot(slot)
                      }
                      style={{
                        cursor:
                          slot.status === "booked" ? "not-allowed" : "pointer",
                        opacity: slot.status === "booked" ? 0.6 : 1,
                      }}
                    >
                      {slot.start}
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
