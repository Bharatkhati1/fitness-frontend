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
const UserRoutes = lazy(() =>
  import("./components/Routes/UserRoutes.jsx")
);
const AdminRoutes = lazy(() =>
  import("./components/Routes/AdminRoutes.jsx")
);
const ForgotPasswordForm = lazy(() =>
  import("./components/unauthorized/forgotPassword.jsx")
);

const ProtectedRoute = ({ condition, redirectTo, children }) => {
  return condition ? children : <Navigate to={redirectTo} replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const { isCheckingToken, type, isLoggedIn, userAccessToken } = useSelector(
    (state) => state.auth
  );
  const { pathname } = useLocation();

  const isAdmin =
    pathname.includes("/admin") ||
    pathname.includes("/b2b-partner") ||
    pathname.includes("/service-provider");

  const [isAdminLogined, setIsAdminLogined] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const getUserTypeFromPath = (pathname) => {
    if (pathname.includes("/admin")) return "admin";
    if (pathname.includes("/b2b-partner")) return "partner";
    if (pathname.includes("/service-provider")) return "consultant";
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
    let userType;
    if (pathname.includes("/admin")) {
      userType = "admin";
    } else if (pathname.includes("/b2b-partner")) {
      userType = "partner";
    } else if (pathname.includes("/service-provider")) {
      userType = "consultant";
    } else {
      userType = "user";
    }
    dispatch(getAccessToken(isAdmin, userType));
  }, [dispatch, type, isAdmin]);

  useEffect(() => {
    setIsAdminLogined(localStorage.getItem("isAdmin") === "true");
  }, [isCheckingToken]);

  if (isCheckingToken) return <PageLoader />;

  if (!isLoggedIn) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
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
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/SignUpUser" element={<SignUpUser />} />
          <Route
            path="/*"
            element={
              isAdmin ? (
                <Navigate
                  to={getLoginPathForUserType(getUserTypeFromPath(pathname))}
                  replace
                />
              ) : (
                <UserRoutes />
              )
            }
          />
          <Route path="*" element={<Navigate replace to="/*" />} />
          <Route path="SiteMap" element={<SiteMap />} />
          <Route
            path="DiabetesHealthPakages"
            element={<DiabetesHealthPakages />}
          />
          <Route path="Testimonial" element={<Testimonial />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
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

        {userAccessToken.length === 0 && (
          <Route path="/login-user" element={<LoginUser />} />
        )}

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

        <Route
          path="/*"
          element={
            isAdmin ? (
              <Navigate
                to={getLoginPathForUserType(getUserTypeFromPath(pathname))}
                replace
              />
            ) : (
              <UserRoutes />
            )
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
