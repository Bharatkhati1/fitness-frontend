// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import SliderManagement from "../authorized/AdminUI/SliderManagement/SliderManagement";
import ServiceManagement from "../authorized/AdminUI/ServiceManagement/ServiceManagement";
import ProductManagement from "../authorized/AdminUI/ProductManagement/ProductManagement";
import Tools from "../authorized/AdminUI/Tools/index";
import { Suspense } from "react";
import PageLoader from "../PageLoader";
import SuccessStories from "../authorized/AdminUI/SuccessStories/SuccessStories";

export default function AdminRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route index element={<Navigate to="slider-management" replace />} />
          <Route path="slider-management" element={<SliderManagement />} />
          <Route path="service-management" element={<ServiceManagement />} />
          <Route path="package-management" element={<ProductManagement />} />
          <Route path="success-stories" element={<SuccessStories />} />
          <Route path="*" element={<Navigate replace to="slider-management" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

