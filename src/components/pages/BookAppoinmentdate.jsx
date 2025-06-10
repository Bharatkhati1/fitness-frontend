import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import fulldocterImg from "../../../public/assets/img/fulldocterImg.png";
import Calender from "../authorized/UserUI/Calender";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import userAxios from "../../utils/Api/userAxios";
import { useSelector } from "react-redux";

function BookAppoinmentdate({ consultant }) {
  const { encodedId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [slots, setSlots] = useState([]);

  let id = "";
  try {
    id = atob(encodedId);
  } catch (err) {
    toast.error("Invalid consultant ID");
  }

  const handleAppointment = async () => {
    if (!selectedDate || !selectedSlot || !contactNumber) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const res = await userAxios.post(userApiRoutes.create_order_razorpay, {
        amount: consultant?.fees,
      });

      const { orderId, amount, currency } = res.data.data;
      const options = {
        key: "rzp_test_ENoX7bkuXjQBZc",
        amount,
        currency,
        name: "Consultant booking",
        description: "",
        image: "/assets/img/logo.png",
        order_id: orderId,
        handler: async function (response) {
          try {
            const payload = {
              consultantId: consultant.id,
              consultantName: consultant?.name,
              date: selectedDate,
              startTime: selectedSlot?.start,
              endTime: selectedSlot?.end,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            await userAxios.post(userApiRoutes.appointment_booking, payload);
            toast.success("Booking successful!");
            fetchAvailibilitySlots(consultant?.id)
          } catch (err) {
            console.log("verification err", err);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: "#528FF0",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("last error", error);
      toast.error(error.response?.data?.error || "Payment initiation failed!");
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
                    <span>{selectedSlot?.start || "--"}</span>
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
                  {slots.map((slot) => (
                    <li
                      key={slot.start}
                      className={`
                         ${selectedSlot?.start === slot.start ? "slottimeactive" : ""}
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
