import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import entities from "./entities";
import watchAll from "../sagas/sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: entities,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(watchAll);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
