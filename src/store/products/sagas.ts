import { AxiosResponse } from "axios";
import { Product } from "../../models/products";
import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import http from "../../services/http";
import {
  productsRequested,
  productsRecieved,
  productsRequestFailed,
} from "./slice";

function* fetchProducts() {
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
  yield takeEvery(productsRequested, fetchProducts);
}
