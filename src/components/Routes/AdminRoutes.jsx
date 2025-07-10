// src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import SliderManagement from "../authorized/AdminUI/SliderManagement/index";
import ServiceManagement from "../authorized/AdminUI/ServiceManagement/ServiceManagement";
import PackageManagement from "../authorized/AdminUI/PackageManagement/PackageManagement";
import SuccessStories from "../authorized/AdminUI/SuccessStories/SuccessStories";
import Blogs from "../authorized/AdminUI/BlogsManagement/index";
import SmartKitchen from "../authorized/AdminUI/SmartKitchen/index";
import { Suspense } from "react";
import PageLoader from "../PageLoader";
import TeamManagement from "../authorized/AdminUI/TeamManagement/index";
import Consultants from "../authorized/AdminUI/Consultants/index";
import CreateUpdatePackage from "../authorized/AdminUI/PackageManagement/CreateUpdatePackage";
import CompanySetting from "../authorized/AdminUI/CompanySettings/index";
import Innovation from "../authorized/AdminUI/Innovation/index";
import NewsAndMedia from "../authorized/AdminUI/NewsAndMedia/index";
import PartnersManagement from "../authorized/AdminUI/Partners";
import Careers from "../authorized/AdminUI/Careers/index";
import EventManagement from "../authorized/AdminUI/Events/index";
import Coupon from "../authorized/AdminUI/Coupons/Coupon";
import Inquiry from "../authorized/AdminUI/Inquiry/Inquiry";
import Profile from "../authorized/AdminUI/Profile/profile";
import PaymentHistory from "../authorized/AdminUI/CompanySettings/PaymentHistory";
import Testimonials from "../authorized/AdminUI/TestimonialManagement/index";
import AboutUs from "../authorized/AdminUI/AboutUsPages/index";
import Users from "../authorized/AdminUI/CompanySettings/Users/Users";
import OrderManagement from "../authorized/AdminUI/OrderManagement/index";

export default function AdminRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route index element={<Navigate to="slider-management" replace />} />
          <Route path="slider-management/*" element={<SliderManagement />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="service-management/services"
            element={<ServiceManagement />}
          />
          <Route
            path="service-management/packages"
            element={<PackageManagement />}
          />
          <Route
            path="service-management/create-update-package"
            element={<CreateUpdatePackage />}
          />
          <Route path="about-us-page/*" element={<AboutUs />} />
          <Route path="team-management/*" element={<TeamManagement />} />
          <Route path="blog-management/*" element={<Blogs />} />
          <Route path="smart-kitchen/*" element={<SmartKitchen />} />
          <Route path="consultants/*" element={<Consultants />} />
          <Route path="all-users" element={<Users />} />
          <Route path="order-management/*" element={<OrderManagement />} />
          <Route path="innovation/*" element={<Innovation />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="testimonials-management/*" element={<Testimonials />} />
          <Route path="company-settings/*" element={<CompanySetting />} />
          <Route path="news-media/*" element={<NewsAndMedia />} />
          <Route path="event-management/*" element={<EventManagement />} />
          <Route path="partner-management/*" element={<PartnersManagement />} />
          <Route path="career-page/*" element={<Careers />} />
          <Route path="coupons" element={<Coupon />} />
          <Route path="inquiries" element={<Inquiry />} />
          <Route
            path="service-management/*"
            element={<Navigate replace to="service-management/services" />}
          />
          <Route
            path="*"
            element={<Navigate replace to={`/admin/slider-management`} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
