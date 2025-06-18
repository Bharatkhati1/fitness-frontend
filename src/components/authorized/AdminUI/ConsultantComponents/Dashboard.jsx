import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [transactionHistory, setTransactionHistory] = useState({});
  const [appointment, setAppointments] = useState({
    allAppointments: [],
    todayAppointments: [],
  });

  const Cards = [
    {
      name: "Current Balance",
      value: `₹${user?.earning|| "0.00"}`,
    },
    {
      name: "Total Income",
      value: `₹${transactionHistory?.totalEarning?.toFixed(2) || "0.00"}`,
    },
    {
      name: "Total Appointments",
      value: appointment?.allAppointments?.length || 0,
    },
    {
      name: "Upcoming Appointments",
      value: appointment?.todayAppointments?.length || 0,
    },
  ];
  
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

  const PaymentHistory = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.consultant_payment_history
      );
      setTransactionHistory(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    PaymentHistory();
  }, []);
  return (
    <>
      <div class="row">
        {Cards.map((card) => (
          <div class="col-md-6">
            <div class="card overflow-hidden">
              <div class="card-body">
                <div class="row">
                  <div class="col-6">
                    <div class="avatar-md bg-soft-primary rounded">
                      <iconify-icon
                        icon="solar:cart-5-bold-duotone"
                        class="avatar-title fs-32 text-primary"
                      ></iconify-icon>
                    </div>
                  </div>
                  <div class="col-6 text-end">
                    <p class="text-muted mb-0 text-truncate">{card.name}</p>
                    <h3 className="text-dark mt-1 mb-0">{card?.value}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Appointments Today</h4>
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
                    <tbody>
                      {appointment?.todayAppointments?.length > 0 ? (
                        appointment.todayAppointments.map((data, index) => (
                          <tr key={index}>
                            <td>{data?.bookingId}</td>
                            <td>₹{data?.amount?.toFixed(2)}</td>
                            <td>₹{data?.consultantEarning?.toFixed(2)}</td>
                            <td>
                              {new Date(data?.bookingStart).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </td>
                            <td>
                              {new Date(data?.bookingEnd).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                       <td colSpan="6" className="text-center">
                            No appointments today.
                          </td>
                          
                        </tr>
                      )}
                    </tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
