import { AnyAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import { Dispatch } from "react";
import { RootState } from "../configureStore";
import { Transport } from "../../models/transports";
import moment from "moment";

interface InitialState {
  loading: boolean;
  list: Transport[];
  lastFetch: number | null;
  error?: { [key: string]: string[] } | null;
}

// Slice

const slice = createSlice({
  name: "transports",

  initialState: {
    loading: false,
    list: [],
    lastFetch: null,
    error: {},
  } as InitialState,

  reducers: {
    transportsRequested: (transports, action) => {
      transports.loading = true;
    },

    transportsRequestFailed: (transports, action) => {
      transports.error = action.payload;
      transports.loading = false;
    },

    transportsRecieved: (transports, action) => {
      transports.list = action.payload;
      transports.loading = false;
      transports.lastFetch = Date.now();
      transports.error = null;
    },

    transportAdded: (transports, action) => {
      transports.list.push(action.payload);
      transports.error = null;
    },

    transportUpdated: (transports, action) => {
      const index = transports.list.findIndex(
        (transport) => transport.id === action.payload.id
      );

      transports.list[index] = action.payload;
      transports.error = null;
    },

    transportDeleted: (transports, action) => {
      const index = transports.list.findIndex(
        (transport) => transport.id === action.payload.id
      );

      transports.list.splice(index, 1);
    },
  },
});

export const {
  transportAdded,
  transportDeleted,
  transportUpdated,
  transportsRecieved,
  transportsRequestFailed,
  transportsRequested,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadTransports =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const lastFetch = getState().entities.transports.lastFetch;

    if (moment().diff(moment(lastFetch), "minutes") < 20) return;

    return dispatch(
      apiCallBegan({
        method: "get",
        url: "/transports/",
        onStart: transportsRequested.type,
        onSuccess: transportsRecieved.type,
        onError: transportsRequestFailed.type,
      })
    );
  };

export const addTransport =
  (data: { [key: string]: any }) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url: "/transports/",
        onSuccess: transportAdded.type,
        onError: transportsRequestFailed.type,
      })
    );
  };

export const updateTransport =
  (id: string, data: { [key: string]: any }) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "put",
        url: `/transports/${id}`,
        onSuccess: transportUpdated.type,
        onError: transportsRequestFailed.type,
      })
    );
  };

export const deleteTransport =
  (id: number | string) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "delete",
        url: `/transports/${id}`,
        onSuccess: transportDeleted.type,
        onError: transportsRequestFailed.type,
        props: { id },
      })
    );
  };

// Selectors

export const getTransports = createSelector(
  (state: RootState) => state.entities.transports,
  (transports) => transports.list
);

export const getTransport = (id: number | string | undefined) =>
  createSelector(
    (state: RootState) => state.entities.transports,
    (transports) =>
      transports.list[transports.list.findIndex((t) => t.id === Number(id))]
  );

export const getFailedRequestError = createSelector(
  (state: RootState) => state.entities.transports,
  (transports) => transports.error
);
