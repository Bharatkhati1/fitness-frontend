import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import Recepies from "./Recepies";
import Categories from "./Categories";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="recepies" replace />} />
        <Route path="recepies" element={<Recepies />} />
        <Route path="category" element={<Categories />} />
        <Route path="/" element={<Navigate replace to="recepies" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
