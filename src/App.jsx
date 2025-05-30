import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getAccessToken } from "./store/auth/AuthExtraReducers.jsx";

import "../public/assets/css/app.min.css";
import "../public/assets/css/custom.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/vendor.min.css";
import "../public/assets/js/vendor.js";

import PageLoader from "./components/PageLoader/index.jsx";
import "./index.scss";
import LoginUser from "./components/unauthorized/LoginUser.jsx";
import SignUpUser from "./components/unauthorized/SignupUser.jsx";
import AdminLogin from "./components/unauthorized/AdminLogin.jsx";
import AboutUs from "./components/pages/AboutUs.jsx";
import Blogs from "./components/pages/Blogs.jsx";
import BlogDeatils from "./components/pages/BlogDeatils.jsx";
import ContactUs from "./components/pages/ContactUs.jsx";
import ServiceDetails from "./components/pages/ServiceDetails.jsx";
import AllPakages from "./components/pages/AllPakages.jsx";
import Smartkitchen from "./components/pages/Smartkitchen.jsx";
import DiabetesHealthPakages from "./components/pages/DiabetesHealthPakages.jsx";
import BookAppoinment from "./components/pages/BookAppoinment.jsx";
import BookAppoinmentdate from "./components/pages/BookAppoinmentdate.jsx";
import Testimonial from "./components/pages/Testimonial.jsx";
import PackageDetails from "./components/pages/Diabetes.jsx";

const UserRoutes = lazy(() => import("./components/Routes/UserRoutes.jsx"));
const AdminRoutes = lazy(() => import("./components/Routes/AdminRoutes.jsx"));
const ForgotPasswordForm = lazy(() =>
  import("./components/unauthorized/forgotPassword.jsx")
);

const ProtectedRoute = ({
  condition,
  redirectTo = "/login-user",
  children,
}) => {
  return condition ? children : <Navigate to={redirectTo} replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const {
    isCheckingToken,
    isLoggedIn,
    userAccessToken,
    adminAccessToken
  } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const isAdmin = pathname.includes("/admin");

  const [isAdminLogined, setIsAdminLogined] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    dispatch(getAccessToken(isAdmin));
  }, [dispatch, isAdmin]);

  useEffect(() => {
    setIsAdminLogined(localStorage.getItem("isAdmin") === "true");
  }, [isCheckingToken]);

  if (isCheckingToken) return <PageLoader />;

  if (!isLoggedIn) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/SignUpUser" element={<SignUpUser />} />
          <Route path="/*" element={<UserRoutes />} />
          <Route path="*" element={<Navigate replace to="/*" />} />
          {/* <Route path="AboutUs" element={<AboutUs />} />
          <Route path="Blogs" element={<Blogs />} />
          <Route path="BlogDeatils" element={<BlogDeatils />} />
          <Route path="ContactUs" element={<ContactUs />} />
          <Route path="ServiceDetails" element={<ServiceDetails />} />
          <Route path="AllPakages" element={<AllPakages />} /> 
          <Route path="Smartkitchen" element={<Smartkitchen />} /> */}
          <Route path="packageDetails" element={<PackageDetails />} />
          <Route path="DiabetesHealthPakages" element={<DiabetesHealthPakages />} />
          <Route path="BookAppoinment" element={<BookAppoinment />} />
          <Route path="BookAppoinmentdate" element={<BookAppoinmentdate />} />
          {/* <Route path="Testimonial" element={<Testimonial />} /> */}
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {adminAccessToken.length == 0 && (
          <Route path="/admin-login" element={<AdminLogin />} />
        )}
        {userAccessToken.length == 0 && (
          <Route path="/login-user" element={<LoginUser />} />
        )}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              condition={isAdminLogined}
              redirectTo="/"
            >
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
