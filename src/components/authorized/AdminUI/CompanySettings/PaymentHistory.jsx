import React, { useEffect, useState } from "react";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";
import moment from "moment";
import { Tabs } from "antd";

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("consultant");
  const [loading, setLoading] = useState(false)
  const [consultants, setConsultants] = useState([]);
  const [partners, setPartners] = useState([]);

  const [selectedConsultant, setSelectedConsultant] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");

  // Fetch dropdown data
  const fetchConsultants = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_consultants);
      setConsultants(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch consultants");
    }
  };

  const fetchPartners = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_partners);
      setPartners(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch partners");
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true)
      if (activeTab === "consultant") {
        const res = await adminAxios.get(
          adminApiRoutes.consultant_payment_history(selectedConsultant || null)
        );
        setTransactions(res.data.data);
      } else {
        const res = await adminAxios.get(
          adminApiRoutes.partner_payment_history(selectedPartner || null)
        );
        setTransactions(res.data.data?.transactions);
      }
    } catch (error) {
      toast.error("Failed to fetch transactions");
    }finally{
      setLoading(false)
    }
  };

  // Initial load
  useEffect(() => {
    fetchConsultants();
    fetchPartners();
  }, []);

  // Refetch when tab or selection changes
  useEffect(() => {
    fetchTransactions();
  }, [activeTab, selectedConsultant, selectedPartner]);

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="d-flex justify-content-between">
          {/* Tab Selector */}
          <Tabs
            defaultActiveKey="consultant"
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              setSelectedConsultant("");
              setSelectedPartner("");
            }}
            items={[
              { key: "consultant", label: "All Service Providers" },
              { key: "partner", label: "All B2B Partners" },
            ]}
          />

          {/* Dropdown based on active tab */}
          {activeTab === "consultant" && (
            <select
              className="select-partner-coupon"
              style={{ width: "300px" }}
              value={selectedConsultant}
              onChange={(e) => setSelectedConsultant(e.target.value)}
            >
              <option value="">Select Consultant</option>
              {consultants.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          {activeTab === "partner" && (
            <select
              className="select-partner-coupon"
              style={{ width: "300px" }}
              value={selectedPartner}
              onChange={(e) => setSelectedPartner(e.target.value)}
            >
              <option value="">Select Partner</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>
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
                    {activeTab === "partner" && <th>B2B Partner Name</th>}
                    {activeTab === "consultant" && (
                      <th>Service Provider Name</th>
                    )}
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {moment(transaction.createdAt).format(
                            "DD-MM-YYYY HH:mm"
                          )}
                        </td>
                        <td>{transaction.comment || "-"}</td>
                        {activeTab === "partner" && (
                          <td>{transaction?.Partner?.name || "-"}</td>
                        )}
                        {activeTab === "consultant" && (
                          <td>{transaction?.Consultant?.name || "-"}</td>
                        )}
                        <td>
                          <span
                            className={`badge ${
                              transaction.type === "credit"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>

                        <td>₹{transaction.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No transactions found.
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
};

export default PaymentHistory;
