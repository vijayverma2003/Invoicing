import { combineReducers } from "redux";
import firmReducer from "./firm";

export default combineReducers({ firm: firmReducer });
