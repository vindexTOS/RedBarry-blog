import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetRefrenceData = createAsyncThunk("get/refrence", async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}categories`
    );
    return res.data;
  } catch (error) {
    const err: any = error;
    console.log(error);
    throw new Error(err.response.data.message);
  }
});
