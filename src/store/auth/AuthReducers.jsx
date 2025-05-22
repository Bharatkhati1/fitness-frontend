export const reducers = {
  loginUser(state, action) {
    state.accessToken = action.payload.accessToken;
    state.isLoggedIn = action.payload.isLoggedIn;
    state.user = action.payload.user;
    state.isAdmin = action.payload.isAdmin;
  },
  checkingUserToken(state, action) {
    state.isCheckingToken = action.payload;
  },
  setLoginButtonDisable(state, action) {
    state.disableLoginButton = action.payload;
  },
};
