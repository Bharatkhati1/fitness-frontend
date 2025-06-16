// src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import SliderManagement from "../authorized/AdminUI/SliderManagement/SliderManagement";
import ServiceManagement from "../authorized/AdminUI/ServiceManagement/ServiceManagement";
import PackageManagement from "../authorized/AdminUI/PackageManagement/PackageManagement";
import SuccessStories from "../authorized/AdminUI/SuccessStories/SuccessStories";
import Blogs from "../authorized/AdminUI/BlogsManagement/index";
import SmartKitchen from "../authorized/AdminUI/SmartKitchen/index"
import { Suspense } from "react";
import PageLoader from "../PageLoader";
import TeamManagement from "../authorized/AdminUI/TeamManagement/TeamManagement";
import Consultants from "../authorized/AdminUI/Consultants/index";
import CreateUpdatePackage from "../authorized/AdminUI/PackageManagement/CreateUpdatePackage";
import CompanySetting from "../authorized/AdminUI/CompanySettings/index"
import Innovation from "../authorized/AdminUI/Innovation/index"
import NewsAndMedia from "../authorized/AdminUI/NewsAndMedia/index"
import InquiresMain from "../authorized/AdminUI/Inquiry";
import PartnersManagement from "../authorized/AdminUI/Partners";
import Careers from "../authorized/AdminUI/Careers/Careers";
import EventManagement from "../authorized/AdminUI/Events/index"
import Coupon from "../authorized/AdminUI/Coupons/Coupon";
import { useSelector } from "react-redux";

export default function AdminRoutes() {
  const { type="admin" } = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route index element={<Navigate to="slider-management" replace />} />
          <Route path="slider-management" element={<SliderManagement />} />
          <Route path="service-management/services" element={<ServiceManagement />} />
          <Route path="service-management/packages" element={<PackageManagement />} />
          <Route path="service-management/create-update-package" element={<CreateUpdatePackage />} />
          <Route path="success-stories" element={<SuccessStories />} />
          <Route path="team-management" element={<TeamManagement />} />
          <Route path="blog-management/*" element={<Blogs />} />
          <Route path="smart-kitchen/*" element={<SmartKitchen />} />
          <Route path="consultants/*" element={<Consultants />} />
          <Route path="innovation/*" element={<Innovation />} />
          <Route path="company-settings/*" element={<CompanySetting />} />
          <Route path="news-media/*" element={<NewsAndMedia />} />
          <Route path="event-management/*" element={<EventManagement />} />
          <Route path="partner-management/*" element={<PartnersManagement />} />
          <Route path="careers" element={<Careers />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="inquiries/*" element={<InquiresMain/>} />
          <Route path="service-management/*" element={<Navigate replace to="service-management/services" />} />
          <Route path="*" element={<Navigate replace to={`/${type}/slider-management`} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}