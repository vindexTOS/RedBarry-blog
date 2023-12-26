import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BlogType } from "../../../types/BlogTypes";

export const GetBlogData = createAsyncThunk("get/blogs", async () => {
  try {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_AuthorizationToken}`,
    };
    const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}blogs`, {
      headers,
    });

    return res.data;
  } catch (error) {
    const err: any = error;
    console.log(error);
    throw new Error(err.response.data.message);
  }
});

export const AddNewBlog = createAsyncThunk(
  "post/blog",
  async (obj: BlogType) => {
    const formData = new FormData();

    formData.append("image", obj.image);

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_AuthorizationToken}`,
      "Content-Type": "multipart/form-data",
    };
    console.log(obj);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}blogs`,
        { formData, ...obj },
        { headers }
      );

      return res.data;
    } catch (error) {
      const err: any = error;
      console.log(error);
      throw new Error(err.response.data.message);
    }
  }
);

export const GetSingleBlog = createAsyncThunk(
  "get/single",
  async (id: number) => {
    try {
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_AuthorizationToken}`,
      };
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}blogs/${id}`,
        { headers }
      );

      return res.data;
    } catch (error) {
      const err: any = error;
      console.log(error);
      throw new Error(err.response.data.message);
    }
  }
);
