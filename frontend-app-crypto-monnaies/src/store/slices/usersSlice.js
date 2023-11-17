import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pseudo: "",
  email: "",
  isAdmin: false,
};

export const usersSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      return {
        ...state,
        pseudo: payload.pseudo,
        email: payload.email,
        isAdmin: payload.isAdmin,
      };
    },
    deleteUserData: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setUserData, deleteUserData } = usersSlice.actions;
export default usersSlice.reducer;
