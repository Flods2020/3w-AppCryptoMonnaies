import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import transactionsReducer from "./slices/transactionsSlice";
import cryptosReducer from "./slices/cryptosSlice";
import walletsReducer from "./slices/walletsSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    transactions: transactionsReducer,
    cryptos: cryptosReducer,
    wallets: walletsReducer,
  },
});
