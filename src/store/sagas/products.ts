import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import http from "../../services/http";
import {
  productsRequested,
  productsRecieved,
  productsRequestFailed,
  Product,
} from "../products";
import { AxiosResponse } from "axios";

function* fetchProducts() {
  console.log("Hello from fetchProducts saga");
  try {
    const { data }: AxiosResponse<Product[]> = yield call(
      http.get,
      "/products/"
    );
    yield put(productsRecieved(data));
  } catch (error) {
    yield put(productsRequestFailed(error));
  }
}

export default function* watchFetchProducts() {
  console.log("Hello");
  yield takeEvery(productsRequested, fetchProducts);
}
