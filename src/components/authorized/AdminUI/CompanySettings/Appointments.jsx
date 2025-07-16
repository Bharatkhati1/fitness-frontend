import React, { useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const AllAppointments = () => {
    const [allAppointments, setallAppointments] = useState([]);

    const fetchallAppointments = async () => {
      try {
        const res = await adminAxios.get(adminApiRoutes.get_all_appointments);
        setallAppointments(res.data.data);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    useEffect(() => {
      fetchallAppointments();
    }, []);
    return (
      <div className="row ">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Appointments</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Booking Id</th>
                      <th>Username</th>
                      <th>Package</th>
                      <th>Amount</th>
                      <th>Consultant</th>
                      <th>Consultant Earning</th>
                      <th>Start</th>
                      <th>End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAppointments.length ? (
                      allAppointments.map((item, index) => (
                        <tr key={item.bookingId}>
                          <td>{item.bookingId}</td>
                          <td>{item?.User?.name || '-'}</td>
                          <td>{item.Package.name}</td>
                          <td>{item.amount}</td>
                          <td>{item.Consultant.name}</td>
                          <td>{item?.consultantEarning}</td>
                          <td>{item.bookingStart}</td>
                          <td>{item?.bookingEnd}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AllAppointments
