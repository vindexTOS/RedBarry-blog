import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowLogIn: false,
  filter: localStorage.getItem("filter")
    ? JSON.parse(localStorage.getItem("filter")!)
    : [],
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
        state.filter = state.filter.filter((val: any) => val !== valueToToggle);
      } else {
        state.filter = [...state.filter, valueToToggle] as any;
      }

      localStorage.setItem("filter", JSON.stringify(state.filter));
    },
  },
});

export const { handleLogInOpen, toggleFilter } = UiSlice.actions;
export default UiSlice.reducer;
