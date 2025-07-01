import React,{useEffect, useState} from 'react'
import adminAxios from '../../../../utils/Api/adminAxios'
import adminApiRoutes from '../../../../utils/Api/Routes/adminApiRoutes'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const location = useLocation();

  const type = location.pathname.split("/").pop();

  const fetchInquiries = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_inquiry(type));
      setInquiries(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Server Error!");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [type]);
  return (
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
                 {type=='inquiry'&& <th>Service</th>}
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length > 0 ? (
                  inquiries.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item.email || "-"}</td>
                      <td>{item?.phone}</td>
                      {type=='inquiry'&&<td>{item?.Service?.map((serv)=> serv.name)?.join(", ")}</td>}
                      <td>{item.message || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
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
  )
}

export default Inquiry
