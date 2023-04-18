import { API, apiCallBegan, apiCallFailed } from "../store/api";
import { put, call, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import axios, { AxiosError, AxiosResponse } from "axios";
import http from "../services/http";

function* handleApiRequests(action: API) {
  const { url, method, data, onSuccess, onStart, onError, completeURL } =
    action.payload;

  if (onStart) yield put({ type: onStart });

  const request = completeURL ? axios.request : http.request;

  try {
    const response: AxiosResponse<any> = yield call(request, {
      url: completeURL ? completeURL : url,
      method,
      data,
    });

    if (onSuccess) yield put({ type: onSuccess, payload: response.data });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (onError) yield put({ type: onError, payload: error.response?.data });
      yield put(apiCallFailed(error.message));
      if (method === "delete") toast.error(error.response?.data["error"]);
    }
  }
}

export function* watchApiRequests() {
  yield takeEvery(apiCallBegan, handleApiRequests);
}
