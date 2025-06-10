import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivacyPolicy from "./Policies/PrivacyPolicy";
import ReturnPolicy from "./Policies/ReturnPolicy";
import ContactDetails from "./ContactDetails/ContactDetails";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="privacy-policy" replace />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="return-policy" element={<ReturnPolicy />} />
          <Route path="contact-details" element={<ContactDetails />} />
        <Route path="/" element={<Navigate replace to="privacy-policy" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
