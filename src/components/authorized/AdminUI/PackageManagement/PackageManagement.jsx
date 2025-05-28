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
import DOMPurify from "dompurify";
import Ckeditor from "../CkEditor/Ckeditor.jsx";

const { Option } = Select;

const PackageManagement = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDesc, setPackageDesc] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [packageStatus, setPackageStatus] = useState(true);
  const [emailNotification, setEmailNotification] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [packageBannerImage, setPackageBannerImage] = useState(null);
  const [selectedServiceTypeId, setSelectedServiecTypeId] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileName2, setSelectedFileName2] = useState("");
  const [packageImage, setPakageImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [ctaButtons, setCtaButtons] = useState([]);
  const [packages, setPackage] = useState([]);
  const [selectedConsultantsId, setSelectedConsultantsId] = useState([]);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState({});
  const [allServices, setAllServices] = useState([]);

  const [packageInclusions, setPackageInclusions] = useState([
    { name: "", description: "", image: null, is_active: true },
  ]);

  const [packageVariants, setPackageVariants] = useState([
    { name: "", duration: 0, price: "", description: "", image: null },
  ]);

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

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
    // Validate images if not editing
    if ((!packageImage || !packageBannerImage) && !isEdit) {
      toast.warning("Please select package banner and package image.");
      return;
    }

    // Validate package inclusions
    for (let i = 0; i < packageInclusions.length; i++) {
      const inclusion = packageInclusions[i];
      if (
        !inclusion.name ||
        !inclusion.description ||
        (!inclusion.image && !isEdit)
      ) {
        toast.warning(`Please fill all fields for Inclusion #${i + 1}`);
        return;
      }
    }

    // Validate package variants
    for (let i = 0; i < packageVariants.length; i++) {
      const variant = packageVariants[i];
      if (
        !variant.name ||
        !variant.duration ||
        !variant.price ||
        !variant.description ||
        (!variant.image && !isEdit)
      ) {
        toast.warning(`Please fill all fields for Variant #${i + 1}`);
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", packageName);
    formData.append("description", packageDesc);
    formData.append("is_active", packageStatus);
    formData.append("package_plans", JSON.stringify(packageVariants));
    formData.append("package_inclusions", JSON.stringify(packageInclusions));
    formData.append("longDescription", "s");
    formData.append("notification_emails", emailNotification);
    formData.append("service_id", selectedServiceTypeId);
    formData.append("action", ctaButtons);
    if (packageImage) formData.append("package_image", packageImage);
    if (packageBannerImage)
      formData.append("package_banner", packageBannerImage);

    // Append images for inclusions
    for (let i = 0; i < packageInclusions.length; i++) {
      if (packageInclusions[i].image) {
        formData.append(`package_inclusion_${i}`, packageInclusions[i].image);
      }
    }

    // Append images for variants
    for (let i = 0; i < packageVariants.length; i++) {
      if (packageVariants[i].image) {
        formData.append(`package_plan_${i}`, packageVariants[i].image);
      }
    }

    try {
      const url = isEdit
        ? adminApiRoutes.update_package(selectedPackageId)
        : adminApiRoutes.create_package;

      const response = isEdit
        ? await adminAxios.put(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await adminAxios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (response.status === 200) {
        fetchAllPackage();
        onCancelEdit();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(
        `Failed to ${isEdit ? "update" : "create"} package. ${
          error?.response?.data?.message
        }`
      );
    }
  };

  const deletePackage = async () => {
    try {
      await adminAxios.delete(adminApiRoutes.delete_package(selectedPackageId));
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
    setPackageBannerImage(null);
    setSelectedServiecTypeId("");
    setPackageDesc("");
    setCtaButtons([]);
    setPackageStatus("1");
    setPakageImage(null);
    setLongDescription("");
    setSelectedFileName(null);
    setPackageInclusions([
      { name: "", description: "", image: null, is_active: true },
    ]);
    setPackageVariants([
      { name: "", duration: 0, price: "", description: "", image: null },
    ]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (fileInputRef2.current) {
      fileInputRef2.current.value = "";
    }
  };

  const onAddInclusion = () => {
    const isValid = packageInclusions.every(
      (item) =>
        item.name.trim() !== "" &&
        item.description.trim() !== "" &&
        item.image &&
        item.is_active !== undefined
    );

    if (!isValid) {
      toast.error("Please fill all inclusion fields before adding a new one.");
      return;
    }

    setPackageInclusions([
      ...packageInclusions,
      { name: "", description: "", image: null, is_active: true },
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

  const addEmailForNotification = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput || !emailRegex.test(emailInput)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    setEmailNotification((prev) => [...prev, emailInput]);
    setEmailInput("");
  };

  const onRemoveEmail = (index) => {
    setEmailNotification((prev) => prev.filter((_, i) => i !== index));
  };

  const initPackageEditForm = (data) => {
    if (!data) return;
    setSelectedPackageDetails(data);
    setPackageName(data.name || "");
    setPackageDesc(data.description || "");
    setLongDescription(data.description || "");
    setPackageStatus(data.isActive ?? true);
    setSelectedServiecTypeId(data.serviceId || null);
    setSelectedPackageId(data.id || null);

    // Image URLs and filenames
    setPackageBannerImage(data.banner_url || null);
    setSelectedFileName2(data.banner || "");
    setPakageImage(data.image_url || null);
    setSelectedFileName(data.image || "");

    // Package Inclusions
    const inclusions = Array.isArray(data.PackageInclusions)
      ? data.PackageInclusions.map((inc) => ({
          name: inc.name || "",
          description: inc.description || "",
          image: inc.image || null,
          is_active: inc.isActive ?? true,
        }))
      : [{ name: "", description: "", image: null, is_active: true }];
    setPackageInclusions(inclusions);

    // Package Variants / Plans
    const variants = Array.isArray(data.PackagePlans)
      ? data.PackagePlans.map((plan) => ({
          name: plan.name || "",
          duration: plan.duration || 0,
          price: plan.price || "",
          description: plan.description || "",
          image: plan.image || null,
        }))
      : [{ name: "", duration: 0, price: "", description: "", image: null }];
    setPackageVariants(variants);

    // Optional: set edit mode
    setIsEdit(true);
  };

  const fetchPackageDetailsById = async (id) => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_package_details(id));
      const packageData = res.data.data;
      initPackageEditForm(packageData);
    } catch (error) {
      console.error("Failed to fetch package:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(html); // optional sanitization
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    fetchAllPackage();
    fetchAllServices();
  }, []);

  return (
    <>
      {/* Create Package */}
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Package` : `Add Package`}
              </h4>
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )}
            </div>
            <div className="card-body border-bottom">
              <div className="row">
                {/* Package Type */}
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label htmlFor="package-type" className="form-label">
                      Service Name
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
                <div className="col-lg-4">
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
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Package Banner Image {isEdit && ` : ${selectedFileName2}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      id="service-image"
                      ref={fileInputRef2}
                      className="form-control"
                      onChange={(e) => setPackageBannerImage(e.target.files[0])}
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

                {/* Package desciption */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Description
                    </label>
                    <Ckeditor
                      text={packageDesc}
                      setText={(value) => {
                        const text = value;
                        if (text.length <= 100) {
                          setPackageDesc(text);
                        }
                      }}
                    />
                    <small className="text-muted">
                      {packageDesc?.length}/100 characters
                    </small>
                  </div>
                </div>

                {/* CTA button */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">CTA Button</label>
                    <div className="">
                      {ctaOptions.map((option, index) => (
                        <div
                          className="row align-items-center my-1"
                          key={index}
                        >
                          <div className="col-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`cta-${index}`}
                                checked={ctaButtons.includes(option)}
                                onChange={(e) => {
                                  const selected = ctaButtons.includes(option);
                                  setCtaButtons(
                                    selected
                                      ? ctaButtons.filter(
                                          (item) => item !== option
                                        )
                                      : [...ctaButtons, option]
                                  );
                                }}
                              />
                              <label
                                className="form-check-label m-0"
                                htmlFor={`cta-${index}`}
                              >
                                {option}
                              </label>
                            </div>
                          </div>
                          {ctaButtons.includes(option) && (
                            <div className="col-lg-6">
                              <div className="email-new">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter emails  ','  separated"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Status */}
                <div className="col-lg-6">
                  <label className="form-label">Package Status</label>
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
                {/* Email notification
                <div className="col-lg-6">
                  <label className="form-label">Email notification</label>
                  <div className="d-flex flex-column gap-2 align-items-start">
                    <div className="form-check email-notif">
                      <input
                        type="text"
                        id="service-name"
                        value={emailInput}
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                      <p className="title" style={{ marginTop: "7px" }}>
                        <button onClick={() => addEmailForNotification()}>
                          +
                        </button>
                      </p>
                    </div>
                    <div className="input-emails">
                      {emailNotification.map((email, index) => (
                        <p>
                          {email}{" "}
                          <span
                            className="remove-icon"
                            onClick={() => onRemoveEmail(index)}
                          >
                            X
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="card-body border-bottom">
              <p className="title">
                Package Inclusion
                <button onClick={() => onAddInclusion()}>+</button>
              </p>
              <div className="row g-2">
                <Inclusions
                  packageInclusions={packageInclusions}
                  setPackageInclusions={setPackageInclusions}
                />
              </div>
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

      {/* Packages Table */}
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
                      <th>Service Name</th>
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
                          <td>{stripHtml(item.shortDescription)}</td>
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
                                  setSelectedFileName2(item.banner);
                                  setPackageName(item.name);
                                  setSelectedServiecTypeId(item.serviceId);
                                  setPackageDesc(item.description);
                                  setLongDescription(item.longDescription);
                                  setPackageStatus(item.isActive);
                                  setSelectedFileName(item.image);

                                  //fetchPackage details by id
                                  fetchPackageDetailsById(item.id);
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
                                onOk={() => deletePackage()}
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
                        <td colSpan="6" className="text-center">
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
