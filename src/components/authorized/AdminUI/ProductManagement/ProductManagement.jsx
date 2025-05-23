import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";

const ProductManagement = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDesc, setPackageDesc] = useState("");
  const [packageStatus, setPackageStatus] = useState("1");
  const [packageType, setPackageType] = useState("");
  const [packagePrice, setPackagePrice] = useState(0);
  const [selectedServiceTypeId, setSelectedServiecTypeId] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [packageImage, setPakageImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [packages, setPackage] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const fileInputRef = useRef(null);

  const fetchAllPackage = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_package);
      setPackage(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
    }
  };

  const fetchAllServices = async () => {
    try {
      const res = await adminAxios.post(adminApiRoutes.get_services);
      setAllServices(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
    }
  };

  const handleSubmit = async () => {
    if (!packageImage && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", packageName);
    formData.append("description", packageDesc);
    formData.append("is_active", packageStatus);
    formData.append("service_type_id", selectedServiceTypeId);
    formData.append("type", packageType);
    formData.append("price", packagePrice);
    packageImage && formData.append("image", packageImage);

    try {
      let url = isEdit
        ? adminApiRoutes.update_package(selectedPackageId)
        : adminApiRoutes.create_package;

        let response;
        if (isEdit) {
          response = await adminAxios.put(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          response = await adminAxios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
  

      if (response.status == 200) {
        fetchAllPackage();
        setIsEdit(false);
        setSelectedPackageId(null);
        setPackageName("");
        setPackageType(null);
        setSelectedServiecTypeId("");
        setPackageDesc("");
        setPackageStatus("1");
        setPackagePrice(0);
        setPakageImage(null);
        setSelectedFileName(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success(response.data.message);
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error("Failed to create slider.");
    }
  };

  const deletePackage = async (id) => {
    try {
      await adminAxios.delete(adminApiRoutes.delete_package(id));
      toast.success("Deleted Successfully");
      fetchAllPackage();
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelEdit =()=>{
    setIsEdit(false);
    setSelectedPackageId(null);
    setPackageName("");
    setPackageType(null);
    setSelectedServiecTypeId("");
    setPackageDesc("");
    setPackageStatus("1");
    setPackagePrice(0);
    setPakageImage(null);
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  useEffect(() => {
    fetchAllPackage();
    fetchAllServices();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
        <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Package` : `Create Package`}
              </h4>
              {isEdit && <button onClick={()=>onCancelEdit()}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Slider Name */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-name" className="form-label">
                      Package Name
                    </label>
                    <input
                      type="text"
                      id="service-name"
                      className="form-control"
                      placeholder="Enter name"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Package Image */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Package Image {isEdit && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      id="service-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setPakageImage(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Package Price */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="package-price" className="form-label">
                      Package Price
                    </label>
                    <input
                      type="number"
                      id="package-price"
                      value={packagePrice}
                      className="form-control"
                      onChange={(e) => setPackagePrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="package-type" className="form-label">
                      Package type
                    </label>
                    <select
                      id="package-type"
                      className="form-select"
                      name="packageType"
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="consultation">Consultation</option>
                      <option value="subscription">Subscription</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="package-type" className="form-label">
                      Service type
                    </label>
                    <select
                      id="package-type"
                      className="form-select"
                      value={selectedServiceTypeId}
                      onChange={(e) => setSelectedServiecTypeId(e.target.value)}
                    >
                      <option value="">Select type</option>
                      {allServices?.map((service) => (
                        <option value={service.id}>{service.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Package Desciption
                    </label>
                    <input
                      type="text"
                      id="service-des"
                      className="form-control"
                      placeholder="Enter Description"
                      value={packageDesc}
                      onChange={(e) => setPackageDesc(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <p>Package Status</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="service-status"
                        value="1"
                        checked={packageStatus === "1"}
                        onChange={() => setPackageStatus("1")}
                        id="status-active"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="service-status"
                        value="0"
                        checked={packageStatus === "0"}
                        onChange={() => setPackageStatus("0")}
                        id="status-inactive"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-footer border-top">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {isEdit ? `Update Changes` : `Save Change`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Packages</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Service Type</th>
                      <th>Package Type</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.length > 0 ? (
                      packages.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>
                            <Link target="_blank" to={item.img_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={item.img_url}
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
                                    item.img_url
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.service_name}</td>
                          <td>{item.type}</td>
                          <td>{item.price}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.is_active === 1
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {item.is_active === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div class="d-flex gap-2">
                              <button
                                class="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedPackageId(item.id);
                                  setPackageName(item.name);
                                  setPackageType(item.type);
                                  setSelectedServiecTypeId(item.service_type_id);
                                  setPackageDesc(item.description);
                                  setPackageStatus(`${item.is_active}`);
                                  setPackagePrice(item.price);
                                  setSelectedFileName(item.img_name);
                                }}
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
                                  ></iconify-icon>
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No sliders found.
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

export default ProductManagement;
