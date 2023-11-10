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

export const userReducers = (state = {}, action) => {
  switch (action.type) {
    case UESR_REGISTER_REQUEST:
    case UESR_LOGIN_REQUEST:
    case UESR_LOAD_REQUEST:
      return { isAthenticated: false, loading: true };

    case UESR_REGISTER_SUCCESS:
    case UESR_LOGIN_SUCCESS:
    case UESR_LOAD_SUCCESS:
      return { isAthenticated: true, loading: false, user: action.payload };

    case UESR_REGISTER_FAIL:
    case UESR_LOGIN_FAIL:
      return {
        ...state,
        isAthenticated: false,
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        user: null,
        isAthenticated: false,
        loading: false,
      };

    case USER_LOGOUT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UESR_LOAD_FAIL:
      return { isAthenticated: false, loading: false, error: action.payload };

    default:
      return state;
  }
};
