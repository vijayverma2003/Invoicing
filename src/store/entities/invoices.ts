import { apiCallBegan } from "../api";
import { Invoice, InvoiceResponse } from "../../models/invoice";
import { RootState } from "../configureStore";
import moment from "moment";
import {
  AnyAction,
  createSelector,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import Payment from "../../models/payment";

interface InitialState {
  loading: boolean;
  error: null | { [key: string]: any };
  list: InvoiceResponse[];
  lastFetch: null | number;
}

const slice = createSlice({
  name: "invoices",

  initialState: {
    loading: false,
    error: null,
    list: [],
    lastFetch: null,
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

    paymentAdded: (invoices, action) => {
      const index = invoices.list.findIndex(
        (i) => i.id === Number(action.payload.invoice)
      );

      const invoice = invoices.list[index];
      delete action.payload.invoice;
      invoice.payments.push(action.payload);
      invoices.list[index] = invoice;
      invoices.error = null;
    },

    paymentDeleted: (invoices, action) => {
      const index = invoices.list.findIndex(
        (i) => i.id === Number(action.payload.invoiceId)
      );

      const invoice = invoices.list[index];
      const paymentIndex = invoice.payments.findIndex(
        (p) => p.id === Number(action.payload.id)
      );
      invoice.payments.splice(paymentIndex, 1);
      invoices.list[index] = invoice;
      invoices.error = null;
    },

    paymentUpdated: (invoices, action) => {
      const index = invoices.list.findIndex(
        (i) => i.id === Number(action.payload.invoice)
      );

      const invoice = invoices.list[index];

      const paymentIndex = invoice.payments?.findIndex(
        (p) => p.id === action.payload.id
      );
      delete action.payload.invoice;
      invoice.payments[paymentIndex] = action.payload;

      invoices.error = null;
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
  paymentAdded,
  paymentDeleted,
  paymentUpdated,
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
        props: { id },
      })
    );
  };

export const addPayment =
  (invoiceId: number | string, data: Payment) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "post",
        data,
        url: `/invoices/${invoiceId}/payments/`,
        onError: invoicesRequestFailed.type,
        onSuccess: paymentAdded.type,
      })
    );
  };

export const updatePayment =
  (invoiceId: number | string, id: number | string, data: Payment) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "put",
        data,
        url: `/invoices/${invoiceId}/payments/${id}/`,
        onError: invoicesRequestFailed.type,
        onSuccess: paymentUpdated.type,
      })
    );
  };

export const deletePayment =
  (invoiceId: number | string, id: number | string) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "delete",
        url: `/invoices/${invoiceId}/payments/${id}/`,
        onError: invoicesRequestFailed.type,
        onSuccess: paymentDeleted.type,
        props: { invoiceId, id },
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

export const getFailedRequestError = createSelector(
  (state: RootState) => state.entities.invoices,
  (invoices) => invoices.error
);
