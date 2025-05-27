import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Inclusions from "./Inclusions.jsx";
import Variants from "./Variants.jsx";
import "./package.scss";
import { Select } from "antd";
const { Option } = Select;

const PackageManagement = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDesc, setPackageDesc] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [packageStatus, setPackageStatus] = useState(true);
  const [packageType, setPackageType] = useState("");
  const [packagePrice, setPackagePrice] = useState(0);
  const [selectedServiceTypeId, setSelectedServiecTypeId] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [packageImage, setPakageImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [ctaButtons, setCtaButtons] = useState([]);
  const [packages, setPackage] = useState([]);
  const [selectedConsultantsId, setSelectedConsultantsId] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [packageInclusions, setPackageInclusions] = useState([
    { name: "", description: "", image: null, status: true },
  ]);
  const [packageVariants, setPackageVariants] = useState([
    { name: "", duration: 0, price: "", description: "", image: null },
  ]);
  
  const fileInputRef = useRef(null);

  const ctaOptions = [
    "Join",
    "Book A Consultation",
    "Smart Health Package",
    "Talk To A Fitness Expert",
    "Talk To A Therapist",
  ];

  const allConsultants = [
    { id: "1", name: "Dr. Ayesha Khan" },
    { id: "2", name: "Dr. Rahul Mehra" },
    { id: "3", name: "Dr. Sarah Gupta" },
    { id: "4", name: "Dr. Vikram Desai" },
    { id: "5", name: "Dr. Nivedita Sharma" },
    { id: "6", name: "Dr. Anil Kapoor" },
  ];

  const fetchAllPackage = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_package);
      setPackage(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response.data.message);
    }
  };

  const fetchAllServices = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_services);
      setAllServices(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (!packageImage && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", packageName);
    formData.append("shortDescription", packageDesc);
    formData.append("is_active", packageStatus);
    formData.append("longDescription", longDescription);
    formData.append("service_id", selectedServiceTypeId);
    formData.append("type", packageType);
    formData.append("price", packagePrice);
    packageImage && formData.append("package_image", packageImage);

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
        onCancelEdit();
        toast.success(response.data.message);
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to create slider.${error.response.data.message}`);
    }
  };

  const deletePackage = async (id) => {
    try {
      await adminAxios.delete(adminApiRoutes.delete_package(id));
      toast.success("Deleted Successfully");
      fetchAllPackage();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedPackageId(null);
    setPackageName("");
    setPackageType(null);
    setSelectedServiecTypeId("");
    setPackageDesc("");
    setPackageStatus("1");
    setPackagePrice(0);
    setPakageImage(null);
    setLongDescription("");
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onAddInclusion = () => {
    const isValid = packageInclusions.every(
      (item) =>
        item.name.trim() !== "" &&
        item.description.trim() !== "" &&
        item.image &&
        item.status !== undefined
    );

    if (!isValid) {
      toast.error("Please fill all inclusion fields before adding a new one.");
      return;
    }

    setPackageInclusions([
      ...packageInclusions,
      { name: "", description: "", image: null, status: true },
    ]);
  };

  const onAddVariant = () => {
    const isValid = packageVariants.every(
      (item) =>
        item.name.trim() !== "" &&
        item.duration > 0 &&
        item.price.toString().trim() !== "" &&
        item.description.trim() !== "" &&
        item.image
    );

    if (!isValid) {
      toast.error("Please fill all variant fields before adding a new one.");
      return;
    }

    setPackageVariants([
      ...packageVariants,
      { name: "", duration: 0, price: "", description: "", image: null },
    ]);
  };

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
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Package Type */}
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

                {/* Package Name */}
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

                {/* Package Banner Image */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Package Banner Image {isEdit && ` : ${selectedFileName}`}
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

                {/* Package desciption */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="service-des"
                      style={{ resize: "vertical", minHeight: "100px" }}
                      className="form-control"
                      placeholder="Enter short description"
                      value={packageDesc}
                      onChange={(e) => {
                        const text = e.target.value;
                        if (text.length <= 200) {
                          setPackageDesc(text);
                        }
                      }}
                    />
                    <small className="text-muted">
                      {packageDesc.length}/200 characters
                    </small>
                  </div>
                </div>

                {/* Medical consultants */}
                <div className="col-lg-6">
                  <div className="mb-3">
                      <label htmlFor="consultants" className="form-label">
                        Medical Consultants
                      </label>
                      <Select
                        mode="multiple"
                        allowClear
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Select medical consultants"
                        value={selectedConsultantsId}
                        onChange={(value) => setSelectedConsultantsId(value)}
                      >
                        {allConsultants.map((consultant) => (
                          <Option key={consultant.id} value={consultant.id}>
                            {consultant.name}
                          </Option>
                        ))}
                      </Select>
                  </div>
                </div>

                {/* CTA button */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">CTA Button</label>
                    <div className="d-flex flex-wrap gap-3">
                      {ctaOptions.map((option, index) => (
                        <div className="form-check" key={index}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`cta-${index}`}
                            checked={ctaButtons.includes(option)}
                            onChange={(e) => {
                              const selected = ctaButtons.includes(option);
                              setCtaButtons(
                                selected
                                  ? ctaButtons.filter((item) => item !== option)
                                  : [...ctaButtons, option]
                              );
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`cta-${index}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
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
                        value={true}
                        checked={packageStatus}
                        onChange={() => setPackageStatus(true)}
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
                        value={false}
                        checked={!packageStatus}
                        onChange={() => setPackageStatus(false)}
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
            <div className="card-body">
              <p className="title">
                Package Inclusion{" "}
                <button onClick={() => onAddInclusion()}>+</button>
              </p>
              <Inclusions
                packageInclusions={packageInclusions}
                setPackageInclusions={setPackageInclusions}
              />
            </div>

            <div className="card-body">
              <p className="title">
                Package Variants
                <button onClick={() => onAddVariant()}>+</button>
              </p>
              <Variants
                packageVariants={packageVariants}
                setPackageVariants={setPackageVariants}
              />
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
                      <th>Short Description</th>
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
                          <td>{item.shortDescription}</td>
                          <td>{item?.Service?.name}</td>
                          <td>{item.type}</td>
                          <td>{item.price}</td>
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
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedPackageId(item.id);
                                  setPackageName(item.name);
                                  setPackageType(item.type);
                                  setSelectedServiecTypeId(item.serviceId);
                                  setPackageDesc(item.shortDescription);
                                  setLongDescription(item.longDescription);
                                  setPackageStatus(item.isActive);
                                  setPackagePrice(item.price);
                                  setSelectedFileName(item.image);
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

export default PackageManagement;
