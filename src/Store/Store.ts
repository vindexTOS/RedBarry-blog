import { configureStore } from "@reduxjs/toolkit";
import RefrenceReducer from "./Features/Refrence/Refrence_slice";
import BlogReducer from "./Features/Blog/Blog_slice";
import LoginReducer from "./Features/Login/Login_slice";
import UiReducer from "./Features/UiSlice/Ui_slice";
const store = configureStore({
  reducer: { RefrenceReducer, BlogReducer, LoginReducer, UiReducer },
});

export default store;
