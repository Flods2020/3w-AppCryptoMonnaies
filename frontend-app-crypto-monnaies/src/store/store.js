import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import transactionsReducer from "./slices/transactionsSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    transactions: transactionsReducer,
  },
});
