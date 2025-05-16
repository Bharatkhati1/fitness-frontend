import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./AuthInitialState";
import { reducers } from "./AuthReducers";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
