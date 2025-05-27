// src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import SliderManagement from "../authorized/AdminUI/SliderManagement/SliderManagement";
import ServiceManagement from "../authorized/AdminUI/ServiceManagement/ServiceManagement";
import ProductManagement from "../authorized/AdminUI/ProductManagement/ProductManagement";
import SuccessStories from "../authorized/AdminUI/SuccessStories/SuccessStories";
import Blogs from "../authorized/AdminUI/BlogsManagement/index";
import { Suspense } from "react";
import PageLoader from "../PageLoader";

export default function AdminRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route index element={<Navigate to="slider-management" replace />} />
          <Route path="slider-management" element={<SliderManagement />} />
          <Route path="service-management/services" element={<ServiceManagement />} />
          <Route path="service-management/packages" element={<ProductManagement />} />
          <Route path="success-stories" element={<SuccessStories />} />
          <Route path="blog-management/*" element={<Blogs />} />
          <Route path="service-management/*" element={<Navigate replace to="service-management/services" />} />
          <Route path="*" element={<Navigate replace to="slider-management" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}