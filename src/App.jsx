import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getAccessToken } from "./store/auth/AuthExtraReducers.jsx";

import "../public/assets/css/app.min.css";
import "../public/assets/css/custom.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/vendor.min.css";
import "../public/assets/js/vendor.js";
import "./index.scss";

import PageLoader from "./components/PageLoader/index.jsx";
import LoginUser from "./components/unauthorized/LoginUser.jsx";
import SignUpUser from "./components/unauthorized/SignupUser.jsx";
import AdminLogin from "./components/unauthorized/AdminLogin.jsx";
import DiabetesHealthPakages from "./components/pages/DiabetesHealthPakages.jsx";
import Testimonial from "./components/pages/Testimonial.jsx";
import SiteMap from "./components/pages/SiteMap.jsx";

const ConsultantRoutes = lazy(() =>
  import("./components/Routes/ConsultantRoutes.jsx")
);
const PartnerRoutes = lazy(() =>
  import("./components/Routes/PartnerRoutes.jsx")
);
const UserRoutes = lazy(() => import("./components/Routes/UserRoutes.jsx"));
const AdminRoutes = lazy(() => import("./components/Routes/AdminRoutes.jsx"));
const ForgotPasswordForm = lazy(() =>
  import("./components/unauthorized/forgotPassword.jsx")
);

const ProtectedRoute = ({ condition, redirectTo, children }) => {
  return condition ? children : <Navigate to={redirectTo} replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.auth.type);
  const isCheckingToken = useSelector((state) => state.auth.isCheckingToken);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { pathname } = useLocation();

  const isAdmin =
    pathname.includes("/admin") ||
    pathname.includes("/b2b-partner") ||
    pathname.includes("/service-provider");

  const [isAdminLogined, setIsAdminLogined] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const getUserTypeFromPath = (path) => {
    if (path.includes("/admin")) return "admin";
    if (path.includes("/b2b-partner")) return "partner";
    if (path.includes("/service-provider")) return "consultant";
    return "user";
  };

  const getLoginPathForUserType = (type) => {
    switch (type) {
      case "admin":
        return "/admin";
      case "partner":
        return "/b2b-partner";
      case "consultant":
        return "/service-provider";
      default:
        return "/login-user";
    }
  };

  useEffect(() => {
    const userType = getUserTypeFromPath(pathname);
    dispatch(getAccessToken(isAdmin, userType));
  }, [dispatch, type, isAdmin]);

  useEffect(() => {
    setIsAdminLogined(localStorage.getItem("isAdmin") === "true");
  }, [isCheckingToken, isAdmin]);

  // if (isCheckingToken) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Shared Public Routes */}
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/SignUpUser" element={<SignUpUser />} />
        <Route path="/SiteMap" element={<SiteMap />} />
        <Route
          path="/DiabetesHealthPakages"
          element={<DiabetesHealthPakages />}
        />
        <Route path="/Testimonial" element={<Testimonial />} />

        {/* Login Pages for Admin/Partner/Consultant */}
        <Route
          path="/admin"
          element={<AdminLogin type="admin" route="admin" />}
        />
        <Route
          path="/b2b-partner"
          element={<AdminLogin type="partner" route="b2b-partner" />}
        />
        <Route
          path="/service-provider"
          element={<AdminLogin type="consultant" route="service-provider" />}
        />

        {/* Protected Admin Routes */}
        {pathname.includes("/admin") && (
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute condition={isAdminLogined} redirectTo="/admin">
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
        )}

        {/* Protected Partner Routes */}
        {pathname.includes("/b2b-partner") && (
          <Route
            path="/b2b-partner/*"
            element={
              <ProtectedRoute
                condition={isAdminLogined}
                redirectTo="/b2b-partner"
              >
                <PartnerRoutes />
              </ProtectedRoute>
            }
          />
        )}

        {/* Protected Consultant Routes */}
        {pathname.includes("/service-provider") && (
          <Route
            path="/service-provider/*"
            element={
              <ProtectedRoute
                condition={isAdminLogined}
                redirectTo="/service-provider"
              >
                <ConsultantRoutes />
              </ProtectedRoute>
            }
          />
        )}

        {/* Default Catch-All Routing */}
        <Route
          path="/*"
          element={
            !isLoggedIn ? (
              isAdmin ? (
                <Navigate
                  to={getLoginPathForUserType(getUserTypeFromPath(pathname))}
                  replace
                />
              ) : (
                <UserRoutes />
              )
            ) : isAdmin ? (
              <Navigate
                to={getLoginPathForUserType(getUserTypeFromPath(pathname))}
                replace
              />
            ) : (
              <UserRoutes />
            )
          }
        />

        <Route path="*" element={<Navigate to="/*" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
