import React from "react";
import { useSelector } from "react-redux";
export default function SingleBlog() {
  const { singleBlog } = useSelector((state: any) => state.BlogReducer);

  return <div onClick={() => console.log("hi")}>SingleBlog</div>;
}
