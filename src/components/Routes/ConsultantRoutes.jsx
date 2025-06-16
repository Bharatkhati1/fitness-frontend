import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "../PageLoader";
import SliderManagement from '../authorized/AdminUI/SliderManagement/SliderManagement';

const ConsultantRoutes = () => {
    const { type = "admin" } = useSelector((state) => state.auth);
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayouts />}>
            <Route index element={<Navigate to="slider-management" replace />} />
            <Route path="slider-management" element={<SliderManagement />} />
            <Route
              path="service-management/*"
              element={<Navigate replace to="service-management/services" />}
            />
            <Route
              path="*"
              element={<Navigate replace to={`/consultant/slider-management`} />}
            />
          </Route>
        </Routes>
      </Suspense>
    );
  };

export default ConsultantRoutes
