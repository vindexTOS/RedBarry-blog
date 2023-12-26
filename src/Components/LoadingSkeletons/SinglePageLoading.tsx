import React from "react";
import SingleCardLoading from "./SingleCardLoading";

export default function SinglePageLoading() {
  const style = {
    section: `w-[100%] flex flex-col relative bg-[#FBFAFF] items-center justify-center py-10`,
    iconDiv: `p-3 rounded-[50%] bg-gray-200 absolute left-10 top-8 hover:bg-gray-300 cursor-pointer`,
    mainDiv: `h-[100%] w-[720px] flex flex-col gap-3 `,
    img: `w-[720px] h-[328px] rounded-[12px] bg-gray-300 animate-pulse`,
    likeItSection: `w-[1264px] items-center justify-start gap-5  flex  overflow-x-scroll `,
    headerAndArrows: `w-[100%]  flex justify-between  py-5`,
    header: `text-[1.2rem]  bg-gray-300 font-bold bg-gray-300 animate-pulse`,
    arrowDiv: `flex  gap-5 text-[1.5rem] font-bold`,
    arrow: `bg-gray-200 text-white rounded-[50%] w-[2.5rem] h-[2.5rem] flex items-center justify-center hover:bg-[#5D37F3] cursor-pointer `,
  };

  return (
    <section className={style.section}>
      <div className={style.iconDiv}></div>
      <div className={style.mainDiv}>
        <div className={style.img}></div>
        <div className="flex items-center  bg-gray-300  w-[100%] h-[12px] rounded-[12px]   text-[12px]  animate-pulse"></div>
        <div className="flex items-center  bg-gray-300  w-[100%] h-[12px] rounded-[12px]   text-[12px]  animate-pulse"></div>
        <div className="flex items-center  bg-gray-300  w-[100%] h-[12px] rounded-[12px]   text-[12px]  animate-pulse"></div>
        <div className="flex flex-col  gap-5">
          <div className="flex flex-col gap-">
            <h1 className={style.header}></h1>
            <div className="flex items-center  bg-gray-300  text-gray-400  text-[12px] bg-gray-300 animate-pulse"></div>
          </div>
          <h1 className="text-[2rem] h-[200px]  font-bold  w-[100%] bg-gray-300 animate-pulse"></h1>
          <div className="flex flex-wrap w-[100%]  gap-2 bg-gray-300 animate-pulse"></div>
          <p className="py-5 bg-gray-300 animate-pulse"></p>
        </div>
      </div>
      <section>
        <div className={style.headerAndArrows}>
          <h1 className={style.header}></h1>
          <div className={style.arrowDiv}>
            <p className={style.arrow}></p>
            <p className={style.arrow}></p>
          </div>
        </div>
        <div className={style.likeItSection}>
          {[1, 2, 3].map((placeholderId) => (
            <div key={placeholderId}>
              <SingleCardLoading key={placeholderId} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
