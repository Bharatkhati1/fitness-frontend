import axios from "axios";
import store from "../../store";
import { authActions } from "../../store/auth";
import { GATEWAY_URL } from "../constants";
import moment from "moment";

const getToken = () => {
  return store.getState().auth.accessToken;
};

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

export const webAxios= axios.create({
  baseURL: `${GATEWAY_URL}/web`
});

const userAxios = axios.create({
  baseURL: `${GATEWAY_URL}/web`,
  headers: {
    authorization: `Bearer ${getToken()}`,
    currentTime: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

userAxios.interceptors.request.use(
  async (config) => {
    if (jwtVerify()) return config;

    try {
      const { data } = await axios.post(`${GATEWAY_URL}/user/refresh`, { type: "userRefreshToken" }, {
        withCredentials: true,
      });
      store.dispatch(authActions.loginUser({
        accessToken: data.accessToken,
        isLoggedIn: true,
        user: { ...data.user },
        permissions: data.user.permissions,
        orgId: data.user.org_id,
      }));
      config.headers["authorization"] = `Bearer ${getToken()}`;
    } catch {
    }

    return config;
  },
  (error) => Promise.reject(error)
);

userAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.response.data?.message === "Token expired") {
      alert("Your session has expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default userAxios;
