import React, { FC } from "react";
import { BlogType } from "../../types/BlogTypes";
import { RefrenceFilterTpye } from "../Filter/Filter";
import SingleFilter from "../Filter/SingleFilter";
import { MdArrowOutward } from "react-icons/md";

export interface SingleBlogType extends BlogType {
  id: number;
}

type Data = {
  data: SingleBlogType;
};

const SingleBlog: FC<Data> = ({ data }) => {
  const { title, author, publish_date, image, categories, description } = data;
  return (
    <div className="w-[408px] h-[620px] flex flex-col gap-[24px] py-20 pb-40">
      <div className="w-[100%] h-[328px] rounded-[12px]">
        <img
          className="w-[100%] h-[328px] rounded-[12px]"
          src={String(image)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-[15px] font-bold">{author}</h1>
        <p className="text-gray-400 text-[12px]">
          {publish_date.toString().slice(0, 10)}
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <h1 className="text-[22px] font-bold  leading-[28px]">{title}</h1>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 5).map((val: any) => (
            <SingleFilter filter={val} key={val.id} />
          ))}
        </div>
        <p className="text-gray-600 break-normal flex	">
          {description.slice(0, 110)}{" "}
          {description.split("").length > 120 && "..."}
        </p>
      </div>
      <p className="flex items-center gap-2 font-bold text-[13px] cursor-pointer text-[#5D37F3] hover:text-[#5D37F3]/80">
        სრულად ნახვა <MdArrowOutward />
      </p>
    </div>
  );
};

export default SingleBlog;
