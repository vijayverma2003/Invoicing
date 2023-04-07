import { combineReducers } from "redux";
import productsReducer from "./products";
import transportsReducer from "./transports";

export default combineReducers({
  products: productsReducer,
  transports: transportsReducer,
});
