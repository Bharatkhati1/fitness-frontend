import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Inclusions from "./Inclusions.jsx";
import Variants from "./Variants.jsx";
import "./package.scss";
import { Select } from "antd";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateUpdatePackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [id, setId] = useState(null);
  const [emailInputs, setEmailInputs] = useState({});
  const [selectedConsultantsId, setSelectedConsultantsId] = useState([]);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState({});
  const [allServices, setAllServices] = useState([]);
  const [allConsultants, setAllConsultants] = useState([]);
  const [storyImage, setStoryImage] = useState(null)
  const [storyImageName, setStoryImageName] = useState(null)

  const [packageInclusions, setPackageInclusions] = useState([
    { name: "", description: "", image: null, is_active: true },
  ]);

  const [packageVariants, setPackageVariants] = useState([
    { name: "", duration: 0, price: "", description: "", image: null },
  ]);

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const storyImageRef = useRef(null);

  const ctaOptions = ["Talk to a Therapist", "Consult a Doctor", "Know more"];

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
    if (!packageImage && !isEdit) {
      toast.warning("Please select package image.");
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
    formData.append("actions", JSON.stringify(ctaButtons));
    formData.append(
      "consultant",
      selectedConsultantsId
    );

    if (packageImage) formData.append("package_image", packageImage);
    if (packageBannerImage)
      formData.append("package_banner", packageBannerImage);
    if (storyImage)
      formData.append("story_image", storyImage);

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

    const loadingToastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} package...`
    );

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
        onCancelEdit();
        toast.update(loadingToastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/admin/service-management/packages");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.update(loadingToastId, {
        render: `Failed to ${isEdit ? "update" : "create"} package. ${
          error?.response?.data?.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
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
    setStoryImage(null)
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

  const initPackageEditForm = (data, conss) => {
    if (!data) return;
  
    setSelectedPackageDetails(data);
    setPackageName(data.name || "");
    setPackageDesc(data.description || "");
    setLongDescription(data.description || "");
    setPackageStatus(data.isActive ?? true);
    setSelectedServiecTypeId(data.serviceId || null);
    setSelectedPackageId(data.id || null);
    setCtaButtons(JSON.parse(data.actions) || []);
    setSelectedConsultantsId(
      data.PackageConsultants?.map((cons) => {
        const matchedConsultant = conss.find((c) => c.id === cons.consultantId);
        return {
          value: cons.id,
          label: matchedConsultant?.name || "Unknown",
        };
      })
    );
    setPackageBannerImage(data.banner_url || null);
    setSelectedFileName2(data.banner || "");
    setPakageImage(data.image_url || null);
    setSelectedFileName(data.image || "");
    setStoryImageName(data?.story_image)
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
    setIsEdit(true);
  };

  const fetchPackageDetailsById = async (id, cons) => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_package_details(id));
      const packageData = res.data.data;
      initPackageEditForm(packageData, cons);
    } catch (error) {
      console.error("Failed to fetch package:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const fetchAllConsultants = async (id) => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_consultants);
      setAllConsultants(res.data.data);
      if(id){
        fetchPackageDetailsById(id, res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const idParam = queryParams.get("id");
    const isEditParam = queryParams.get("isEdit");
    if (isEditParam === "true") {
      fetchAllConsultants(idParam);
    }else{
      fetchAllConsultants(null)
    }
    setId(idParam);
    setIsEdit(isEditParam === "true");
  }, [location.search]);

  useEffect(() => {
    fetchAllServices()
  }, []);

  return (
    <>
      <div className="add-package-btn">
        <Link to="/admin/service-management/packages">View Package</Link>
      </div>
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

                {/* Package Story Image */}
              <div className="col-lg-4">
                <div className="mb-3">
                  <label htmlFor="service-image" className="form-label">
                    Package Story Image {isEdit && ` : ${storyImageName}`}
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                    id="service-image"
                    ref={storyImageRef}
                    className="form-control"
                    onChange={(e) => setStoryImage(e.target.files[0])}
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
                      onChange={(value) =>
                        setSelectedConsultantsId(
                          value.map((item) => item.value)
                        )
                      }
                      labelInValue
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
                      setText={(value) => setPackageDesc(value)}
                    />
                    <small className="text-muted">
                      {packageDesc?.length}/100 characters
                    </small>
                  </div>
                </div>

                {/* CTA button */}
                <div className="col-xxl-6 col-lg-8">
                  <div className="mb-3">
                    <label className="form-label">CTA Button</label>
                    <div className="">
                      {ctaOptions.map((option, index) => {
                        const matchedButton = ctaButtons.find(
                          (btn) => btn.name === option
                        );
                        const inputValue =
                          emailInputs[option] ??
                          matchedButton?.emails.join(", ") ??
                          "";
                        return (
                          <div
                            className="row align-items-center my-1"
                            key={index}
                          >
                            <div className="col-6">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`cta-${index}`}
                                  checked={!!matchedButton}
                                  onChange={() => {
                                    if (matchedButton) {
                                      setCtaButtons((prev) =>
                                        prev.filter(
                                          (item) => item.name !== option
                                        )
                                      );
                                      setEmailInputs((prev) => {
                                        const updated = { ...prev };
                                        delete updated[option];
                                        return updated;
                                      });
                                    } else {
                                      setCtaButtons((prev) => [
                                        ...prev,
                                        { name: option, emails: [] },
                                      ]);
                                      setEmailInputs((prev) => ({
                                        ...prev,
                                        [option]: "",
                                      }));
                                    }
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

                            {matchedButton && (
                              <div className="col-lg-6">
                                <div className="email-new">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter emails ',' separated"
                                    value={inputValue}
                                    onChange={(e) => {
                                      const input = e.target.value;
                                      setEmailInputs((prev) => ({
                                        ...prev,
                                        [option]: input,
                                      }));
                                    }}
                                    onBlur={() => {
                                      const emailArray = inputValue
                                        .split(",")
                                        .map((email) => email.trim())
                                        .filter((email) => email.length > 0);

                                      setCtaButtons((prev) =>
                                        prev.map((btn) =>
                                          btn.name === option
                                            ? { ...btn, emails: emailArray }
                                            : btn
                                        )
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-xxl-6 col-lg-4">
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
              </div>
            </div>

            <div className="card-body border-bottom">
              <p className="title">
                Package Inclusion
                <button onClick={() => onAddInclusion()}>+</button>
              </p>
              <div className="row g-2">
                <Inclusions
                  isEdit={isEdit}
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
                isEdit={isEdit}
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
    </>
  );
};

export default CreateUpdatePackage;
