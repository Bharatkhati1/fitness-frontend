import { configureStore } from "@reduxjs/toolkit";

//slices
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
