export const reducers = {
  loginUser(state, action) {
    state.isLoggedIn = action.payload.isLoggedIn;
    state.isAdmin = action.payload.isAdmin;
  },
  setAdminDetails(state, action) {
    state.adminDetails = action.payload;
  },
  setUserDetails(state, action) {
    state.userDetails = action.payload;
  },
  setUserAcccessToken(state, action) {
    state.userAccessToken = action.payload;
  },
  setAdminAcccessToken(state, action) {
    state.adminAccessToken = action.payload;
  },
  checkingUserToken(state, action) {
    state.isCheckingToken = action.payload;
  },
  setLoginButtonDisable(state, action) {
    state.disableLoginButton = action.payload;
  },
};
