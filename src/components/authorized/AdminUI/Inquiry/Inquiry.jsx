import React, { useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";
import { Tabs } from "antd";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState("inquiry");
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async (type) => {
    setLoading(true);
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_inquiry(type));
      setInquiries(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Server Error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries(activeTab);
  }, [activeTab]);

  const items = [
    {
      key: "inquiry",
      label: "Inquiries",
    },
    {
      key: "community",
      label: "Community",
    },
    {
      key: "event-registration", 
      label: "Event Registration",
    },
  ];

  const onChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={onChange}
        className="px-3 pt-2"
      />
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Inquiries</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      {activeTab === "inquiry" && <th>Service</th>}
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan={activeTab === "inquiry" ? 6 : 5}
                          className="text-center"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : inquiries.length > 0 ? (
                      inquiries.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item?.name}</td>
                          <td>{item.email || "-"}</td>
                          <td>{item?.phone}</td>
                          {activeTab === "inquiry" && (
                            <td>
                              {item?.Service?.map((serv) => serv.name)?.join(
                                ", "
                              )}
                            </td>
                          )}
                          <td>{item.message || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={activeTab === "inquiry" ? 6 : 5}
                          className="text-center"
                        >
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
    </>
  );
};

export default Inquiry;
