import { combineReducers } from "redux";
import common from "./common/common";
import entities from "./entities/entities";
import userInfo from "./user-info/user-info";

export default combineReducers({ userInfo, entities, common });
