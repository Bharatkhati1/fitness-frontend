import axios from "axios";
import { GATEWAY_URL } from "../../utils/constants";
import { authActions } from "./index";
import { toast } from "react-toastify";

export const LoginUser = (userData, navigate) => {
  return async (dispatch) => {
    try {
      if (!navigator.onLine) {
        toast.error("Please check your Internet Connection");
        return;
      }
      dispatch(authActions.setLoginButtonDisable(true));

      const { data } = await axios.post(
        `${GATEWAY_URL}/login`,
        {
          username: userData.username,
          password: userData.password
        },
        {
          withCredentials: true,
        }
      );
      dispatch(
        authActions.loginUser({
          accessToken: data?.accessToken||"",
          isLoggedIn: true,
          user: { ...data?.user, permissions: data?.user?.permissions?.id },
          permissions: data?.user?.permissions,
          orgId: data?.user?.org_id,
        })
      );
      navigate("/slider-management", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.setLoginButtonDisable(false));
    }
  };
};

export const getAccessToken = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${GATEWAY_URL}/refresh`, {
        withCredentials: true,
      });
      dispatch(
        authActions.loginUser({
          accessToken: data.accessToken,
          isLoggedIn: true,
          user: { ...data.user, permissions: null },
          permissions: data.user.permissions,
          orgId: data.user.org_id,
        })
      );
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.checkingUserToken(false));
    }
  };
};

export const logoutUser = (navigate) => {
  if (window.performance && window.performance.clearResourceTimings) {
    window.performance.clearResourceTimings();
  }
  window.sessionStorage.clear();
  window.localStorage.clear();
  window.indexedDB.deleteDatabase("");

  return async (dispatch) => {
    dispatch(authActions.setLoginButtonDisable(true));
    const fetchData = async () => {
      await axios
        .get(`${GATEWAY_URL}/logout`, {
          withCredentials: true,
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
      window.open("/login", "_self", false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.setLoginButtonDisable(false));
    }
  };
};
