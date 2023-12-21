import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowLogIn: false,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    handleLogInOpen: (state) => {
      state.ShowLogIn = !state.ShowLogIn;
    },
  },
});

export const { handleLogInOpen } = UiSlice.actions;
export default UiSlice.reducer;
