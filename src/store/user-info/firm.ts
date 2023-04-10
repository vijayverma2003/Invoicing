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
      state.error = null;
      state.firm = action.payload;
    },

    firmUpdated: (state, action) => {
      state.error = null;
      state.firm = action.payload;
    },

    firmAddressRequested: (state, action) => {
      state.loading = true;
    },

    firmAddressRequestFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    firmAddressAdded: (state, action) => {
      state.error = null;
      state.firm[0].address = action.payload;
    },

    firmAddressUpdated: (state, action) => {
      state.error = null;
      state.firm[0].address = action.payload;
    },

    bankRequested: (state, action) => {
      state.loading = true;
    },

    bankRequestFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    bankAdded: (state, action) => {
      state.error = null;
      state.firm[0].bank = action.payload;
    },

    bankUpdated: (state, action) => {
      state.error = null;
      state.firm[0].bank = action.payload;
    },
  },
});

export const {
  bankAdded,
  bankRequested,
  bankRequestFailed,
  bankUpdated,
  firmAdded,
  firmAddressAdded,
  firmAddressRequested,
  firmAddressRequestFailed,
  firmAddressUpdated,
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

export const addFirmAddress =
  (id: string | number, data: { [key: string]: any }) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url: `/firms/${id}/address/`,
        onStart: firmAddressRequested.type,
        onError: firmAddressRequestFailed.type,
        onSuccess: firmAddressAdded.type,
      })
    );
  };

export const updateFirmAddress =
  (firmId: string | number, data: { [key: string]: any }) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "put",
        url: `/firms/${firmId}/address/${firmId}/`,
        onStart: firmAddressRequested.type,
        onError: firmAddressRequestFailed.type,
        onSuccess: firmAddressUpdated.type,
      })
    );
  };

export const addBankDetails =
  (id: string | number, data: { [key: string]: any }) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url: `/firms/${id}/bank/`,
        onStart: bankRequested.type,
        onError: bankRequestFailed.type,
        onSuccess: bankAdded.type,
      })
    );
  };

export const updateBankDetails =
  (firmId: string | number, data: { [key: string]: any }) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "put",
        url: `/firms/${firmId}/bank/${firmId}/`,
        onStart: bankRequested.type,
        onError: bankRequestFailed.type,
        onSuccess: bankUpdated.type,
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
