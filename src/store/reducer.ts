import { combineReducers } from "redux";
import entities from "./entities/entities";
import userInfo from "./user-info/user-info";
import common from "./common/common";

export default combineReducers({ userInfo, entities, common });
