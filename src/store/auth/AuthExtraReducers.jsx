import axios from "axios";
import { GATEWAY_URL, webAxios } from "../../utils/constants";
import { authActions } from "./index";
import { toast } from "react-toastify";
import userAxios from "../../utils/Api/userAxios";
import store from "..";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";

export const Login = (
  userData,
  navigate,
  userType,
  route,
  isAdmin = false,
  isModal = false,
  onClose
) => {
  return async (dispatch) => {
    // Check internet connectivity
    if (!navigator.onLine) {
      toast.error("Please check your Internet Connection");
      return;
    }

    try {
      // Set loading states
      dispatch(authActions.checkingUserToken(true));
      dispatch(authActions.setLoginButtonDisable(true));

      // Prepare login request
      const type = isAdmin ? "adminRefreshToken" : "userRefreshToken";
      const loginPayload = {
        email: userData.username,
        password: userData.password,
        type,
        userType,
      };

      // Make API call
      const { data } = await axios.post(
        `${GATEWAY_URL}/web/login`,
        loginPayload,
        { withCredentials: true }
      );

      // Handle user data
      const user = data?.user;
      const accessToken = data?.accessToken || "";

      // Common login actions
      const loginPayload_common = {
        isLoggedIn: true,
        isAdmin,
        user: { ...user },
      };

      dispatch(authActions.loginUser(loginPayload_common));
      dispatch(authActions.setType(user?.userType));
      localStorage.setItem("isAdmin", isAdmin);

      // Handle admin vs user specific actions
      if (isAdmin) {
        dispatch(authActions.setAdminAcccessToken(accessToken));
        dispatch(authActions.setAdminDetails({ ...user }));
      } else {
        dispatch(authActions.setUserDetails({ ...user }));
        dispatch(authActions.setUserAcccessToken(accessToken));

        // Handle incomplete profile for regular users
        if (!user.profileUpdated) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          dispatch(authActions.checkingUserToken(false));
          navigate("/profile");
          return;
        }
      }

      // Handle navigation
      if (!isModal) {
        await new Promise((resolve) => setTimeout(resolve, 700));
        dispatch(authActions.checkingUserToken(false));
        
        const targetRoute = isAdmin 
          ? `/${route}/service-management/services` 
          : "/";
        
        navigate(targetRoute, { replace: true });
      } else {
        onClose?.();
      }

    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      // Reset loading states
      dispatch(authActions.setLoginButtonDisable(false));
      dispatch(authActions.checkingUserToken(false));
    }
  };
};

export const getAccessToken = (isAdmin, userType) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.checkingUserToken(true));
      const type = isAdmin ? "adminRefreshToken" : "userRefreshToken";
      const { data } = await axios.post(
        `${GATEWAY_URL}/web/refresh`,
        { type, userType },
        {
          withCredentials: true,
        }
      );
      if (isAdmin) {
        dispatch(
          authActions.loginUser({
            isLoggedIn: true,
            isAdmin: isAdmin,
            user: { ...data?.user },
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
            user: { ...data?.user },
          })
        );
        dispatch(authActions.checkingUserToken(false));
        dispatch(authActions.setUserDetails({ ...data?.user }));
        dispatch(authActions.setUserAcccessToken(data?.accessToken || ""));
      }
      dispatch(authActions.setType(data?.user?.userType));
    } catch (error) {
      if (
        error.response?.data?.error ===
        "Your account is De-Activated. Please Contact Administrator"
      ) {
        window.location.replace("/");
      } else {
        toast.error(error?.response?.data?.message);
        if (!isAdmin) {
          document.cookie =
            "userRefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      }
    } finally {
      dispatch(authActions.checkingUserToken(false));
    }
  };
};

