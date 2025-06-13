import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import adminAxios from '../../../../utils/Api/adminAxios';
import adminApiRoutes from '../../../../utils/Api/Routes/adminApiRoutes';

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
                  <th>Image</th>
                  <th>Title</th>
                  <th>Short Description</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.length ? (
                  appliedJobs.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={item.image_url} target="_blank">
                          <img
                            src={item.image_url}
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
                                item.image_url
                              )
                            }
                          />
                        </Link>
                      </td>
                      <td>{item.title}</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: item.shortDescription,
                        }}
                      />
                      <td>{item?.Master?.name}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.isActive ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
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
