import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import Testimonials from "../CompanySettings/Testimonials";
import SuccessStories from "../SuccessStories/SuccessStories";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="testimonials" replace />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="success-stories" element={<SuccessStories />} />
        <Route path="/" element={<Navigate replace to="testimonials" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
