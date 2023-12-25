import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBlogData } from "../../Store/Features/Blog/Blog_thunk";
import { ThunkDispatch } from "@reduxjs/toolkit";
import SingleBlog, { SingleBlogType } from "./SingleBlogCard";
const Blogs = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data, loading } = useSelector((state: any) => state.BlogReducer);
  const { filter } = useSelector((state: any) => state.UiReducer);

  useEffect(() => {
    dispatch(GetBlogData());
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="flex flex-wrap w-[100vw] items-center justify-center py-20  gap-8 ">
      {data
        ?.filter((val: SingleBlogType, i: number) => {
          const isPublished =
            new Date(val.publish_date).getTime() <= new Date().getTime();

          const hasMatchingCategory =
            filter.length === 0 ||
            val.categories.some((category: any) =>
              filter.includes(category.title)
            );

          return isPublished && hasMatchingCategory;
        })
        .map((val: SingleBlogType) => (
          <SingleBlog key={val.id} data={val} />
        ))}
    </div>
  );
};

export default Blogs;
