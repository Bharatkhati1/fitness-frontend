import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAccessToken } from "./store/auth/AuthExtraReducers.jsx";

import "../public/assets/css/app.min.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/vendor.min.css";
import "../public/assets/js/vendor.js";

import PageLoader from "./components/PageLoader/index.jsx";
import "./index.scss";
import LoginUser from "./components/unauthorized/LoginUser.jsx";
import SignUpUser from "./components/unauthorized/SignupUser.jsx";

const UserRoutes = lazy(() => import("./components/Routes/UserRoutes.jsx"));
const AdminRoutes = lazy(() => import("./components/Routes/AdminRoutes.jsx"));

const ProtectedRoute = ({ condition, redirectTo = "/login-user", children }) => {
  return condition ? children : <Navigate to={redirectTo} replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const { isCheckingToken, isLoggedIn, adminAccessToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getAccessToken());
  }, [dispatch]);


  if (isCheckingToken) return <PageLoader />;

  if (!isLoggedIn) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin-login" element={<LoginUser />} />
          <Route path="login-user" element={<LoginUser/>} />
          <Route path="sign-up" element={<SignUpUser />} />
          <Route path="/*" element={<UserRoutes />} />
          <Route path="*" element={<Navigate replace to="/*" />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute condition={adminAccessToken?.length>0} redirectTo="/">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default App;
