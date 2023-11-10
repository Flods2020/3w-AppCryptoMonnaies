import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducers";

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });

  return store;
}
