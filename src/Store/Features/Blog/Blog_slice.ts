import { createSlice } from "@reduxjs/toolkit";
import { AddNewBlog, GetBlogData, GetSingleBlog } from "./Blog_thunk";

const initialState = {
  data: [],
  singleBlog: {},
  image: null,
  loading: false,
  success: "",
  error: "",
};

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setSuccses: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetBlogData.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(GetBlogData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "";
        state.data = action.payload.data;
      })
      .addCase(GetBlogData.rejected, (state, action) => {
        state.loading = false;
        state.success = "";

        state.error = state.error =
          action.error.message || "somthing went wrong ";
      })
      .addCase(AddNewBlog.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AddNewBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "ჩანაწერი წარმატებით დაემატა";
      })
      .addCase(AddNewBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "somthing went wrong ";
      })
      .addCase(GetSingleBlog.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload.data;
      })
      .addCase(GetSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "somthing went wrong ";
      });
  },
});

export const { setImage, setSuccses } = BlogSlice.actions;

export default BlogSlice.reducer;
