import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import configureAppStore from "./store/store";
import { getTransactions } from "./store/actions/transaction.action";
import { getUserProfile } from "./store/actions/user.action";

const store = configureAppStore();

store.dispatch(getTransactions());
// store.dispatch(getUserProfile());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
