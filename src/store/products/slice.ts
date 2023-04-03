import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models/products";

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

interface RootState {
  products: InitialState;
}

export const getProducts = createSelector(
  (state: RootState) => state.products,
  (products) => products.list
);
