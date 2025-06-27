import React, { useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state)=> state.auth)
  const [transactionHistory, setTransactionHistory] = useState({});
  const [couponUsage, setCouponUsage] = useState([]);
  const [partnerCoupons, setPartnerCoupons] = useState([]);
  const Cards = [
    {
      name: "Current Balance",
      value: user?.earning,
    },
    {
      name: "Total Commission",
      value: transactionHistory?.totalEarning,
    },
    {
      name: "Total Coupons",
      value: partnerCoupons.length,
    },
    {
      name: "Coupons Used",
      value: couponUsage.length,
    },
  ];

  const fetchTransactionHistory = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.partner_payment_history);
      setTransactionHistory(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getCouponUsage = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_coupon_usage);
      setCouponUsage(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const fetchPartnerCoupons = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_partner_coupon);
      setPartnerCoupons(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
    getCouponUsage();
    fetchPartnerCoupons();
  }, []);
  return (
    <>
      <div class="row">
        <div class="row">
          {Cards.map((card) => (
            <div class="col-md-6">
              <div class="card overflow-hidden">
                <div class="card-body">
                  <div class="row">
                    <div class="col-6">
                      <div class="avatar-md bg-soft-primary rounded">
                        <iconify-icon
                          icon="solar:cart-5-bold-duotone"
                          class="avatar-title fs-32 text-primary"
                        ></iconify-icon>
                      </div>
                    </div>
                    <div class="col-6 text-end">
                      <p class="text-muted mb-0 text-truncate">{card.name}</p>
                      <h3 class="text-dark mt-1 mb-0">{card.value}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Coupon Usage</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Discount</th>
                      <th>Commission</th>
                      <th>User name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {couponUsage.map((info) => (
                      <tr>
                        <td>{info.Coupon.code}</td>
                        <td>{info.type}</td>
                        <td>{info.couponDiscount}</td>
                        <td>{info.partnerCommission}</td>
                        <td>{info.User.name}</td>
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

export default Dashboard;
