import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "../PageLoader";
import Dashboard from '../authorized/AdminUI/ConsultantComponents/Dashboard';
import Appointments from '../authorized/AdminUI/ConsultantComponents/Appointments';
import MainLayouts from '../Layouts/MainLayouts';
import Ledger from '../authorized/AdminUI/ConsultantComponents/Ledger';
import Profile from '../authorized/AdminUI/Profile/profile';

const ConsultantRoutes = () => {
    return (
      <Suspense fallback={<PageLoader />}>
       <Routes>
        <Route element={<MainLayouts />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="appointment" element={<Appointments />} />
          <Route path="ledger" element={<Ledger />} />
          <Route
            path="*"
            element={<Navigate replace to={`/service-provider/dashboard`} />}
          />
        </Route>
      </Routes>
      </Suspense>
    );
  };

export default ConsultantRoutes
