import axios from "axios";
import store from "../../store/index";
import { authActions } from "../../store/auth";
import { GATEWAY_URL } from "../constants";
import moment from "moment";

const getToken = () => {
  return store.getState().auth.accessToken;
};

const jwtVerify = () => {
  const base64Url = getToken().split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { exp } = JSON.parse(jsonPayload);
  const expired = Date.now() <= exp * 1000;
  return expired;
};

const axiosInstance = axios.create({
  baseURL: GATEWAY_URL,
  headers: {
    authorization: `Bearer ${getToken()}`,
    currentTime: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const isValid = jwtVerify();
    if (isValid) {
      return config;
    } else {
      try {
        const { data } = await axios.get(`${GATEWAY_URL}/refresh`, {
          withCredentials: true,
        });
        store.dispatch(
          authActions.loginUser({
            accessToken: data?.accessToken,
            isLoggedIn: true,
            user: { ...data?.user, permissions: null },
            permissions: data.user.permissions,
            orgId: data.user.org_id,
          })
        );
        console.log("data::::", data);
      } catch (error) {
        window.open("/login-user", "_self");
      }
      if (config?.headers) {
        config.headers["authorization"] = `Bearer ${getToken()}`;
      }
      return config;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { data } = error.response;
      if (data && data.message === "Token expired") {
        // Handle expired token, e.g. display a pop-up message
        alert("Your session has expired. Please log in again.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
