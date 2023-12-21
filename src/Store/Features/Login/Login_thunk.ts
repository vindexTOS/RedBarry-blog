import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "js-cookie";

export const LoginThunk = createAsyncThunk(
  "login/post",
  async (email: string) => {
    try {
      const headers = {
        Authorization: import.meta.env.VITE_AuthorizationToken,
        withCredentials: true,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}login`,
        { email },
        { headers }
      );
      const cookiesFromResponse = response.headers;
      return "log";
    } catch (error) {
      const err: any = error;
      console.log(error);
      throw new Error(err.response.data.message);
    }
  }
);
