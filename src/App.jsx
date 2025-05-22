import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAccessToken } from "./store/auth/AuthExtraReducers.jsx";

import "../public/assets/css/app.min.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/vendor.min.css";

import PageLoader from "./components/PageLoader/index.jsx";
import "./index.scss";

const UserRoutes = lazy(() => import("./components/Routes/UserRoutes.jsx"));
const AdminRoutes = lazy(() => import("./components/Routes/AdminRoutes.jsx"));
const Login = lazy(() => import("./components/unauthorized/login.jsx"));
const Signup = lazy(() => import("./components/unauthorized/Signup.jsx"));
const ForgotPasswordForm = lazy(() =>
  import("./components/unauthorized/forgotPassword.jsx")
);


const ProtectedRoute = ({ condition, redirectTo = "/login", children }) => {
  return condition ? children : <Navigate to={redirectTo} replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const { isCheckingToken, isLoggedIn, isAdmin } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAccessToken());
  }, [dispatch]);

  if (isCheckingToken) return <PageLoader />;

  if (!isLoggedIn) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
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