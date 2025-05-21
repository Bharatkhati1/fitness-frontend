import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAccessToken } from "./store/auth/AuthExtraReducers.jsx";

import "../public/assets/css/app.min.css"
import "../public/assets/css/icons.min.css"
import "../public/assets/css/vendor.min.css"
//components
import PageLoader from "./components/PageLoader/index.jsx";
import AppRoutes from "./components/Routes/AppRoutes.jsx";
import "./index.scss"
import Home from "./pages/Home.jsx";



const Login = lazy(() => import("./components/unauthorized/login.jsx"));
const Signup = lazy(() => import("./components/unauthorized/Signup.jsx"));
const ForgotPasswordForm = lazy(() =>
  import("./components/unauthorized/forgotPassword.jsx")
);

const App = () => {
  const dispatch = useDispatch();
  const isCheckingToken = useSelector((state) => state.auth.isCheckingToken);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(getAccessToken());
  }, []);


  if (isCheckingToken) return <PageLoader />;

  if (!isLoggedIn) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPasswordForm />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
           <Route path="Home" element={<Home/>} />
          
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <AppRoutes/>
    </Suspense>
  );
};

export default App;
