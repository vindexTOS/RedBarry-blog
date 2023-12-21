import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "./Login_thunk";

const initialState = {
  token: "",
  error: "",
  success: "",
  loading: false,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "წარმატებული ავტორიზაცია";
        state.token = "userLoggedIn";
      })
      .addCase(LoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "somthing went wrong ";
      });
  },
});

export const { setError, setToken } = LoginSlice.actions;

export default LoginSlice.reducer;
