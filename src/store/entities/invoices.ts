import { apiCallBegan } from "../api";
import { Invoice } from "../../models/invoice";
import { RootState } from "../configureStore";
import moment from "moment";
import {
  AnyAction,
  Dispatch,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

interface InitialState {
  loading: boolean;
  error: null | { [key: string]: any };
  list: Invoice[];
  lastFetch: null | number;
  customerSales: { [key: string]: any };
}

const slice = createSlice({
  name: "invoices",

  initialState: {
    loading: false,
    error: null,
    list: [],
    lastFetch: null,
    customerSales: {},
  } as InitialState,

  reducers: {
    invoicesRequested: (invoices, action) => {
      invoices.loading = true;
    },

    invoicesRequestFailed: (invoices, action) => {
      invoices.error = action.payload;
      invoices.loading = false;
    },

    invoicesRecieved: (invoices, action) => {
      invoices.list = action.payload;
      invoices.error = null;
      invoices.lastFetch = Date.now();
      invoices.loading = false;

      for (let invoice of action.payload) {
        const customer = invoice.customer;
        const customerSales: { [key: string]: any } = {};

        if (typeof customer !== "string" && invoice.total_cost) {
          if (customer.id)
            customerSales[customer.id] = customerSales[customer.id]
              ? customerSales[customer.id] + invoice.total_cost
              : invoice.total_cost;
        }

        invoices.customerSales = customerSales;
      }
    },

    invoiceAdded: (invoices, action) => {
      invoices.list.push(action.payload);
    },

    invoiceUpdated: (invoices, action) => {
      const index = invoices.list.findIndex((i) => i.id === action.payload.id);
      invoices.list[index] = action.payload;
    },

    invoiceDeleted: (invoices, action) => {
      const index = invoices.list.findIndex((i) => i.id === action.payload.id);
      invoices.list.splice(index, 1);
    },
  },
});

export const {
  invoiceAdded,
  invoiceDeleted,
  invoiceUpdated,
  invoicesRecieved,
  invoicesRequestFailed,
  invoicesRequested,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadInvoices =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const lastFetch = getState().entities.invoices.lastFetch;

    if (moment().diff(moment(lastFetch), "minutes") < 30) return;

    return dispatch(
      apiCallBegan({
        url: "/invoices/",
        method: "get",
        onStart: invoicesRequested.type,
        onError: invoicesRequestFailed.type,
        onSuccess: invoicesRecieved.type,
      })
    );
  };

export const addInvoice =
  (data: Invoice) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "post",
        data,
        url: "/invoices/",
        onError: invoicesRequestFailed.type,
        onSuccess: invoiceAdded.type,
      })
    );
  };

export const updateInvoice =
  (id: number | string, data: Invoice) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "put",
        data,
        url: `/invoices/${id}/`,
        onError: invoicesRequestFailed.type,
        onSuccess: invoiceUpdated.type,
      })
    );
  };

export const deleteInvoice =
  (id: number | string) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "delete",
        url: `/invoices/${id}/`,
        onError: invoicesRequestFailed.type,
        onSuccess: invoiceDeleted.type,
      })
    );
  };

// Selectors

export const getInvoices = createSelector(
  (state: RootState) => state.entities.invoices,
  (invoices) => invoices.list
);

export const getInvoice = (id: number | string | undefined) =>
  createSelector(
    (state: RootState) => state.entities.invoices,
    (invoices) =>
      invoices.list[invoices.list.findIndex((i) => i.id === Number(id))]
  );

export const getCustomerSales = createSelector(
  (state: RootState) => state.entities.invoices,
  (invoices) => invoices.customerSales
);

export const getFailedRequestError = createSelector(
  (state: RootState) => state.entities.invoices,
  (invoices) => invoices.error
);
