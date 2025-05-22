import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/TDFfrontend/">
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />
        <React.Suspense fallback="Loading...">
          <GoogleOAuthProvider clientId="241141550405-lvbu6j5uv0fh6orfnh63u2ok7b0c2i93.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </React.Suspense>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
