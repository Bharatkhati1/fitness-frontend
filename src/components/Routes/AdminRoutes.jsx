// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../authorized/NotFound";
import MainLayouts from "../Layouts/MainLayouts";
import Dashboard from "../authorized/AdminUI/Dashboard";
import SliderManagement from "../authorized/AdminUI/SliderManagement/SliderManagement";
import ServiceManagement from "../authorized/AdminUI/ServiceManagement/ServiceManagement";
import ProductManagement from "../authorized/AdminUI/ProductManagement/ProductManagement";
import Tools from "../authorized/AdminUI/Tools/index";
import { Suspense } from "react";
import PageLoader from "../PageLoader";

export default function AdminRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayouts />}>
          {/* Redirect from /admin to /admin/slider-management */}
          <Route index element={<Navigate to="slider-management" replace />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="slider-management" element={<SliderManagement />} />
          <Route path="service-management" element={<ServiceManagement />} />
          <Route path="package-management" element={<ProductManagement />} />
          <Route path="tools" element={<Tools />} />
          
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate replace to="slider-management" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

