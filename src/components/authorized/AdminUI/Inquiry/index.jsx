import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import Inquiry from "./Inquiry";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route index element={<Navigate to="community" replace />} />
      <Route path="community" element={<Inquiry />} />
      <Route path="inquiry" element={<Inquiry />} />
      <Route path="/" element={<Navigate replace to="community" />} />
    </Routes>
  </Suspense>
  )
}

export default index
