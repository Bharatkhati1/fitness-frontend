// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import PageLoader from "../PageLoader";
import Home from "../authorized/UserUI/Home/Home";
import AppLayout from "../authorized/UserUI/AppLayout";

import { ROUTES } from "../../utils/constants";

export default function UserRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.USER_HOME} element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/packages" element={<Home />} />
          <Route path="/tools" element={<Home />} />
          <Route path="/testimonial" element={<Home />} />
          <Route path="/blogs" element={<Home />} />
          <Route path="/contact-us" element={<Home />} />
          <Route path="*" element={<Navigate replace to={ROUTES.USER_HOME} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}