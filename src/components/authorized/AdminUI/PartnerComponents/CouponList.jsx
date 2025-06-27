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
              <h4 className="card-title">All Coupons</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Commission</th>
                      <th>Used By</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerCoupons.map((coupon, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{coupon.code}</td>
                        <td>{coupon.type}</td>
                        <td>{coupon.partnerCommission}</td>
                        <td>{coupon?.CouponUsages?.length || 0}</td>
                        <td>{moment(coupon.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                        <td>
                          <Tooltip title="View Usage">
                            <p
                              style={{
                                color: "#1890ff",
                                cursor: "pointer",
                                margin:"0"
                              }}
                              onClick={() => {
                                setSelectedCouponId(coupon?.CouponUsages);
                                setModalOpen(true);
                              }}
                            >
                              Details
                            </p>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
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
