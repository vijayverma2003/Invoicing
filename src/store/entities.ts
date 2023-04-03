import { combineReducers } from "redux";
import productsReducer from "./products/slice";

export default combineReducers({ products: productsReducer });
