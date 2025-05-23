import axios from "axios";
import { GATEWAY_URL } from "../../utils/constants";
import { authActions } from "./index";
import { toast } from "react-toastify";
import userAxios from "../../utils/Api/userAxios";
import store from "..";

export const Login = (userData, navigate) => {
  return async (dispatch) => {
    try {
      if (!navigator.onLine) {
        toast.error("Please check your Internet Connection");
        return;
      }
      dispatch(authActions.checkingUserToken(true))
      dispatch(authActions.setLoginButtonDisable(true));
      const { data } = await axios.post(
        `${GATEWAY_URL}/web/login`,
        {
          username: userData.username,
          password: userData.password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Login successfully")
      dispatch(
        authActions.loginUser({
          accessToken: data?.accessToken || "",
          isLoggedIn: true,
          isAdmin: data.user.roleId === 1,
          user: { ...data?.user },
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.user.roleId === 1) {
        navigate("/admin/slider-management", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.setLoginButtonDisable(false));
      dispatch(authActions.checkingUserToken(false))
    }
  };
};

export const getAccessToken = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${GATEWAY_URL}/web/refresh`, {
        withCredentials: true,
      });
      dispatch(
        authActions.loginUser({
          accessToken: data?.accessToken || "",
          isLoggedIn: true,
          isAdmin: data.user.roleId === 1,
          user: { ...data?.user },
        })
      );
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.checkingUserToken(false));
    }
  };
};

export const logoutUser = () => {
  if (window.performance && window.performance.clearResourceTimings) {
    window.performance.clearResourceTimings();
  }
 const accessToken =  store.getState().auth.accessToken
  window.sessionStorage.clear();
  window.localStorage.clear();
  window.indexedDB.deleteDatabase("");
  return async (dispatch) => {
    dispatch(authActions.setLoginButtonDisable(true));
    const fetchData = async () => {
      await userAxios
        .get(`/logout`, {
          withCredentials: true,
          headers: {
            "authorization": `Bearer ${accessToken}`
          },
        })
        .then(() => {
          if (window.performance && window.performance.clearResourceTimings) {
            window.performance.clearResourceTimings();
          }
          window.sessionStorage.clear();
          window.localStorage.clear();
          window.indexedDB.deleteDatabase("");
        });
    };

    try {
      await fetchData();
      window.open("/LoginUser", "_self", false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.setLoginButtonDisable(false));
    }
  };
};
