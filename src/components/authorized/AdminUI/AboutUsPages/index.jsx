import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import TeamManagement from "../TeamManagement/TeamManagement";
import Mission from "../TeamManagement/Mission";
import AboutUs from "../CompanySettings/AboutUs";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="team-management" replace />} />
        <Route path="team-management" element={<TeamManagement />} />
        <Route path="cofounder-message" element={<Mission />} />
        <Route path="story-image" element={<AboutUs />} />
        <Route path="/" element={<Navigate replace to="team-management" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
