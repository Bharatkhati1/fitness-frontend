export const reducers = {
  loginUser(state, action) {
    state.isLoggedIn = action.payload.isLoggedIn;
    state.isAdmin = action.payload.isAdmin;
  },
  setServices(state, action) {
    state.services = action.payload.services;
    state.allServices = action.payload.allServices;
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
  setKictchenData(state, action) {
    state.kitchenData = action.payload;
  },
  setKictchenCategories(state, action) {
    state.kicthenCategories = action.payload;
  },
};
