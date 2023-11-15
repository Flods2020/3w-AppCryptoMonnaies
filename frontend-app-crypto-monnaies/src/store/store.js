import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers/reducers";
import storage from "redux-persist/lib/storage";

export default function configureAppStore() {
  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
  });

  const persistor = persistStore(store);

  return { store, persistor };
}
