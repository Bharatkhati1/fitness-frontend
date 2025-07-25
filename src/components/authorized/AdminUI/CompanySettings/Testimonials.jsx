import React, { useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";
import ShowFullDescriptionModal from "./Modals/ShowFullDescriptionModal";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [showFullDescriptionModal, setShowFullDescriptionModal] =
    useState(false);
  const [description, setDescription] = useState("");
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
                    <th>Description</th>
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
                          <p>
                            {item.description.length > 250 ? (
                              <>
                                {item.description.substring(0, 250)}...
                                <button
                                  onClick={() => {
                                    setShowFullDescriptionModal(true);
                                    setDescription(item.description);
                                  }}
                                  className="view-more-btn"
                                >
                                  view more
                                </button>
                              </>
                            ) : (
                              item.description
                            )}
                          </p>
                        </td>
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
                        <td style={{ width: "220px" }}>
                          {loadingId === item.id ? (
                            <span className="text-primary">Updating...</span>
                          ) : item.isApproved === "Pending" ||
                            item.isApproved === "Rejected" ? (
                            <>
                              <button
                                className="btn btn-sm btn-primary testimonial-btn me-2 mb-2"
                                onClick={() =>
                                  handleApproveReject(item.id, "Approved")
                                }
                              >
                                Approve
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-soft-primary testimonial-btn mb-2"
                              onClick={() =>
                                handleApproveReject(item.id, "Rejected")
                              }
                            >
                              Reject
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
      <ShowFullDescriptionModal
        open={showFullDescriptionModal}
        onCancel={() => setShowFullDescriptionModal(false)}
        description={description}
      />
    </div>
  );
};

export default Testimonials;
