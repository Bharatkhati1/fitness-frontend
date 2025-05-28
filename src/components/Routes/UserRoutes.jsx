// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import PageLoader from "../PageLoader";
import Home from "../authorized/UserUI/Body/home/Home";
import AppLayout from "../authorized/UserUI/AppLayout";
import Tools from "../authorized/UserUI/Body/tools/Tools";
import Blogs from "../pages/Blogs";
import BlogDeatils from "../pages/BlogDeatils";
import ContactUs from "../pages/ContactUs";
import ServiceDetails from "../pages/ServiceDetails";
import AboutUs from "../pages/AboutUs";



export default function UserRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-deatils" element={<BlogDeatils />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/service-details" element={<ServiceDetails />} />
          <Route path="/about-us" element={<AboutUs />}  />
          <Route path="/packages" element={<Home />} />
          <Route path="/tools/*" element={<Tools />} />
          <Route path="/testimonial" element={<Home />} />
          <Route path="" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}