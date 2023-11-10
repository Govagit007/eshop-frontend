import axios from "axios";
import {
  ALL_PRODUCTS_GET_FAIL,
  ALL_PRODUCTS_GET_REQUEST,
  ALL_PRODUCTS_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
} from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_GET_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({ type: ALL_PRODUCTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_GET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_GET_REQUEST });

    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: PRODUCT_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_FAIL,
      payload: error.response.data.message,
    });
  }
};
