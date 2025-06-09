import axios from "axios";
import store from "../../store";
import { authActions } from "../../store/auth";
import { GATEWAY_URL } from "../constants";
import moment from "moment";

// ✅ Always get latest token
const getToken = () => store.getState().auth.userAccessToken;

const jwtVerify = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    return Date.now() <= exp * 1000;
  } catch {
    return false;
  }
};

const userAxios = axios.create({
  baseURL: `${GATEWAY_URL}/web`,
});

userAxios.interceptors.request.use(
  async (config) => {
    let token = getToken();

    if (!jwtVerify()) {
      try {
        store.dispatch(authActions.checkingUserToken(true));
        const { data } = await axios.post(
          `${GATEWAY_URL}/web/refresh`,
          { type: "userRefreshToken" },
          { withCredentials: true }
        );

        store.dispatch(
          authActions.loginUser({
            isLoggedIn: true,
            isAdmin: false,
            user: { ...data?.user },
          })
        );
        store.dispatch(authActions.setUserAcccessToken(data?.accessToken || ""));
        token = data?.accessToken;
      } catch (err) {
        console.error("Token refresh failed", err);
      } finally {
        store.dispatch(authActions.checkingUserToken(false));
      }
    }

    // ✅ Always set latest token here
    config.headers["authorization"] = `Bearer ${token}`;
    config.headers["currentTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
    return config;
  },
  (error) => Promise.reject(error)
);

userAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token expired"
    ) {
      alert("Your session has expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default userAxios;
