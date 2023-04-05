import { all } from "redux-saga/effects";
// import { watchAddProduct, watchFetchProducts } from "./products/sagas";
import { watchApiRequests } from "./products/sagas";

function* watchAll() {
  yield all([watchApiRequests()]);
}

export default watchAll;
