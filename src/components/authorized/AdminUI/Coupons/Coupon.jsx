import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Select, Tabs, Tooltip } from "antd";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const Coupon = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "flat",
    value: "",
    packageId: [],
    partnerId: "",
    partnerCommission: "",
    numberOfUsage: 0,
    maxUsage: "",
    isActiveDates: true,
    startDate: "",
    endDate: "",
    isActive: true,
    isGlobal: true,
  });
  const items = [
    {
      key: "global",
      label: "Global Coupons",
    },
    {
      key: "partner",
      label: "Partner Coupons",
    },
  ];
  const [isEdit, setIsEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("global");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [partners, setPartners] = useState([]);
  const [packages, setPackages] = useState([]);
  const selectedIdRef = useRef(null);
  const valueDefault = useRef("");
  const partnerCommissionDefault = useRef("");
  const maxUsageDefault = useRef("");

  const fetchCoupons = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_coupons);
      setCoupons(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch coupons.");
    }
  };

  const fetchAllPartners = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_partners);
      setPartners(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch partners");
    }
  };

  const fetchAllPackages = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_package);
      setPackages(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch packages");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageSelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, packageId: [...prev.packageId, value] };
      } else {
        return {
          ...prev,
          packageId: prev.packageId.filter((id) => id !== value),
        };
      }
    });
  };

  const handleSubmit = async () => {
    const requiredFields = ["name", "code", "type", "value"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.warning(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.warning("End date must be after start date");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} coupon...`
    );
    try {
      const url = isEdit
        ? adminApiRoutes.update_coupon(selectedId)
        : adminApiRoutes.create_coupon;

      const method = isEdit ? "put" : "post";
      const res = await adminAxios[method](url, formData);

      toast.update(toastId, {
        render: res.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      onCancelEdit();
      fetchCoupons();
    } catch (error) {
      toast.update(toastId, {
        render: `Failed to ${isEdit ? "update" : "create"} coupon. ${
          error?.response?.data?.message || ""
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
    setFormData({
      name: "",
      code: "",
      type: "flat",
      value: "",
      packageId: [],
      partnerId: "",
      partnerCommission: "",
      numberOfUsage: 0,
      maxUsage: "",
      isActiveDates: true,
      startDate: "",
      endDate: "",
      isActive: false,
    });
    setSelectedId(null);
    setIsEdit(false);
  };

  const deleteCoupon = async () => {
    try {
      const idToDelete = selectedIdRef.current;
      const res = await adminAxios.delete(
        adminApiRoutes.delete_coupon(idToDelete)
      );
      toast.success(res.data.message);
      fetchCoupons();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const onChange = (key) => {
    setActiveTab(key);
    setSelectedPartner("");
  };

  const filteredCoupons = coupons.filter((coupon) => {
    if (activeTab === "global") {
      return !coupon.partnerId;
    } else if (activeTab === "partner") {
      if (selectedPartner) {
        return coupon.partnerId === parseInt(selectedPartner);
      }
      return coupon.partnerId;
    }
    return true;
  });

  useEffect(() => {
    fetchCoupons();
    fetchAllPartners();
    fetchAllPackages();
  }, []);

  return (
    <>
      {/* Form Section */}
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit ? "editing" : ""}`}>
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">
                {isEdit ? "Edit Coupon" : "Create Coupon"}
              </h4>
              {isEdit && <button onClick={onCancelEdit}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Name */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Coupon Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter coupon name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Code */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Coupon Code*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      placeholder="Enter coupon code"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          code: e.target.value.toUpperCase(), // convert to uppercase
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Type*</label>
                    <select
                      className="form-select"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="flat">Flat</option>
                      <option value="percent">Percentage</option>
                    </select>
                  </div>
                </div>

                {/* Value */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Value*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="value"
                      placeholder="Enter value"
                      value={formData.value}
                      pattern="[0-9]*"
                      onInput={(e) => {
                        const input = e.target.value;
                        const regex = /^[0-9]*$/;
                        if (regex.test(input)) {
                          if (
                            (formData.type === "percent" &&
                              (input === "" ||
                                (input.length <= 2 &&
                                  parseInt(input) <= 100))) ||
                            formData.type === "flat"
                          ) {
                            valueDefault.current = input;
                            handleInputChange({
                              target: { name: "value", value: input },
                            });
                          } else {
                            e.target.value = valueDefault.current;
                          }
                        } else {
                          e.target.value = valueDefault.current;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Packages */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label">Applicable Packages</label>
                    <div className="d-flex flex-wrap gap-3">
                      {packages.map((pkg) => (
                        <div key={pkg.id} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`package-${pkg.id}`}
                            value={pkg.id}
                            checked={formData.packageId.includes(
                              pkg.id.toString()
                            )}
                            onChange={handlePackageSelection}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`package-${pkg.id}`}
                          >
                            {pkg.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Global Checkbox */}
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Associate the Coupon with B2B Partner
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="is-global"
                        name="isGlobal"
                        checked={!formData.isGlobal}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isGlobal: e.target.checked ? false : true,
                            partnerId: "",
                            partnerCommission: "",
                          }))
                        }
                      />
                      <label className="form-check-label" htmlFor="is-global">
                        Select if this coupon is intended for a specific B2B
                        partner
                      </label>
                    </div>
                    {!formData.isGlobal && (
                      <h4
                        className="card-header"
                        style={{ height: "1px", padding: "0px" }}
                      ></h4>
                    )}
                  </div>
                </div>

                {!formData.isGlobal && (
                  <>
                    {/* Select Partner */}
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Select Partner</label>
                        <select
                          className="form-select"
                          name="partnerId"
                          value={formData.partnerId}
                          onChange={handleInputChange}
                        >
                          <option value="">Select partner</option>
                          {partners.map((partner) => (
                            <option key={partner.id} value={partner.id}>
                              {partner.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Partner Commission (%)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="partnerCommission"
                          placeholder="Enter commission percentage (0-100)"
                          value={formData.partnerCommission}
                          onInput={(e) => {
                            const input = e.target.value;
                            const regex = /^[0-9]*$/;
                            if (
                              regex.test(input) &&
                              (input === "" ||
                                (parseInt(input, 10) >= 0 &&
                                  parseInt(input, 10) <= 100))
                            ) {
                              partnerCommissionDefault.current = input;
                              handleInputChange({
                                target: {
                                  name: "partnerCommission",
                                  value: input,
                                },
                              });
                            } else {
                              e.target.value = partnerCommissionDefault.current;
                            }
                          }}
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Max Usage */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Max Usage</label>
                    <input
                      type="number"
                      className="form-control"
                      name="maxUsage"
                      placeholder="Enter maximum usage count"
                      value={formData.maxUsage}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min="1"
                      onInput={(e) => {
                        const input = e.target.value;
                        const regex = /^[0-9]*$/;
                        if (
                          regex.test(input) &&
                          (input === "" || parseInt(input, 10) >= 1)
                        ) {
                          maxUsageDefault.current = input;
                          handleInputChange({
                            target: { name: "maxUsage", value: input },
                          });
                        } else {
                          e.target.value = maxUsageDefault.current;
                        }
                      }}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Active Dates Toggle */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Use Active Dates</label>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        name="isActiveDates"
                        checked={formData.isActiveDates}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isActiveDates: e.target.checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Start Date */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Start Date*</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      disabled={!formData.isActiveDates}
                      min={new Date().toISOString().split("T")[0]} // today's date
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">End Date*</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      disabled={!formData.isActiveDates}
                      min={
                        formData.startDate ||
                        new Date().toISOString().split("T")[0]
                      } // not before start date
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <label className="form-label d-block">Status</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        id="consultant-status-active"
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={true}
                        checked={formData.isActive == true}
                        onChange={() =>
                          setFormData((prev) => ({ ...prev, isActive: true }))
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="consultant-status-active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="consultant-status-inactive"
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={false}
                        checked={formData.isActive == false}
                        onChange={() =>
                          setFormData((prev) => ({ ...prev, isActive: false }))
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="consultant-status-inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer border-top">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row mt-4">
        <div className="col-xl-12">
          <div
            className="d-flex justify-content-between "
            style={{ alignItems: "center" }}
          >
            <Tabs
              activeKey={activeTab}
              items={items}
              onChange={onChange}
              className="px-3 pt-2"
            />
            {activeTab == "partner" && (
              <select
                className="select-partner-coupon"
                name="partnerId"
                value={selectedPartner}
                onChange={(e) => setSelectedPartner(e.target.value)}
              >
                <option value="">All Partners</option>
                {partners.map((partner) => (
                  <option key={partner.id} value={partner.id}>
                    {partner.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Coupons List</h4>
              <div>
                {activeTab === "global" && (
                  <span className="text-muted">Showing global coupons</span>
                )}
                {activeTab === "partner" && selectedPartner && (
                  <span className="text-muted">
                    Showing coupons for selected partner
                  </span>
                )}
                {activeTab === "partner" && !selectedPartner && (
                  <span className="text-muted">
                    Showing all partner coupons
                  </span>
                )}
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Value</th>
                      <th>Packages</th>
                      {activeTab != "global" && <th>Partner</th>}
                      {activeTab != "global" && <th>Commission</th>}
                      <th>Usage</th>
                      <th>Dates</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoupons.length > 0 ? (
                      filteredCoupons.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.name}</td>
                          <td>{item?.code}</td>
                          <td>{item?.type}</td>
                          <td>
                            {item?.value}
                            {item?.type === "percent" ? "%" : ""}
                          </td>
                          <td>
                            <Tooltip
                              title={
                                <ul
                                  style={{
                                    margin: 0,
                                    padding: 0,
                                    listStyle: "none",
                                  }}
                                >
                                  {(item?.CouponPackages || []).map(
                                    (data, idx) => (
                                      <li
                                        key={idx}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          marginBottom: 2,
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            marginRight: 6,
                                          }}
                                        >
                                          •
                                        </span>
                                        <span>{data.Package?.name}</span>
                                      </li>
                                    )
                                  )}
                                  {(!item?.CouponPackages ||
                                    item?.CouponPackages.length === 0) && (
                                    <li>No packages</li>
                                  )}
                                </ul>
                              }
                            >
                              <span
                                style={{
                                  marginLeft: 6,
                                  cursor: "pointer",
                                  display: "inline-block",
                                  color: "#0d6efd",
                                  fontWeight: "bold",
                                  fontSize: "0.8em",
                                  border: "1px solid #0d6efd",
                                  borderRadius: "50%",
                                  width: 15,
                                  height: 16,
                                  textAlign: "center",
                                  lineHeight: "16px",
                                }}
                              >
                                i
                              </span>
                            </Tooltip>
                          </td>
                          {activeTab != "global" && (
                            <td>{item?.Partner?.name || "-"}</td>
                          )}
                          {activeTab != "global" && (
                            <td>
                              {item?.partnerCommission
                                ? `${item.partnerCommission}%`
                                : "-"}
                            </td>
                          )}
                          <td>
                            {item?.usageCount || 0}/{item?.maxUsage || "∞"}
                          </td>
                          <td>
                            {new Date(item?.startDate).toLocaleDateString()} -{" "}
                            {new Date(item?.endDate).toLocaleDateString()}
                          </td>
                          <td>
                            {" "}
                            <span
                              className={`badge ${
                                item.isActive == "1"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {item.isActive == "1" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {new Date(item.startDate) > new Date() && (
                                <button
                                  className="btn btn-soft-primary btn-sm"
                                  onClick={() => {
                                    window.scrollTo(0, 0);
                                    setIsEdit(true);
                                    setSelectedId(item.id);
                                    setFormData({
                                      name: item?.name,
                                      code: item?.code,
                                      type: item?.type,
                                      value: item?.value,
                                      packageId:
                                        item?.CouponPackages?.map(
                                          (data) => `${data.packageId}`
                                        ) || [],
                                      partnerId: item?.partnerId || "",
                                      partnerCommission:
                                        item?.partnerCommission || "",
                                      numberOfUsage: item?.numberOfUsage || 0,
                                      maxUsage: item?.maxUsage || "",
                                      isActiveDates:
                                        item?.isActiveDates !== false,
                                      startDate: item?.startDate?.split("T")[0],
                                      endDate: item?.endDate?.split("T")[0],
                                      isActive: item?.isActive,
                                    });
                                  }}
                                >
                                  <iconify-icon
                                    icon="solar:pen-2-broken"
                                    class="align-middle fs-18"
                                  />
                                </button>
                              )}

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this coupon?"
                                title="Delete Coupon"
                                onOk={deleteCoupon}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
                                    onClick={() =>
                                      (selectedIdRef.current = item.id)
                                    }
                                  />
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">
                          No coupons found.
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

export default Coupon;
