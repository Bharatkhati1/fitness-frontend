export const reducers = {
  loginUser(state, action) {
    state.accessToken = action.payload.accessToken;
    state.isLoggedIn = action.payload.isLoggedIn;
    state.user = action.payload.user;
    state.permissions = action.payload.permissions;
    state.orgId = action.payload.orgId;
    state.role = action.payload.permissions?.name;
  },
  checkingUserToken(state, action) {
    state.isCheckingToken = action.payload;
  },
  setLoginButtonDisable(state, action) {
    state.disableLoginButton = action.payload;
  },
};
