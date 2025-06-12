import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const Coupon = () => {
  const [formData, setFormData] = useState({
    code: "",
    type: "flat",
    value: "",
    expiry: "",
    partnerId: "",
    commission: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [partners, setPartners] = useState([]);
  const selectedIdRef = useRef(null);

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = ["code", "type", "value", "expiry"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.warning(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }
    setIsLoading(true)
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
    }finally{
      setIsLoading(false)
    }
  };

  const onCancelEdit = () => {
    setFormData({
      code: "",
      type: "flat",
      value: "",
      expiry: "",
      partnerId: "",
      commission: "",
    });
    setSelectedId(null);
    setIsEdit(false);
  };

  const deleteCoupon = async () => {
    try {
      const res = await adminAxios.delete(
        adminApiRoutes.delete_coupon(selectedIdRef.current)
      );
      toast.success(res.data.message);
      fetchCoupons();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchAllPartners();
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
                      onChange={handleInputChange}
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
                      type="number"
                      className="form-control"
                      name="value"
                      placeholder="Enter value"
                      value={formData.value}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Expiry */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Expiry Date*</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Partner  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Select Partner</label>
                    <select
                      className="form-select"
                      name="partnerId"
                      value={formData.partnerId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          partnerId: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select category</option>
                      {partners.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Commission */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Partner Commission (Optional)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="commission"
                      placeholder="Enter commission percentage (0-100)"
                      value={formData.commission}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (Number(value) >= 0 && Number(value) <= 100)
                        ) {
                          handleInputChange(e);
                        }
                      }}
                      min="0"
                      max="100"
                    />
                    {formData.commission > 100 && (
                      <div className="text-danger small mt-1">
                        Commission cannot be more than 100%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer border-top">
              <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Coupons</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Id</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Value</th>
                      <th>Expiry</th>
                      <th>Partner ID</th>
                      <th>Commission</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.length > 0 ? (
                      coupons.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.code}</td>
                          <td>{item?.type}</td>
                          <td>{item?.value}</td>
                          <td>{new Date(item?.expiry).toLocaleDateString()}</td>
                          <td>{item?.partnerId || "-"}</td>
                          <td>
                            {item?.commission ? `${item.commission}%` : "-"}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedId(item.id);
                                  setFormData({
                                    code: item?.code,
                                    type: item?.type,
                                    value: item?.value,
                                    expiry: item?.expiry?.split("T")[0],
                                    partnerId: item?.partnerId || "",
                                    commission: item?.commission || "",
                                  });
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                />
                              </button>

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
                        <td colSpan="8" className="text-center">
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
