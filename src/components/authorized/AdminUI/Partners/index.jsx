import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Partners from "./Partners";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route index element={<Navigate to="partners" replace />} />
      <Route path="partners" element={<Partners />} />
      <Route path="category" element={<Categories />} />
      <Route path="/" element={<Navigate replace to="partners" />} />
    </Routes>
  </Suspense>
  )
}

export default index
