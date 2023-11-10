import axios from "axios";
import {
  UESR_LOAD_FAIL,
  UESR_LOAD_REQUEST,
  UESR_LOAD_SUCCESS,
  UESR_LOGIN_FAIL,
  UESR_LOGIN_REQUEST,
  UESR_LOGIN_SUCCESS,
  UESR_REGISTER_FAIL,
  UESR_REGISTER_REQUEST,
  UESR_REGISTER_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
} from "../constants/userConstants";

export const userRegister = (details) => async (dispatch) => {
  try {
    dispatch({ type: UESR_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://eshop-server-ni0p.onrender.com/api/users/register",
      details,
      config
    );
    console.log(data);

    dispatch({ type: UESR_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UESR_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const userLogin = (details) => async (dispatch) => {
  try {
    dispatch({ type: UESR_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://eshop-server-ni0p.onrender.com/api/users/login",
      details,
      config
    );

    dispatch({ type: UESR_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UESR_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const userLoad = () => async (dispatch) => {
  try {
    dispatch({ type: UESR_LOAD_REQUEST });

    const { data } = await axios.get(
      "https://eshop-server-ni0p.onrender.com/api/users/me"
    );

    dispatch({ type: UESR_LOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UESR_LOAD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://eshop-server-ni0p.onrender.com/api/users/logout"
    );

    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};
