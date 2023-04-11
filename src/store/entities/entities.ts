import { combineReducers } from "redux";
import productsReducer from "./products";
import transportsReducer from "./transports";
import customersReducer from "./customers";

export default combineReducers({
  products: productsReducer,
  transports: transportsReducer,
  customers: customersReducer,
});
