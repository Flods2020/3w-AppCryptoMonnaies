import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const cryptosSlice = createSlice({
  name: "cryptosSlice",
  initialState,
  reducers: {
    setCryptosData: (state, { payload }) => {
      return { ...state, cryptos: payload };
    },
  },
});

export const { setCryptosData } = cryptosSlice.actions;
export default cryptosSlice.reducer;
