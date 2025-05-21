import React,{ StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
        <React.Suspense fallback="Loading...">
          <App />
        </React.Suspense>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
