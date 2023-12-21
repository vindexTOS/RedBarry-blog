import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetBlogData = createAsyncThunk("get/blogs", async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}blogs`);

    return res.data;
  } catch (error) {
    const err: any = error;
    console.log(error);
    throw new Error(err.response.data.message);
  }
});
