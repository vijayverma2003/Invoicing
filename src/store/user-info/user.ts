import { AnyAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { RootState } from "../configureStore";
import { apiCallBegan } from "../api";

interface User {
  id: number;
  username: string;
  email: string;
}

interface InitialState {
  loading: boolean;
  error: { [key: string]: any } | null;
  user: User;
  lastFetch: null | number;
}

const slice = createSlice({
  name: "user",

  initialState: {
    loading: false,
    error: null,
    lastFetch: null,
    user: {},
  } as InitialState,

  reducers: {
    userRequested: (state, action) => {
      state.loading = true;
    },

    userRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    userRecieved: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.lastFetch = Date.now();
    },
  },
});

export const { userRequested, userRecieved, userRequestFailed } = slice.actions;

export default slice.reducer;

// Action Creators

export const loadUser =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    return dispatch(
      apiCallBegan({
        method: "get",
        completeURL: `${process.env.REACT_APP_AUTH_URL}/users/me`,
        onStart: userRequested.type,
        onSuccess: userRecieved.type,
        onError: userRequestFailed.type,
      })
    );
  };

// Selectors

export const getUser = createSelector(
  (state: RootState) => state.userInfo.user,
  (user) => user.user
);
