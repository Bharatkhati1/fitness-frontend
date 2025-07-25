import React, { useEffect, useState } from "react";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";

const Ledger = () => {
  const [transactions, setTransactions] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const fetchTransactionHistory = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.partner_payment_history(user.id)
      );
      setTransactions(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.export_transactions("partner", user.id)
      );
      const csvContent = res.data;

      if (!csvContent) {
        toast.error("No data to download.");
        return;
      }

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ledge-report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="download-report-btn"
          onClick={() => handleDownloadReport()}
        >
          EXPORT DATA
        </button>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Transactions</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Credit</th>
                      <th>Debit</th>
                      <th>Line Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions?.transactions?.map((transaction, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {moment(transaction.createdAt).format(
                            "DD-MM-YYYY HH:mm"
                          )}
                        </td>
                        <td>{transaction.comment}</td>
                        <td>
                          {transaction.type == "credit"
                            ? `₹${transaction.amount}`
                            : "-"}
                        </td>
                        <td>
                          {transaction.type != "credit"
                            ? `₹${transaction.amount}`
                            : "-"}
                        </td>
                        <td>{transaction?.currentBalance}</td>
                      </tr>
                    ))}
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

export default Ledger;
