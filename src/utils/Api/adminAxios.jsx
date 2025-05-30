import axios from "axios";
import store from "../../store";
import { authActions } from "../../store/auth";
import { GATEWAY_URL } from "../constants";
import moment from "moment";

const getToken = () => store.getState().auth.adminAccessToken;

const jwtVerify = () => {
  const token = getToken();
  if (!token) return false;

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  const { exp } = JSON.parse(jsonPayload);
  return Date.now() <= exp * 1000;
};

const adminAxios = axios.create({
  baseURL: `${GATEWAY_URL}/admin`,
  headers: {
    authorization: `Bearer ${getToken()}`,
    currentTime: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

adminAxios.interceptors.request.use(
  async (config) => {
    if (jwtVerify()) return config;

    try {
      const { data } = await axios.post(`${GATEWAY_URL}/web/refresh`, { type: "adminRefreshToken" }, {
        withCredentials: true,
      });
        dispatch(
          authActions.loginUser({
            isLoggedIn: true,
            isAdmin: isAdminUser,
            user: { ...data?.user },
          })
        );
        dispatch(authActions.setAdminAcccessToken(data?.accessToken || ""));
      config.headers["authorization"] = `Bearer ${getToken()}`;
    } catch {
      window.open("/admin-login", "_self");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.response.data?.message === "Token expired") {
      alert("Your session has expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default adminAxios;
