import { combineReducers } from "redux";
import productsReducer from "./entities/products";
import transportsReducer from "./entities/transports";

export default combineReducers({
  products: productsReducer,
  transports: transportsReducer,
});
