import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import Consultants from "./Consultants";
import ConsultantLeaves from "./ConsultantLeaves";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route index element={<Navigate to="manage" replace />} />
      <Route path="manage" element={<Consultants />} />
      <Route path="leaves" element={<ConsultantLeaves />} />
      <Route path="/" element={<Navigate replace to="manage" />} />
    </Routes>
  </Suspense>
  )
}

export default index
