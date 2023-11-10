import {
  ALL_PRODUCTS_GET_REQUEST,
  ALL_PRODUCTS_GET_FAIL,
  ALL_PRODUCTS_GET_SUCCESS,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../constants/productConstants";

export const productReducer = (
  state = {
    products: [],
  },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCTS_GET_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case ALL_PRODUCTS_GET_SUCCESS:
      return {
        products: action.payload.products,
        loading: false,
      };
    case ALL_PRODUCTS_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_GET_SUCCESS:
      return {
        product: action.payload.product,
        loading: false,
      };
    case PRODUCT_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        cart: state.cart.filter((c) => c._id !== action.payload),
      };

    default:
      return state;
  }
};
