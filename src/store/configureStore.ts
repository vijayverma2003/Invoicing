import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import createSagaMiddleware from "@redux-saga/core";
import watchFetchProducts from "./sagas/products";
import entities from "./entities";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: entities,
  middleware: [...getDefaultMiddleware(), sagaMiddleWare],
});

console.log(store);

sagaMiddleWare.run(watchFetchProducts);

export default store;
