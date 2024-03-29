import { ActionCreator, AnyAction, createAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface API {
  type: string;
  payload: {
    data?: any;
    method: string;
    url: string;
    onStart?: string;
    onSuccess?: string;
    onError?: string;
    completeURL?: string;
    props?: any;
  };
}

export interface APIFailed {
  type: string;
  payload: {
    error: AxiosError<any>;
  };
}

export const apiCallBegan: ActionCreator<AnyAction> =
  createAction("api/callBegan");
export const apiCallFailed: ActionCreator<AnyAction> =
  createAction("api/callFailed");
export const apiCallSuccess = createAction("api/callSuccess");
