import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: "",
//   crypto: "",
//   currency: "",
//   amount: "",
//   timestamp: Date.now(),
//   transactionType: "",
// };

const initialState = null;

export const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState,
  reducers: {
    setTransactionsData: (state, { payload }) => {
      return { ...state, transactions: payload };
      //   return {
      //     ...state,
      //     user: action.payload.user,
      //     crypto: action.payload.crypto,
      //     currency: action.payload.currency,
      //     amount: action.payload.amount,
      //     timestamp: action.payload.timestamp,
      //     transactionType: action.payload.transactionType,
      //   };
    },
  },
});

export const { setTransactionsData } = transactionsSlice.actions;
export default transactionsSlice.reducer;
