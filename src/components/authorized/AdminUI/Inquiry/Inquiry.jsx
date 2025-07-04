import React, {  useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";
import { Tabs } from "antd";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState("inquiry");
  const [loading, setLoading] = useState(false);
  const tabColumnMap = {
    inquiry: [
      { key: "id", label: "ID", render: (_, __, i) => i + 1 },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Contact" },
      {
        key: "service",
        label: "Service",
        render: (item) => item?.Service?.map((s) => s.name).join(", ") || "-",
      },
      { key: "message", label: "Message" },
      {
        key: "action",
        label: "Action",
        render: (item) =>
          item?.email ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => window.open(`mailto:${item.email}`)}
            >
              Send Mail
            </button>
          ) : (
            "-"
          ),
      },
    ],
    testimonial: [
      { key: "id", label: "ID", render: (_, __, i) => i + 1 },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "message", label: "Message" },
      {
        key: "action",
        label: "Action",
        render: (item) =>
          item?.email ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => window.open(`mailto:${item.email}`)}
            >
              Send Mail
            </button>
          ) : (
            "-"
          ),
      },
    ],
    community: [
      { key: "id", label: "ID", render: (_, __, i) => i + 1 },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Contact" },
      {
        key: "action",
        label: "Action",
        render: (item) =>
          item?.email ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => window.open(`mailto:${item.email}`)}
            >
              Send Mail
            </button>
          ) : (
            "-"
          ),
      },
    ],
    "applied-jobs": [
      { key: "id", label: "ID", render: (_, __, i) => i + 1 },
      {
        key: "resume_url",
        label: "Resume",
        render: (item) =>
          item?.resume_url?.length > 0 ? (
            <a
              href={item.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Resume
            </a>
          ) : (
            "N/A"
          ),
      },
      { key: "name", label: "Name" },
      { key: "dob", label: "DOB" },
      { key: "role", label: "Role" },
      {
        key: "createdAt",
        label: "Date",
        render: (item) =>
          item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
      },
    ],
    bussiness: [
      { key: "id", label: "ID", render: (_, __, i) => i + 1 },
      { key: "name", label: "Name" },
      { key: "contactFor", label: "Bussiness Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Contact" },
      { key: "message", label: "Message" },
      {
        key: "action",
        label: "Action",
        render: (item) =>
          item?.email ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => window.open(`mailto:${item.email}`)}
            >
              Send Mail
            </button>
          ) : (
            "-"
          ),
      },
    ],
    "event-registration": [
      { key: "id", label: "ID", render: (_, __, i) => i + 1 },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Contact" },
      {
        key: "Event.title",
        label: "Event Name",
        render: (item) => <>{item?.Event?.title}</>,
      },
      {
        key: "action",
        label: "Action",
        render: (item) =>
          item?.email ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => window.open(`mailto:${item.email}`)}
            >
              Send Mail
            </button>
          ) : (
            "-"
          ),
      },
    ],
    "event-inquiry": [
      { key: "id", label: "ID", render: (_, __, i) => i + 1 },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Contact" },
      { key: "message", label: "Message" },
      {
        key: "action",
        label: "Action",
        render: (item) =>
          item?.email ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => window.open(`mailto:${item.email}`)}
            >
              Send Mail
            </button>
          ) : (
            "-"
          ),
      },
    ],
    "news-latter": [
      { key: "id", label: "ID", render: (_, __, i) => i + 1 },
      { key: "email", label: "Email" },
      {
        key: "action",
        label: "Action",
        render: (item) =>
          item?.email ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => window.open(`mailto:${item.email}`)}
            >
              Send Mail
            </button>
          ) : (
            "-"
          ),
      },
    ],
  };

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

  const fetchAppliedJobs = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_applied_jobs("list"));
      setInquiries(res.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    if (activeTab == "applied-jobs") {
      fetchAppliedJobs();
    } else {
      fetchInquiries(activeTab);
    }
  }, [activeTab]);

  const items = [
    {
      key: "inquiry",
      label: "Get in Touch",
    },
    {
      key: "testimonial",
      label: "Testimonial Form",
    },
    {
      key: "community",
      label: "Community Form",
    },
    {
      key: "applied-jobs",
      label: "Careers",
    },
    {
      key: "bussiness",
      label: "Business Partners",
    },
    {
      key: "event-registration",
      label: "Event Registration",
    },
    {
      key: "event-inquiry",
      label: "Event Enquiry",
    },
    {
      key: "news-latter",
      label: "News Letter",
    },
  ];

  const onChange = (key) => {
    setActiveTab(key);
  };

  const handleDownloadReport = async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab == "applied-jobs") {
        res = await adminAxios.get(adminApiRoutes.get_applied_jobs("export"));
      } else {
        res = await adminAxios.get(adminApiRoutes.export_inquiry(activeTab));
      }

      const csvContent = res.data;

      if (!csvContent) {
        toast.error("No data to download.");
        return;
      }

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `inquiry-report-${activeTab}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Server Error!");
    } finally {
      setLoading(false);
    }
  };

  const columns = tabColumnMap[activeTab] || [];

  return (
    <>
      <div className="d-flex justify-content-between align-item-end">
        <Tabs
          activeKey={activeTab}
          items={items}
          onChange={onChange}
          className="px-3 pt-2"
        />
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
              <h4 className="card-title">All Inquiries</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={columns.length} className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : inquiries.length > 0 ? (
                      inquiries.map((item, index) => (
                        <tr key={item.id}>
                          {columns.map((col) => (
                            <td key={col.key}>
                              {col.render
                                ? col.render(item, col.key, index)
                                : item[col.key] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={columns.length} className="text-center">
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
