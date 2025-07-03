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

  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  return (
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
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.transactions?.map((transaction, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <span
                          className={`badge ${
                            transaction.type == "credit"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.comment}</td>
                      <td>
                        {moment(transaction.createdAt).format(
                          "DD-MM-YYYY HH:mm"
                        )}
                      </td>
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

export default Ledger;
