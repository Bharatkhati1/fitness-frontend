import { Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "../PageLoader";
import MainLayouts from "../Layouts/MainLayouts";
import { Suspense } from "react";
import Dashboard from "../authorized/AdminUI/PartnerComponents/Dashboard";
import CouponList from "../authorized/AdminUI/PartnerComponents/CouponList";
import Ledger from "../authorized/AdminUI/PartnerComponents/Ledger";
import Profile from "../authorized/AdminUI/Profile/profile";

const PartnerRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="coupons" element={<CouponList />} />
          <Route path="ledger" element={<Ledger />} />
          <Route
            path="*"
            element={<Navigate replace to={`/b2b-partner/dashboard`} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PartnerRoutes;
