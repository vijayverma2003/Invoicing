import { combineReducers } from "redux";
import firmReducer from "./firm";
import user from "./user";

export default combineReducers({ firm: firmReducer, user });
