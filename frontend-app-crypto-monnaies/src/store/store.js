import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import transactionsReducer from "./slices/transactionsSlice";
import cryptosReducer from "./slices/cryptosSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    transactions: transactionsReducer,
    cryptos: cryptosReducer,
  },
});
