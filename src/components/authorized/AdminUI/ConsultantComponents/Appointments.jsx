import React, { useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointment, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_consultant_appointments
      );
      setAppointments(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }; 
  useEffect(() => {
    fetchAppointments();
  }, []);
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">All Bookings</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Booking Id</th>
                    <th>Amount</th>
                    <th>Earning</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment?.allAppointments?.map((data, index) => (
                         <tr>
                         <td>{data.bookingId}</td>
                         <td>₹{data.amount}</td>
                         <td>₹{data.consultantEarning}</td>
                         <td>{data.bookingStart}</td>
                         <td>{data.bookingEnd}</td>
                       </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
