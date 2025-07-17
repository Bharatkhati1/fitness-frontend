import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap";
import $ from "jquery";

window.$ = window.jQuery = $;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Suspense fallback="Loading...">
          <GoogleOAuthProvider clientId='1025334248508-p80966cajrji9jlhh919cdtqas15pn57.apps.googleusercontent.com'>
            <App />
          </GoogleOAuthProvider>
        </Suspense>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
