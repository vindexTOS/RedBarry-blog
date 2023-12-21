import { createSlice } from "@reduxjs/toolkit";
import { GetBlogData } from "./Blog_thunk";

const initialState = {
  data: [],
  loading: false,
  success: "",
  error: "",
};

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBlogData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetBlogData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(GetBlogData.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error =
          action.error.message || "somthing went wrong ";
      });
  },
});

export const {} = BlogSlice.actions;

export default BlogSlice.reducer;
