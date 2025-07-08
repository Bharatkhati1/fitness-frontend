import React, { useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_testimonials);
      setTestimonials(res.data.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Failed to fetch testimonials"
      );
    }
  };

  const handleApproveReject = async (id, status) => {
    try {
      setLoadingId(id);
      await adminAxios.put(adminApiRoutes.update_testimonialStatus(id), {
        status: status,
      });
      toast.success(`Testimonial ${status.toLowerCase()} successfully.`);
      fetchTestimonials();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Action failed");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">All Testimonials</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Username</th>
                    <th>Rating</th>
                    <th>Package Name</th>
                    <th>Service Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.length ? (
                    testimonials.map((item) => (
                      <tr key={item.id}>
                        <td>{item.User?.firstName || "-"}</td>
                        <td>{item.rating}</td>
                        <td>{item.Package?.name || "-"}</td>
                        <td>{item.Service?.name || "-"}</td>
                        <td>
                          <span
                            className={`badge text-bg-${
                              item.isApproved === "Approved"
                                ? "success"
                                : item.isApproved === "Rejected"
                                ? "danger"
                                : "warning"
                            }`}
                          >
                            {item.isApproved}
                          </span>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                          {loadingId === item.id ? (
                            <span className="text-primary">Updating...</span>
                          ) : item.isApproved === "Pending" ? (
                            <>
                              <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={() =>
                                  handleApproveReject(item.id, "Approved")
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-soft-primary"
                                onClick={() =>
                                  handleApproveReject(item.id, "Rejected")
                                }
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleApproveReject(item.id, "Pending")
                              }
                            >
                              UnApprove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No testimonials found.
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

export default Testimonials;
