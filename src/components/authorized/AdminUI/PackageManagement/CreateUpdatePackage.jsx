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
import { useSelector } from "react-redux";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote.jsx";

const { Option } = Select;

const CreateUpdatePackage = () => {
  const navigate = useNavigate();
  const { type = "admin" } = useSelector((state) => state.auth);
  const location = useLocation();
  const [packageName, setPackageName] = useState("");
  const [packageDesc, setPackageDesc] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [packageStatus, setPackageStatus] = useState(true);
  const [emailNotification, setEmailNotification] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [allConsultants, setAllConsultants] = useState([]);

  const [packageInclusions, setPackageInclusions] = useState([
    { name: "", description: "", image: null, is_active: true },
  ]);

  const [packageVariantsSingle, setPackageVariantsSingle] = useState([
    { duration: 0, price: "", description: "", image: null, type: "single" },
  ]);

  const [packageVariantsCombo, setPackageVariantsCombo] = useState([
    { duration: 0, price: "", description: "", image: null, type: "combo" },
  ]);

  const [comboHeading, setComboheading] = useState("");
  const [singleheading, setSingleHeading] = useState("");

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

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

    // Validate package Single variants
    for (let i = 0; i < packageVariantsSingle.length; i++) {
      const variant = packageVariantsSingle[i];
      if (
        !variant.duration ||
        !variant.price ||
        !variant.description ||
        (!variant.image && !isEdit)
      ) {
        toast.warning(`Please fill all fields for Single Variant #${i + 1}`);
        return;
      }
    }

    // Validate package Combo variants
    for (let i = 0; i < packageVariantsCombo.length; i++) {
      const variant = packageVariantsCombo[i];
      if (
        !variant.duration ||
        !variant.price ||
        !variant.description ||
        (!variant.image && !isEdit)
      ) {
        toast.warning(`Please fill all fields for Combo Variant #${i + 1}`);
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", packageName);
    formData.append("description", packageDesc);
    formData.append("is_active", packageStatus);
    formData.append(
      "package_plans",
      JSON.stringify([...packageVariantsSingle, ...packageVariantsCombo])
    );
    formData.append("package_inclusions", JSON.stringify(packageInclusions));
    formData.append("shortDescription", shortDescription);
    formData.append("notification_emails", emailNotification);
    formData.append("service_id", selectedServiceTypeId);
    formData.append("actions", JSON.stringify(ctaButtons));
    formData.append(
      "consultant",
      selectedConsultantsId.map((val) => val.value)
    );
    // Append to formData only if valid
    if (packageVariantsSingle.length > 0) {
      formData.append("singleVariantHeading", singleheading.trim());
    }

    if (packageVariantsCombo.length > 0) {
      formData.append("comboVariantHeading", comboHeading.trim());
    }
    if (packageImage) formData.append("package_image", packageImage);
    if (packageBannerImage)
      formData.append("package_banner", packageBannerImage);

    // Append images for inclusions
    for (let i = 0; i < packageInclusions.length; i++) {
      if (packageInclusions[i].image) {
        formData.append(`package_inclusion_${i}`, packageInclusions[i].image);
      }
    }

    let k =0;
    // Append images for Single variants
    for (let i = 0; i < packageVariantsSingle.length; i++) {
      if (packageVariantsSingle[i].image) {
        formData.append(`package_plan_${k++}`, packageVariantsSingle[i].image);
      }
    }
    // Append images for Combo variants
    for (let i = 0; i < packageVariantsCombo.length; i++) {
      if (packageVariantsCombo[i].image) {
        formData.append(`package_plan_${k++}`, packageVariantsCombo[i].image);
      }
    }

    const loadingToastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} package...`
    );

    try {
      setIsLoading(true);
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
        navigate(`/${type}/service-management/packages`);
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
    } finally {
      setIsLoading(false);
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
    setShortDescription("");
    setSelectedFileName(null);
    setSelectedConsultantsId([]);
    setComboheading("");
    setSingleHeading("");
    setPackageInclusions([
      { name: "", description: "", image: null, is_active: true },
    ]);
    setPackageVariantsCombo([
      {
        name: "",
        duration: 0,
        price: "",
        description: "",
        image: null,
        type: "combo",
      },
    ]);
    setPackageVariantsSingle([
      {
        name: "",
        duration: 0,
        price: "",
        description: "",
        image: null,
        type: "single",
      },
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

  const onAddVariant = (type) => {
    const pack =
      type == "single" ? packageVariantsSingle : packageVariantsCombo;

    const isValid = pack.every(
      (item) =>
        item.duration > 0 &&
        item.price.toString().trim() !== "" &&
        item.description.trim() !== "" &&
        item.image
    );

    if (!isValid) {
      toast.error("Please fill all variant fields before adding a new one.");
      return;
    }
    if (type == "single") {
      setPackageVariantsSingle([
        ...pack,
        {
          duration: 0,
          price: "",
          description: "",
          image: null,
          type: "single",
        },
      ]);
    } else {
      setPackageVariantsCombo([
        ...pack,
        { duration: 0, price: "", description: "", image: null, type: "combo" },
      ]);
    }
  };

  const initPackageEditForm = (data, conss) => {
    if (!data) return;

    setSelectedPackageDetails(data);
    setPackageName(data.name || "");
    setPackageDesc(data.description || "");
    setShortDescription(data?.shortDescription || "");
    setPackageStatus(data.isActive ?? true);
    setSelectedServiecTypeId(data.serviceId || null);
    setSelectedPackageId(data.id || null);
    setCtaButtons(JSON.parse(data.actions) || []);
    setSelectedConsultantsId(
      data.PackageConsultants?.map((cons) => {
        const matchedConsultant = conss.find((c) => c.id === cons.consultantId);
        return {
          value: matchedConsultant?.id,
          label: matchedConsultant?.name || "Unknown",
        };
      })
    );
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
          type: plan.type || "single",
        }))
      : [
          {
            name: "",
            duration: 0,
            price: "",
            description: "",
            image: null,
            type: "single",
          },
        ];
    setSingleHeading(data.singleVariantHeading);
    setComboheading(data.comboVariantHeading);
    setPackageVariantsSingle(variants.filter((vdar) => vdar.type == "single"));
    setPackageVariantsCombo(variants.filter((vdar) => vdar.type == "combo"));
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
      if (id) {
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
    } else {
      fetchAllConsultants(null);
    }
    setId(idParam);
    setIsEdit(isEditParam === "true");
  }, [location.search]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <>
      <div className="add-package-btn">
        <Link to={`/${type}/service-management/packages`}>View Package</Link>
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

                {/* Package Image */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="service-image" className="form-label">
                      Package Image {isEdit && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="service-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setPakageImage(e.target.files[0])}
                    />
                    <ImageDimensionNote type="packages" />
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
                      Short Description
                    </label>
                    <Ckeditor
                      text={shortDescription}
                      setText={(value) => setShortDescription(value)}
                      limit={320}
                    />
                  </div>
                </div>

                {/* Package desciption */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="service-des" className="form-label">
                      Long Description
                    </label>
                    <Ckeditor
                      text={packageDesc}
                      setText={(value) => setPackageDesc(value)}
                    />
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

                            {/* {matchedButton &&
                              matchedButton.name != "Know more" && (
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
                              )} */}
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
                {packageVariantsSingle.length > 0 ? (
                  <input
                    width="400px"
                    value={singleheading}
                    placeholder="Enter single variant name"
                    onChange={(e) => setSingleHeading(e.target.value)}
                  />
                ) : (
                  "Package Single Variant"
                )}
                <button onClick={() => onAddVariant("single")}>+</button>
              </p>
              <Variants
                isEdit={isEdit}
                packageVariants={packageVariantsSingle}
                setPackageVariants={setPackageVariantsSingle}
                type="single"
              />
            </div>

            <div className="card-body">
              <p className="title">
                {packageVariantsCombo.length > 0 ? (
                  <input
                    value={comboHeading}
                    placeholder="Enter combo variant name"
                    onChange={(e) => setComboheading(e.target.value)}
                  />
                ) : (
                  "Package Combo Variant"
                )}
                <button onClick={() => onAddVariant("combo")}>+</button>
              </p>
              <Variants
                isEdit={isEdit}
                packageVariants={packageVariantsCombo}
                setPackageVariants={setPackageVariantsCombo}
                type="combo"
              />
            </div>

            {/* Submit Button */}
            <div className="card-footer border-top">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isLoading}
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
