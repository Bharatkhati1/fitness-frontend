import { Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "../PageLoader";
import MainLayouts from "../Layouts/MainLayouts";
import { Suspense } from "react";
import Dashboard from "../authorized/AdminUI/PartnerComponents/Dashboard";
import CouponList from "../authorized/AdminUI/PartnerComponents/CouponList";

const PartnerRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="coupons" element={<CouponList />} />
          <Route
            path="*"
            element={<Navigate replace to={`/partner/dashboard`} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PartnerRoutes;
