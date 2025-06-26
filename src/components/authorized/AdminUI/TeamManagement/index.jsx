import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import TeamManagement from "./TeamManagement";
import Mission from "./Mission";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="recepies" replace />} />
        <Route path="manage" element={<TeamManagement />} />
        <Route path="message" element={<Mission />} />
        <Route path="/" element={<Navigate replace to="manage" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
