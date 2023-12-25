import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBlogData } from "../../Store/Features/Blog/Blog_thunk";
import { ThunkDispatch } from "@reduxjs/toolkit";
import SingleBlog, { SingleBlogType } from "./SingleBlog";
const Blogs = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data, loading } = useSelector((state: any) => state.BlogReducer);

  useEffect(() => {
    dispatch(GetBlogData());
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="flex flex-wrap w-[100vw] items-center justify-center py-10  gap-8 ">
      {data?.map((val: SingleBlogType) => (
        <SingleBlog key={val.id} data={val} />
      ))}
    </div>
  );
};

export default Blogs;
