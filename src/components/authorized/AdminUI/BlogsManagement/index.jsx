import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import BlogsManagement from "./BlogsManagement";
import CategoryManagement from "./CategoryManagement";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="blog" replace />} />
        <Route path="blog" element={<BlogsManagement />} />
        <Route path="category" element={<CategoryManagement />} />
        <Route path="/" element={<Navigate replace to="blog" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
