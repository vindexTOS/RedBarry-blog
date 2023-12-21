import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBlogData } from "../../Store/Features/Blog/Blog_thunk";
export default function Blogs() {
  const dispatch = useDispatch<any>();
  const { data, loading } = useSelector((state: any) => state.BlogReducer);

  useEffect(() => {
    dispatch(GetBlogData());
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return <div onClick={() => console.log(data)}>Blogs</div>;
}
