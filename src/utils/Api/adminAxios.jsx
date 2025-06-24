import axios from "axios";
import store from "../../store";
import { authActions } from "../../store/auth";
import { GATEWAY_URL } from "../constants";
import moment from "moment";

// ✅ Always get latest admin token from Redux
const getToken = () => store.getState().auth.adminAccessToken;

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

const adminAxios = axios.create({
  baseURL: `${GATEWAY_URL}/admin`,
});

// ✅ Use interceptors to dynamically attach headers
adminAxios.interceptors.request.use(
  async (config) => {
    let token = getToken();

    if (!jwtVerify()) {
      try {
        const { data } = await axios.post(
          `${GATEWAY_URL}/web/refresh`,
          { type: "adminRefreshToken" },
          { withCredentials: true }
        );
        token = data?.accessToken;
        store.dispatch(
          authActions.loginUser({
            isLoggedIn: true,
            isAdmin: true,
            user: { ...data?.user },
          })
        );
        store.dispatch(authActions.setAdminAcccessToken(token));
      } catch {
        window.open("/admin", "_self");
      }
    }

    // ✅ Always set latest token + currentTime header here
    config.headers["authorization"] = `Bearer ${token}`;
    config.headers["currentTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
    return config;
  },
  (error) => Promise.reject(error)
);

adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token expired"
    ) {
      alert("Your admin session has expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default adminAxios;
