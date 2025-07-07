import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import SliderManagement from "./SliderManagement";
import WhyUsImage from "./WhyUsImage";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="manage" replace />} />
        <Route path="manage" element={<SliderManagement />} />
        <Route path="/" element={<Navigate replace to="manage" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
