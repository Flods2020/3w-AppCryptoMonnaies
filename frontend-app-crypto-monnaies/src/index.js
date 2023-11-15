import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import configureAppStore from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { getUserProfile } from "./store/actions/user.action";
import { getTransactions } from "./store/actions/transaction.action";

// const store = configureAppStore();
const { store, persistor } = configureAppStore();

// store.dispatch(getTransactions());
// store.dispatch(getUserProfile());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
