import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  cryptoTotal: "",
  currencyTotal: "",
  cryptoWallet: "",
  currencyWallet: [
    {
      currency: "",
      amount: "",
    },
  ],
};

export const walletsSlice = createSlice({
  name: "walletsSlice",
  initialState,
  reducers: {
    setWalletData: (state, { payload }) => {
      return {
        ...state,
        user: payload[0].user,
        cryptoTotal: payload[0].cryptoTotal,
        currencyTotal: payload[0].currencyTotal,
        cryptoWallet: payload[0].cryptoWallet,
        currencyWallet: payload[0].currencyWallet,
      };
    },
    editWalletData: (state, { payload }) => {
      return {
        payload,
      };
    },
    deleteWalletData: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setWalletData, deleteWalletData, editWalletData } =
  walletsSlice.actions;
export default walletsSlice.reducer;
