import React, { useEffect, useState } from "react";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";
import moment from "moment";

const Ledger = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactionHistory = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.partner_payment_history);
      setTransactions(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">All transactions</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Coupon Name</th>
                    <th>Coupon Code</th>
                    <th>Coupon Used Date</th>
                    <th>Associated With</th>
                    <th>Type</th>
                    <th>Partner Commission (%)</th>
                    <th>Received Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.transactions?.map((transaction, index) => {
                    const {
                      orderId,
                      couponName,
                      couponCode,
                      usedAt,
                      associatedService,
                      associatedPackage,
                      type,
                      partnerCommission,
                      receivedAmount,
                    } = transaction;

                    // Prefer service name if available, fallback to package name
                    const associatedWith =
                      associatedService?.name || associatedPackage?.name || "-";

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{orderId || "N/A"}</td>
                        <td>{couponName || "N/A"}</td>
                        <td>{couponCode || "N/A"}</td>
                        <td>
                          {usedAt
                            ? moment(usedAt).format("DD-MM-YYYY HH:mm")
                            : "N/A"}
                        </td>
                        <td>{associatedWith}</td>
                        <td>
                          <span
                            className={`badge ${
                              type?.toLowerCase() === "credit"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {type}
                          </span>
                        </td>
                        <td>{partnerCommission || 0}%</td>
                        <td>₹{receivedAmount?.toFixed(2) || "0.00"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
