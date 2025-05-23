import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAccessToken } from "./store/auth/AuthExtraReducers.jsx";

import "../public/assets/css/app.min.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/vendor.min.css";

import PageLoader from "./components/PageLoader/index.jsx";
import "./index.scss";
import LoginUser from "./components/unauthorized/LoginUser.jsx";
import SignUpUser from "./components/unauthorized/SignupUser.jsx";

const UserRoutes = lazy(() => import("./components/Routes/UserRoutes.jsx"));
const AdminRoutes = lazy(() => import("./components/Routes/AdminRoutes.jsx"));
const ForgotPasswordForm = lazy(() =>
  import("./components/unauthorized/forgotPassword.jsx")
);

const ProtectedRoute = ({ condition, redirectTo = "/LoginUser", children }) => {
  return condition ? children : <Navigate to={redirectTo} replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const { isCheckingToken, isLoggedIn, isAdmin } = useSelector(
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
          <Route path="/admin" element={<LoginUser />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="LoginUser" element={<LoginUser />} />
          <Route path="SignUpUser" element={<SignUpUser />} />
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
            <ProtectedRoute condition={isAdmin} redirectTo="/home">
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
