import React, { Suspense } from "react";
import PageLoader from "../../../PageLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import AllOrders from "../CompanySettings/Orders";
import AllAppointments from "../CompanySettings/Appointments";

const index = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<AllOrders />} />
        <Route path="appointments" element={<AllAppointments />} />
        <Route path="/" element={<Navigate replace to="orders" />} />
      </Routes>
    </Suspense>
  );
};

export default index;
