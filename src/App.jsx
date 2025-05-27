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
import FatperchantageCalculator from "./components/pages/FatperchantageCalculator.jsx";
import ForgotPassword from "./components/unauthorized/forgotPassword.jsx";
import AboutUs from "./components/pages/AboutUs.jsx";
import Blogs from "./components/pages/Blogs.jsx";

const UserRoutes = lazy(() => import("./components/Routes/UserRoutes.jsx"));
const AdminRoutes = lazy(() => import("./components/Routes/AdminRoutes.jsx"));

const ProtectedRoute = ({ condition, redirectTo = "/LoginUser", children }) => {
  return condition ? children : <Navigate to={redirectTo} replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const [isAdminLocal, setIsAdminLocal] = useState(false)
  const { isCheckingToken, isLoggedIn, isAdmin } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getAccessToken(setIsAdminLocal));
  }, [dispatch]);


  if (isCheckingToken) return <PageLoader />;

  if (!isLoggedIn) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin" element={<LoginUser setIsAdminLocal={setIsAdminLocal} />} />
          <Route path="LoginUser" element={<LoginUser setIsAdminLocal={setIsAdminLocal} />} />
          <Route path="SignUpUser" element={<SignUpUser />} />
          <Route path="/*" element={<UserRoutes />} />
          <Route path="*" element={<Navigate replace to="/*" />} />
          <Route
            path="FatperchantageCalculator"
            element={<FatperchantageCalculator />}
          />  
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="Blogs" element={<Blogs />} />
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
            <ProtectedRoute condition={isAdminLocal||isAdmin} redirectTo="/">
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
