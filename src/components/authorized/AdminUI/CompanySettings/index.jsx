import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivacyPolicy from "./Policies/PrivacyPolicy";
import ReturnPolicy from "./Policies/ReturnPolicy";
import ContactDetails from "./ContactDetails/ContactDetails";
import Users from "./Users/Users";
import Careers from "./Career/Careers";
import Innovation from "./innovation";
import AppliedJobs from "./AppliedJobs";
import AllOrders from "./Orders";
import AllAppointments from "./Appointments";
import Testimonials from "./Testimonials";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="privacy-policy" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="orders" element={<AllOrders/>} />
          <Route path="appointments" element={<AllAppointments />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="return-policy" element={<ReturnPolicy />} />
          <Route path="contact-details" element={<ContactDetails />} />
          <Route path="career" element={<Careers />} />
          <Route path="innovation" element={<Innovation />} />
        <Route path="/" element={<Navigate replace to="privacy-policy" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
