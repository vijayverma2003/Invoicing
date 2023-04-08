import { apiCallBegan } from "../api";
import { Firm } from "../../models/firm";
import { RootState } from "../configureStore";
import moment from "moment";
import {
  AnyAction,
  createSelector,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";

interface InitialState {
  loading: boolean;
  firm: Firm[];
  error: { [key: string]: any } | null;
  lastFetch: null | number;
}

// Slice

const slice = createSlice({
  name: "firm",

  initialState: {
    loading: false,
    firm: [],
    error: null,
    lastFetch: null,
  } as InitialState,

  reducers: {
    firmRequested: (state, action) => {
      state.loading = true;
    },

    firmRecieved: (state, action) => {
      state.loading = false;
      state.firm = action.payload;
      state.lastFetch = Date.now();
      state.error = null;
    },

    firmRequestFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    firmAdded: (state, action) => {
      console.log(action.payload);
      state.error = null;
      state.firm = action.payload;
      console.log(state.firm);
    },

    firmUpdated: (state, action) => {
      state.error = null;
      state.firm = action.payload;
    },
  },
});

export const {
  firmAdded,
  firmRecieved,
  firmRequested,
  firmRequestFailed,
  firmUpdated,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadFirm =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const lastFetch = getState().userInfo.firm.lastFetch;

    if (moment().diff(moment(lastFetch), "minutes") < 30) return;

    return dispatch(
      apiCallBegan({
        method: "get",
        url: "/firms/",
        onStart: firmRequested.type,
        onSuccess: firmRecieved.type,
        onError: firmRequestFailed.type,
      })
    );
  };

export const addFirm =
  (data: { [key: string]: any }) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url: "/firms/",
        onStart: firmRequested.type,
        onError: firmRequestFailed.type,
        onSuccess: firmAdded.type,
      })
    );
  };

export const updateFirm =
  (id: string, data: { [key: string]: any }) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "put",
        url: `/firms/${id}/`,
        onStart: firmRequested.type,
        onError: firmRequestFailed.type,
        onSuccess: firmUpdated.type,
      })
    );
  };

// Selectors

export const getFirm = createSelector(
  (state: RootState) => state.userInfo.firm,
  (firm) => firm.firm[0]
);

export const getFailedRequestError = createSelector(
  (state: RootState) => state.userInfo.firm,
  (firm) => firm.error
);
