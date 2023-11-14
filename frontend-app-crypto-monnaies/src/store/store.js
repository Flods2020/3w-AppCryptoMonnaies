import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducers";
import { cancelActionMiddleware } from "./middleware/cancelActionMiddleware";

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    cancel: applyMiddleware(cancelActionMiddleware),
    devTools: true,
  });

  return store;
}
