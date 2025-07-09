import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import Manage from "./Manage";
import Category from "./Category";
import Innovation from "../CompanySettings/innovation";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="manage" replace />} />
        <Route path="manage" element={<Manage />} />
        <Route path="category" element={<Category />} />
        <Route path="header-image" element={<Innovation />} />
        <Route path="/" element={<Navigate replace to="manage" />} />
      </Routes>
    </Suspense>
  )
}

export default index
