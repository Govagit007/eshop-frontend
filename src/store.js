import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  cartReducer,
  productReducer,
  singleProductReducer,
} from "./reducers/productReducers";
import { userReducers } from "./reducers/userReducers";

const reducers = combineReducers({
  product: productReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  userReducer: userReducers,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
