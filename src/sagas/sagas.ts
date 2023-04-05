import { all } from "redux-saga/effects";
import { watchApiRequests } from "./api";

function* watchAll() {
  yield all([watchApiRequests()]);
}

export default watchAll;
