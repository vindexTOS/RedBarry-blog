import { createSlice } from "@reduxjs/toolkit";
import { GetRefrenceData } from "./Refrence_thunk";

const initialState = {
  data: [],
  error: "",
  success: "",
  loading: false,
};

const RefrenceSlice = createSlice({
  name: "filter-refrence",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetRefrenceData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetRefrenceData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(GetRefrenceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "somthing went wrong ";
      });
  },
});

export const {} = RefrenceSlice.actions;

export default RefrenceSlice.reducer;
