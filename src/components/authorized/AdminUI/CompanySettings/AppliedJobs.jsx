import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import adminAxios from '../../../../utils/Api/adminAxios';
import adminApiRoutes from '../../../../utils/Api/Routes/adminApiRoutes';
import { Link } from 'react-router-dom';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const fetchAppliedJobs =async()=>{
    try {
        const res = await adminAxios.get(adminApiRoutes.get_applied_jobs)
        setAppliedJobs(res.data.data)
    } catch (error) {
        toast.error(error.response.data)
    }
  }
  useEffect(()=>{
  fetchAppliedJobs()
  },[])
  return (
    <div className="row mt-4">
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title">Applied Jobs</h4>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="bg-light-subtle">
                <tr>
                  <th>Id</th>
                  <th>Resume</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>role</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.length ? (
                  appliedJobs.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        {item?.resume_url.length>0 ?<Link to={item.resume_url} target="_blank">
                          <img
                            src={item.resume_url}
                            alt="Article"
                            crossOrigin="anonymous"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "contain",
                              border: "1px solid #eee",
                            }}
                            onError={(e) =>
                              console.error(
                                "Failed to load image:",
                                item.resume_url
                              )
                            }
                          />
                        </Link>:"N/A"}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.dob}</td>
                      <td>{item?.role}</td>
                      <td>
                      {new Date(item?.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No articles found.
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

export default AppliedJobs
