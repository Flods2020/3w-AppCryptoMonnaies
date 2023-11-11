import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import transferReducer from "./transfer.reducer";
import transactionReducer from "./transaction.reducer";
import walletReducer from "./wallet.reducer";
import cryptoReducer from "./crypto.reducer";

export default combineReducers({
  userReducer,
  transferReducer,
  transactionReducer,
  walletReducer,
  cryptoReducer,
});
