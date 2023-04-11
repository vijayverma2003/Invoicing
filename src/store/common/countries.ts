import {
  AnyAction,
  Dispatch,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import { apiCallBegan } from "../api";
import Country from "../../models/country";
import moment from "moment";

interface InitialState {
  error: null | { [key: string]: any };
  lastFetch: null | number;
  list: Country[];
  loading: boolean;
}

const slice = createSlice({
  name: "countries",
  initialState: {
    error: null,
    lastFetch: null,
    list: [],
    loading: false,
  } as InitialState,
  reducers: {
    countriesRequested: (countries, action) => {
      countries.loading = true;
    },

    countriesRecieved: (countries, action) => {
      countries.list = action.payload;
      countries.loading = false;
      countries.error = null;
      countries.lastFetch = Date.now();
    },

    countriesRequestFailed: (countries, action) => {
      countries.error = action.payload;
      countries.loading = false;
    },
  },
});

export const { countriesRecieved, countriesRequestFailed, countriesRequested } =
  slice.actions;

export default slice.reducer;

// Action Creators

export const loadCountries =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const lastFetch = getState().entities.products.lastFetch;
    if (moment().diff(moment(lastFetch), "minutes") < 20) return;

    return dispatch(
      apiCallBegan({
        method: "get",
        url: "",
        completeURL: process.env.REACT_APP_API_BASE_URL + "/country/",
        onSuccess: countriesRecieved.type,
        onError: countriesRequestFailed.type,
        onStart: countriesRequested.type,
      })
    );
  };

// Selectors

export const getCountries = createSelector(
  (state: RootState) => state.common.countries,
  (countries) => countries.list
);
