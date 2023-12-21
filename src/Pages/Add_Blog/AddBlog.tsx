import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DropZone from "../../Components/FormComponents.tsx/DropZone";
export default function AddBlog() {
  const navigation = useNavigate();

  const style = {
    section: `w-[100%] flex relative`,
    iconDiv: `p-3 rounded-[50%] bg-gray-200 absolute left-10 top-8 hover:bg-gray-300 cursor-pointer`,
    h1: `text-[1.6rem] font-bold  `,
    blogSection: `flex flex-col w-[100%] items-center  justify-center  py-10`,
    blogContainer: `flex flex-col gap-10`,
    DropZoneWrapper: `flex flex-col gap-3`,
    p: `font-bold`,
  };
  return (
    <section className={style.section}>
      <div onClick={() => navigation("/")} className={style.iconDiv}>
        <MdOutlineArrowBackIos className="text-[1.2rem]" />
      </div>
      <section className={style.blogSection}>
        <div className={style.blogContainer}>
          <h1 className={style.h1}>ბლოგის დამატება</h1>
          <div className={style.DropZoneWrapper}>
            <p className={style.p}>ატვირთე ფოტო</p>
            <DropZone />
          </div>
        </div>
      </section>
    </section>
  );
}
