import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import { useSelector } from "react-redux";

const PackageManagement = () => {
  const navigate = useNavigate();
  const { type = "admin" } = useSelector((state) => state.auth);
  const [packages, setPackage] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [filterPackages, setFilterPackages] = useState([]);

  const fetchAllPackage = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_package);
      setPackage(res.data.data);
      setFilterPackages(res.data.data)
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response.data.message);
    }
  };
  
  const deletePackage = async (id) => {
    try {
      let Id = selectedPackageId || id;
      await adminAxios.delete(adminApiRoutes.delete_package(Id));
      toast.success("Deleted Successfully");
      fetchAllPackage();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = (search) => {
    if (search.length > 0) {
      const filterValue = packages.filter((val) =>
        val.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterPackages(filterValue);
    } else {
      setFilterPackages(packages);
    }
  };

  useEffect(() => {
    fetchAllPackage();
  }, []);
  return (
    <>
      <div className="add-package-btn">
        <Link to={`/${type}/service-management/create-update-package`}>
          + Add Package
        </Link>
      </div>
      <div className="d-flex justify-content-end mb-3">
          <input
            className="w-50" 
            placeholder="Search here"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginLeft: "20px" }}
          />
        </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Packages</h4>{" "}
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Short Description</th>
                      <th>Service Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterPackages.length > 0 ? (
                      filterPackages.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link target="_blank" to={item.image_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={item.image_url}
                                alt="Slider"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "contain",
                                  border: "1px solid #eee",
                                }}
                                onError={(e) => {
                                  console.error(
                                    "Image failed to load:",
                                    item.image_url
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>{item?.name}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: item?.shortDescription,
                            }}
                          ></td>
                          <td>{item?.Service?.name}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.isActive ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {item.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div class="d-flex gap-2">
                              <button
                                class="btn btn-soft-primary btn-sm"
                                onClick={() =>
                                  navigate(
                                    `/${type}/service-management/create-update-package?id=${item.id}&isEdit=true`
                                  )
                                }
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this Package ?"
                                title="Delete Package"
                                onOk={() => deletePackage(item.id)}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
                                    onClick={() =>
                                      setSelectedPackageId(item.id)
                                    }
                                  ></iconify-icon>
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No packages found.
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

export default PackageManagement;
