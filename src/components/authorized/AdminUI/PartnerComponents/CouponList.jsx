import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { Tooltip } from "antd";
import UsageDetails from "./Popup/UsageDetails";
import moment from "moment";

const CouponList = () => {
  const [partnerCoupons, setPartnerCoupons] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const fetchPartnerCoupons = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_partner_coupon);
      setPartnerCoupons(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchPartnerCoupons();
  }, []);
  return (
    <>
      <UsageDetails
        open={modalOpen}
        setOpen={setModalOpen}
        selectedCouponUsage={selectedCouponId}
      />
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">My Coupons</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>#</th>
                      <th>Coupon Name</th>
                      <th>Coupon Code</th>
                      <th>Discount</th>
                      <th>Usage</th>
                      <th>Associated Package</th>
                      <th>Date</th>
                      <th>Validity</th>
                      <th>Total Earnings</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerCoupons.map((coupon, index) => {
                      const {
                        name,
                        code,
                        type,
                        value,
                        maxUsage,
                        createdAt,
                        startDate,
                        endDate,
                        isActive,
                        CouponUsages,
                      } = coupon;

                      const sum = coupon?.CouponUsages?.reduce(
                        (total, data) =>
                          total + Number(data.partnerCommission || 0),
                        0
                      );

                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{name}</td>
                          <td>{code}</td>
                          <td>
                            {type === "Percentage" ? `${value}%` : `₹${value}`}
                          </td>
                          <td>
                            {CouponUsages?.length}/{maxUsage}
                          </td>
                          <td>
                            {coupon?.CouponPackages?.map(
                              (item) => item.Package.name
                            ).join(", ")}
                          </td>
                          <td>
                            {moment(createdAt).format("DD-MM-YYYY HH:mm")}
                          </td>
                          <td>
                            {startDate && endDate
                              ? `${moment(startDate).format(
                                  "DD/MM/YYYY"
                                )} - ${moment(endDate).format("DD/MM/YYYY")}`
                              : "N/A"}
                          </td>
                          <td>₹{sum || "0.00"}</td>
                          <td>
                            <span
                              className={`badge ${
                                isActive ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <Tooltip title="View Usage">
                              <p
                                style={{
                                  color: "#1890ff",
                                  cursor: "pointer",
                                  margin: "0",
                                }}
                                onClick={() => {
                                  setSelectedCouponId(CouponUsages);
                                  setModalOpen(true);
                                }}
                              >
                                Details
                              </p>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    })}
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

export default CouponList;
