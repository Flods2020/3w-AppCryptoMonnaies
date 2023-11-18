import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState,
  reducers: {
    setTransactionsData: (state, { payload }) => {
      return { ...state, transactions: payload };
    },
    addTransactionsData: (state, { payload }) => {
      return { ...state, transactions: [...state.transactions, payload] };
    },
  },
});

export const { setTransactionsData, addTransactionsData } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
