import Cookies from "js-cookie";
import axios from "axios";
import { notify } from "../../lib/utils";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (user) => {
  Cookies.set("accessToken", user.accessToken);
  Cookies.set(
    "user",
    JSON.stringify({
      id: user.user.id,
      email: user.user.email,
      fullname: user.user.fullname,
      role: user.user.role,
    }),
  );
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutUser = () => {
  Cookies.remove("user");
  Cookies.remove("accessToken");
  notify("Sikeres kijelentkezés", "success");
  return {
    type: LOGOUT,
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest(credentials));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/authentication`,
        { ...credentials, strategy: "local" },
      );
      dispatch(loginSuccess(response.data));
      notify("Sikeres bejelentkezés", "success");
    } catch (error) {
      dispatch(loginFailure(error.message));
      notify(error.message, "error");
    }
  };
};

export const registerRequest = (userDetails) => ({
  type: REGISTER_REQUEST,
  payload: userDetails,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const registerUser = (userDetails) => {
  return async (dispatch) => {
    dispatch(registerRequest(userDetails));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userDetails,
      );
      dispatch(registerSuccess(response.data));
      notify("Sikeres regisztráció", "success");
    } catch (error) {
      dispatch(registerFailure(error.message));
      notify(error.message, "error");
    }
  };
};
