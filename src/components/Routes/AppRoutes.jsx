// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../authorized/NotFound";
import MainLayouts from "../Layouts/MainLayouts";
import Dashboard from "../authorized/Dashboard";
import SliderManagement from "../authorized/SliderManagement/SliderManagement";
import ServiceManagement from "../authorized/ServiceManagement/ServiceManagement";
import ProductManagement from "../authorized/ProductManagement/ProductManagement";
import Tools from "../authorized/Tools/index"
import { Suspense } from "react";
import PageLoader from "../PageLoader";

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/slider-management" element={<SliderManagement />} />
          <Route path="/service-management" element={<ServiceManagement />} />
          <Route path="/package-management" element={<ProductManagement />} />
          <Route path="/tools" element={<Tools />} />
        </Route>
        <Route
          path="*"
          element={<Navigate replace to="/slider-management" />}
        />
      </Routes>
    </Suspense>
  );
}
