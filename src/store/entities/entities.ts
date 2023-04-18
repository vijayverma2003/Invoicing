import { combineReducers } from "redux";
import customersReducer from "./customers";
import invoicesReducer from "./invoices";
import productsReducer from "./products";
import transportsReducer from "./transports";

export default combineReducers({
  products: productsReducer,
  transports: transportsReducer,
  customers: customersReducer,
  invoices: invoicesReducer,
});
