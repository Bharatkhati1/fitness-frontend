import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import NewsAndMediaManagemnet from "./NewsAndMediaManagemnet";
import NewsAndManagementCategories from "./NewsAndManagementCategories";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="manage" replace />} />
        <Route path="manage" element={<NewsAndMediaManagemnet />} />
        <Route path="category" element={<NewsAndManagementCategories />} />
        <Route path="/" element={<Navigate replace to="manage" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
