import { apiCallBegan } from "../api";
import { Customer } from "../../models/customers";
import { RootState } from "../configureStore";
import moment from "moment";
import {
  AnyAction,
  createSelector,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";

interface InitialState {
  list: Customer[];
  lastFetch: null | number;
  error: null | { [key: string]: any };
  loading: boolean;
}

const slice = createSlice({
  name: "customers",

  initialState: {
    list: [],
    lastFetch: null,
    error: null,
    loading: false,
  } as InitialState,

  reducers: {
    customersRequested: (customers) => {
      customers.loading = true;
    },

    customersRecieved: (customers, action) => {
      customers.list = action.payload;
      customers.loading = false;
      customers.lastFetch = Date.now();
      customers.error = null;
    },

    customersRequestFailed: (customers, action) => {
      customers.error = action.payload;
      customers.loading = false;
    },

    customerAdded: (customers, action) => {
      customers.list.push(action.payload);
      customers.error = null;
    },

    customerUpdated: (customers, action) => {
      const index = customers.list.findIndex((c) => c.id === action.payload.id);
      customers.list[index] = action.payload;
      customers.error = null;
    },

    customerDeleted: (customers, action) => {
      const index = customers.list.findIndex((c) => c.id === action.payload.id);
      customers.list.splice(index, 1);
    },
  },
});

export const {
  customerAdded,
  customerDeleted,
  customerUpdated,
  customersRecieved,
  customersRequestFailed,
  customersRequested,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadCustomers =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const lastFetch = getState().entities.customers.lastFetch;
    if (moment().diff(moment(lastFetch), "minutes") < 20) return;

    return dispatch(
      apiCallBegan({
        method: "get",
        url: "/customers/",
        onStart: customersRequested.type,
        onSuccess: customersRecieved.type,
        onError: customersRequestFailed.type,
      })
    );
  };

export const addCustomer =
  (data: Customer) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url: "/customers/",
        onSuccess: customerAdded.type,
        onError: customersRequestFailed.type,
      })
    );
  };

export const updateCustomer =
  (id: number | string, data: { [key: string]: any }) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "put",
        url: `/customers/${id}/`,
        onSuccess: customerUpdated.type,
        onError: customersRequestFailed.type,
      })
    );
  };

export const deleteCustomer =
  (id: number | string) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "delete",
        url: `/customers/${id}/`,
        onSuccess: customerDeleted.type,
      })
    );
  };

// Selectors

export const getCustomers = createSelector(
  (state: RootState) => state.entities.customers,
  (customers) => customers.list
);

export const getCustomer = (id: string | undefined) =>
  createSelector(
    (state: RootState) => state.entities.customers,
    (customers) =>
      customers.list[
        customers.list.findIndex((customer) => customer.id === Number(id))
      ]
  );

export const getFailedRequestError = createSelector(
  (state: RootState) => state.entities.customers,
  (customers) => customers.error
);
