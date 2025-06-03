import axios from "axios";
import { GATEWAY_URL } from "../../utils/constants";
import { authActions } from "./index";
import { toast } from "react-toastify";
import userAxios, { webAxios } from "../../utils/Api/userAxios";
import store from "..";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";

export const Login = (userData, navigate, isAdmin = false) => {
  return async (dispatch) => {
    try {
      if (!navigator.onLine) {
        toast.error("Please check your Internet Connection");
        return;
      }
      dispatch(authActions.checkingUserToken(true));
      dispatch(authActions.setLoginButtonDisable(true));
      const type = isAdmin ? "adminRefreshToken" : "userRefreshToken";
      const { data } = await axios.post(
        `${GATEWAY_URL}/web/login`,
        {
          username: userData.username,
          password: userData.password,
          type: type,
        },
        {
          withCredentials: true,
        }
      );

      if (isAdmin) {
        dispatch(
          authActions.loginUser({
            isLoggedIn: true,
            isAdmin: isAdmin,
          })
        );
        dispatch(authActions.setAdminAcccessToken(data?.accessToken || ""));
        dispatch(authActions.setAdminDetails({ ...data?.user }));
      } else {
        dispatch(
          authActions.loginUser({
            isLoggedIn: true,
            isAdmin: isAdmin,
          })
        );
        dispatch(authActions.setUserDetails({ ...data?.user }));
        dispatch(authActions.setUserAcccessToken(data?.accessToken || ""));
      }
      localStorage.setItem("isAdmin", isAdmin);
      dispatch(authActions.checkingUserToken(false));
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate(isAdmin ? "/admin/slider-management" : "/", {
        replace: true,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.setLoginButtonDisable(false));
      dispatch(authActions.checkingUserToken(false));
    }
  };
};

export const getAccessToken = (isAdmin) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.checkingUserToken(true));
      const type = isAdmin ? "adminRefreshToken" : "userRefreshToken";
      const { data } = await axios.post(`${GATEWAY_URL}/web/refresh`, { type }, {
        withCredentials: true,
      });

      if (isAdmin) {
        dispatch(
          authActions.loginUser({
            isLoggedIn: true,
            isAdmin: isAdmin,
          })
        );
        localStorage.setItem("isAdmin", isAdmin);
        dispatch(authActions.checkingUserToken(false));
        dispatch(authActions.setAdminAcccessToken(data?.accessToken || ""));
        dispatch(authActions.setAdminDetails({ ...data?.user }));
      } else {
        dispatch(
          authActions.loginUser({
            isLoggedIn: true,
            isAdmin: isAdmin,
          })
        );
        dispatch(authActions.setUserDetails({ ...data?.user }));
        dispatch(authActions.setUserAcccessToken(data?.accessToken || ""));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.checkingUserToken(false));
    }
  };
};

export const logoutUser = (isUser) => {
  if (window.performance && window.performance.clearResourceTimings) {
    window.performance.clearResourceTimings();
  }
  const accessToken = isUser? store.getState().auth.userAccessToken : store.getState().auth.adminAccessToken;
  window.sessionStorage.clear();
  window.localStorage.clear();
  window.indexedDB.deleteDatabase("");
  return async (dispatch) => {
    const type = isUser ? "userRefreshToken" : "adminRefreshToken";
    dispatch(authActions.setLoginButtonDisable(true));
    const fetchData = async () => {
      await userAxios
        .post(`/logout`, { type }, {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${accessToken}`,
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
      if(isUser){
        window.open("/login-user", "_self", false);
      } else{
        localStorage.removeItem("isAdmin");
        window.open("/admin-login", "_self", false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.setLoginButtonDisable(false));
    }
  };
};

export const getServicesForUser  = () => {
  return async (dispatch) => {
    try {
      const response = await webAxios.get(userApiRoutes.get_services);
      const servicesData = response.data.data;
      const chunkSize = 6;
      const chunkedServices = [];
      for (let i = 0; i < servicesData.length; i += chunkSize) {
        chunkedServices.push(servicesData.slice(i, i + chunkSize));
      }
      console.log(chunkedServices)
      dispatch(
        authActions.setServices({
          services: chunkedServices,
          allServices: servicesData,
        })
      );
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getKitchenData = ({ search = '', page = 1, limit = 10, category, type } = {}) => {
  return async (dispatch) => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_kitchen_items({ search, page, limit, category, type })
      );

      const kitchenData = response.data.data;
      dispatch(authActions.setKictchenData(kitchenData));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch kitchen data");
    }
  };
};

export const fetchKitchenCategories = () => {
  return async (dispatch) => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_kitchen_categories
      );
      const kitchenCategories = response.data.data;
      dispatch(authActions.setKictchenCategories(kitchenCategories));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch kitchen data");
    }
  };
};

export const fetchAllProducts = ({ search = '', serviceId } = {}) => {
  return async (dispatch) => {
    if (typeof search !== 'string') {
      console.error("Invalid search parameter:", search);
      return;
    }
    try {
      const response = await webAxios.get(
        userApiRoutes.get_all_packages({ search, serviceId })
      );
      dispatch(authActions.setAllPackages(response.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch packages");
    }
  };
};

