// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import PageLoader from "../PageLoader";
import Home from "../authorized/UserUI/Body/home/Home";
import AppLayout from "../authorized/UserUI/AppLayout";
import Tools from "../authorized/UserUI/Body/tools/Tools";
import Blogs from "../authorized/UserUI/Body/Blogs";
import BlogsDetails from "../authorized/UserUI/Body/BlogsDetails";
import ContactUs from "../authorized/UserUI/Body/ContactUs";
import ServiceDetails from "../authorized/UserUI/Body/ServiceDetails";
import AboutUs from "../authorized/UserUI/Body/AboutUs";
import AllPakages from "../pages/AllPakages";
import Smartkitchen from "../pages/Smartkitchen";
import Testimonial from "../pages/Testimonial";
import PackageDetails from "../pages/Diabetes";
import BookAppoinment from "../pages/BookAppoinment";
import ScrollToTop from "../authorized/UserUI/ScrollToTop";
import AddToBag from "../pages/AddToBag";
import { useSelector } from "react-redux";
import PrivacyPolicy from "../authorized/UserUI/Body/PrivacyPolicy";
import RefundPolicy from "../authorized/UserUI/Body/RefundPolicy";
import NewsAndMedia from "../authorized/UserUI/Body/NewsMedia/NewsAndMedia";
import NewsAndMediaDetails from "../authorized/UserUI/Body/NewsMedia/NewsAndMediaDetails";
import BusinessParthner from "../pages/BusinessParthner";
import NotFound from "../authorized/NotFound";
import Careers from "../pages/Careers";
import Events from "../pages/Events";
import UpcomigDetails from "../pages/UpcomigDetails";
import Innovation from "../pages/Innovation";

export default function UserRoutes() {
  const { userAccessToken } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ condition, redirectTo = "/", children }) => {
    return condition ? children : <Navigate to={redirectTo} replace />;
  };

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogsDetails />} />
            <Route path="/news-media" element={<NewsAndMedia />} />
            <Route path="/news-media/:slug" element={<NewsAndMediaDetails />} />
            <Route path="/bussiness-partners" element={<BusinessParthner />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/service-details/:slug" element={<ServiceDetails />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/packages" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/news-and-media" element={<NewsAndMedia />} />
            <Route path="/package/:slug" element={<PackageDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events-details/:slug" element={<UpcomigDetails />} />
            <Route path="/innovation-details/:slug" element={<UpcomigDetails />} />
            <Route
              path="/experts/:slug/:type/:encodedId"
              element={<BookAppoinment />}
            />
            <Route path="/all-packages" element={<AllPakages />} />
            <Route path="/smart-kitchen" element={<Smartkitchen />} />
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/tools/*" element={<Tools />} />
            <Route path="" element={<Home />} />
            <Route path="/not-found" element={<NotFound/>}/>
            <Route path="*" element={<Navigate replace to="/not-found" />} />

             {/* Protect routes  */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  condition={userAccessToken.length > 0}
                  redirectTo="/"
                >
                  <AddToBag />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
