import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleWare = createSagaMiddleware();

const store = () => {
  return configureStore({ reducer: productsReducer });
};
