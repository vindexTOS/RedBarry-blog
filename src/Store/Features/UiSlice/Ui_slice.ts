import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowLogIn: false,
  filter: [],
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    handleLogInOpen: (state) => {
      state.ShowLogIn = !state.ShowLogIn;
    },
    toggleFilter: (state, action) => {
      const valueToToggle = action.payload;

      const exists = state.filter.includes(valueToToggle as never);

      if (exists) {
        state.filter = state.filter.filter((val) => val !== valueToToggle);
      } else {
        state.filter = [...state.filter, valueToToggle] as any;
      }
    },
  },
});

export const { handleLogInOpen, toggleFilter } = UiSlice.actions;
export default UiSlice.reducer;
