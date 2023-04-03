import { combineReducers } from "redux";
import productsReducer, { Product } from "./products";

export default combineReducers({ products: productsReducer });
