import React, { useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const Testimonials = () => {
    const [testimonails, setTestimonials] = useState([]);

    const fetchTestimonials = async () => {
      try {
        const res = await adminAxios.get(adminApiRoutes.get_testimonials);
        setTestimonials(res.data.data);
      } catch (error) {
        toast.error(error.response.data.error);
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
                      <th>Services Name</th>
                      <th>Is Approved</th>
                      <th>Date</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {testimonails.length ? (
                      testimonails.map((item, index) => (
                        <tr key={item.id}>
                          <td>{item.User.firstName}</td>
                          <td>{item.rating}</td>
                          <td>{item.Package?.name || "-"}</td>
                          <td>{item.Service?.name || "-"}</td>
                          <td>{item?.isApproved}</td>
                          <td>
                            {new Date(item?.createdAt).toLocaleDateString()}
                          </td>
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

export default Testimonials
