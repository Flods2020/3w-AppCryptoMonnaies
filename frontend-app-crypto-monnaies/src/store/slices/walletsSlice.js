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
        user: payload.user,
        currencyTotal: payload.currencyTotal,
        cryptoWallet: payload.cryptoWallet,
        currencyWallet: payload.currencyWallet,
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
