import {
  AnyAction,
  Dispatch,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../models/products";
import { apiCallBegan } from "../api";
import moment from "moment";
import { RootState } from "../configureStore";

interface InitialState {
  loading: boolean;
  list: Product[];
  lastFetch: number | null;
}

const slice = createSlice({
  initialState: { loading: false, list: [], lastFetch: null } as InitialState,
  name: "products",
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },

    productsRecieved: (products, action) => {
      products.list = action.payload;
      products.loading = false;
      products.lastFetch = Date.now();
    },

    productsRequestFailed: (products, action) => {
      products.loading = false;
    },

    productAdded: (products, action) => {
      products.list.push(action.payload);
    },

    productUpdated: (products, action) => {
      const index = products.list.findIndex((p) => p.id === action.payload.id);
      products.list[index] = action.payload;
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

export const loadProducts =
  () => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const lastFetch = getState().products.lastFetch;
    if (moment().diff(moment(lastFetch), "minutes") < 20) return;

    return dispatch(
      apiCallBegan({
        method: "get",
        url: "/products/",
        onSuccess: productsRecieved.type,
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
      })
    );
  };

export const updateProduct =
  (id: string | number, data: { [key: string]: any }) =>
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

export const getProducts = createSelector(
  (state: RootState) => state.products,
  (products) => products.list
);

export const getProduct = (id: number | undefined) =>
  createSelector(
    (state: RootState) => state.products,
    (products) =>
      products.list[products.list.findIndex((product) => product.id === id)]
  );
