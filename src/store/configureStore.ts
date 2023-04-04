import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import entities from "./entities";
import watchAll from "./sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: entities,
  middleware: [...getDefaultMiddleware(), sagaMiddleWare],
});

sagaMiddleWare.run(watchAll);

export default store;
