import { AxiosResponse } from "axios";
import { put, takeLatest, call } from "redux-saga/effects";
import http from "../services/http";
import { API, apiCallBegan, apiCallFailed } from "../store/api";

function* handleApiRequests(action: API) {
  const { url, method, data, onSuccess } = action.payload;

  try {
    const response: AxiosResponse<any> = yield call(http.request, {
      url,
      method,
      data,
    });

    yield put({ type: onSuccess, payload: response.data });
  } catch (error) {
    yield put(apiCallFailed(error));
  }
}

export function* watchApiRequests() {
  yield takeLatest(apiCallBegan, handleApiRequests);
}
