import { AnyAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import { Dispatch } from "react";
import { RootState } from "../configureStore";
import { Transport } from "../../models/transports";

interface InitialState {
  loading: boolean;
  list: Transport[];
  lastFetch: number | null;
  error?: { [key: string]: string[] };
}

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
      transports.loading = false;
      transports.lastFetch = Date.now();
    },

    transportAdded: (transports, action) => {
      transports.list.push(action.payload);
    },

    transportUpdated: (transports, action) => {
      const index = transports.list.findIndex(
        (transport) => transport.id === action.payload.id
      );

      transports.list[index] = action.payload;
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

export const loadTransports =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
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

// Selectors

export const getTransports = createSelector(
  (state: RootState) => state.transports,
  (transports) => transports.list
);