export const logoutUser = (isUser, userType) => {
  if (window.performance && window.performance.clearResourceTimings) {
    window.performance.clearResourceTimings();
  }
  const accessToken = isUser
    ? store.getState().auth.userAccessToken
    : store.getState().auth.adminAccessToken;
  window.sessionStorage.clear();
  window.localStorage.clear();
  window.indexedDB.deleteDatabase("");
  return async (dispatch) => {
    const type = isUser ? "userRefreshToken" : "adminRefreshToken";
    dispatch(authActions.setLoginButtonDisable(true));
    const fetchData = async () => {
      await webAxios
        .post(
          `/logout`,
          { type },
          {
            withCredentials: true,
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        )
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
      if (isUser) {
        window.open("/login-user", "_self", false);
      } else {
        localStorage.removeItem("isAdmin");
        window.open(`/${userType}`, "_self", false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.setLoginButtonDisable(false));
    }
  };
};

export const getServicesForUser = () => {
  return async (dispatch) => {
    try {
      const response = await webAxios.get(userApiRoutes.get_services);
      const servicesData = response.data.data;
      const chunkSize = 9;
      const chunkedServices = [];
      for (let i = 0; i < servicesData.length; i += chunkSize) {
        chunkedServices.push(servicesData.slice(i, i + chunkSize));
      }
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

export const getKitchenData = ({
  search = "",
  page = 1,
  limit = 8,
  category,
  type,
} = {}) => {
  return async (dispatch) => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_kitchen_items({ search, page, limit, category, type })
      );

      const kitchenData = response.data.data;
      dispatch(authActions.setKictchenData(kitchenData));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch kitchen data"
      );
    }
  };
};

export const fetchKitchenCategories = () => {
  return async (dispatch) => {
    try {
      const response = await webAxios.get(userApiRoutes.get_kitchen_categories);
      const kitchenCategories = response.data.data;
      dispatch(authActions.setKictchenCategories(kitchenCategories));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch kitchen data"
      );
    }
  };
};

export const fetchAllProducts = ({
  search = "",
  serviceId,
  page,
  limit,
  setTotalPages,
  setTotalItems,
} = {}) => {
  return async (dispatch) => {
    if (typeof search !== "string") {
      console.error("Invalid search parameter:", search);
      return;
    }
    const query = {
      page,
      limit,
      search,
      serviceId,
    };
    try {
      const response = await webAxios.get(
        userApiRoutes.get_all_packages(query)
      );
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
      const filter = response.data.data;
      dispatch(authActions.setAllPackages(filter));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch packages");
    }
  };
};

export const sendInquiry = async (data) => {
  try {
    const response = await webAxios.post(userApiRoutes.send_inquiry, data);
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch packages");
  }
};

export const getContactusDetails = () => {
  return async (dispatch) => {
    try {
      const response = await webAxios.get(userApiRoutes.get_contact_us_details);
      dispatch(authActions.setcontactusDetails(response.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
};

export const handleSocialLoginGoogle = (
  dataGoogle,
  navigate,
  isAdmin = false
) => {
  return async (dispatch) => {
    try {
      if (!navigator.onLine) {
        toast.error("Please check your Internet Connection");
        return;
      }

      const payload = {
        ...dataGoogle,
        profilePicture: dataGoogle?.picture,
      };
      const { data } = await webAxios.post(userApiRoutes.social_login, payload);
      dispatch(
        authActions.loginUser({
          isLoggedIn: true,
          isAdmin: isAdmin,
          user: { ...data?.user },
        })
      );
      dispatch(authActions.setUserDetails({ ...data?.user }));
      dispatch(authActions.setUserAcccessToken(data?.accessToken || ""));
      localStorage.setItem("isAdmin", isAdmin);
      dispatch(authActions.checkingUserToken(false));
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
};

export const AddToCart = (plainId, isBuyNow = false, navigate) => {
  return async (dispatch) => {
    let toastId;

    if (!isBuyNow) {
      toastId = toast.loading("Adding to cart...");
    }

    try {
      const response = await userAxios.post(userApiRoutes.add_to_cart, {
        subscriptionPlanId: plainId,
        quantity: 1,
      });
      const id = response?.data?.data?.id;
      if (!isBuyNow) {
        toast.update(toastId, {
          render: "Added to cart successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        navigate(`/checkout/cart/${id}`);
      }
      return response?.data;
    } catch (error) {
      if (!isBuyNow) {
        toast.update(toastId, {
          render: error?.response?.data?.message || "Failed to add to cart",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.error(error?.response?.data?.message || "Failed to add to cart");
      }
    }
  };
};

export const fetchCartitems = () => {
  return async (dispatch) => {
    try {
      const res = await userAxios.get(userApiRoutes.get_cart_item());
      dispatch(authActions.setCartItems(res.data.data || []));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
};
