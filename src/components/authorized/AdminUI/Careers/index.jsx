import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import CareersCompanySetting from "../CompanySettings/Career/Careers";
import Careers from "./Careers";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="page-content" replace />} />
        <Route path="page-content" element={<CareersCompanySetting />} />
        <Route path="manage-jobs" element={<Careers />} />
        <Route path="/" element={<Navigate replace to="page-content" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
