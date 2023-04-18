import { apiCallBegan } from "../api";
import { Product } from "../../models/products";
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
  list: Product[];
  lastFetch: number | null;
  error?: { [key: string]: string[] } | null;
}

// Slice

const slice = createSlice({
  name: "products",

  initialState: {
    loading: false,
    list: [],
    lastFetch: null,
    error: null,
  } as InitialState,

  reducers: {
    productsRequested: (products) => {
      products.loading = true;
    },

    productsRecieved: (products, action) => {
      products.list = action.payload;
      products.loading = false;
      products.lastFetch = Date.now();
      products.error = null;
    },

    productsRequestFailed: (products, action) => {
      products.error = action.payload;
      products.loading = false;
    },

    productAdded: (products, action) => {
      products.list.push(action.payload);
      products.error = null;
    },

    productUpdated: (products, action) => {
      const index = products.list.findIndex((p) => p.id === action.payload.id);
      products.list[index] = action.payload;
      products.error = null;
    },

    productDeleted: (products, action) => {
      const index = products.list.findIndex((p) => p.id === action.payload.id);
      products.list.splice(index, 1);
    },
  },
});

export const {
  productsRequested,
  productsRecieved,
  productDeleted,
  productUpdated,
  productAdded,
  productsRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadProducts =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const lastFetch = getState().entities.products.lastFetch;
    if (moment().diff(moment(lastFetch), "minutes") < 20) return;

    return dispatch(
      apiCallBegan({
        method: "get",
        url: "/products/",
        onStart: productsRequested.type,
        onSuccess: productsRecieved.type,
        onError: productsRequestFailed.type,
      })
    );
  };

export const addProduct =
  (data: { [key: string]: any }) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url: "/products/",
        onSuccess: productAdded.type,
        onError: productsRequestFailed.type,
      })
    );
  };

export const updateProduct =
  (id: string, data: { [key: string]: any }) =>
  (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        data,
        method: "put",
        url: `/products/${id}/`,
        onSuccess: productUpdated.type,
      })
    );
  };

export const deleteProduct =
  (id: string) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch(
      apiCallBegan({
        method: "delete",
        url: `/products/${id}/`,
        onSuccess: productDeleted.type,
      })
    );
  };

// Selectors

export const getProducts = createSelector(
  (state: RootState) => state.entities.products,
  (products) => products.list
);

export const getProduct = (id: string | undefined) =>
  createSelector(
    (state: RootState) => state.entities.products,
    (products) =>
      products.list[
        products.list.findIndex((product) => product.id === Number(id))
      ]
  );

export const getFailedRequestError = createSelector(
  (state: RootState) => state.entities.products,
  (products) => products.error
);
