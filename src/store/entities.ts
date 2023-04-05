import { combineReducers } from "redux";
import productsReducer from "./entities/products";

export default combineReducers({ products: productsReducer });
