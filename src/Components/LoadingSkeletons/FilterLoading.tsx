import React from "react";

export default function FilterLoading() {
  return (
    <div className="animate-pulse   flex items-center gap-2">
      <div
        className={`h-[30px] w-[60px]  bg-gray-300  rounded-[12px]   py-[5px] px-[12px]   `}
      ></div>
      <div
        className={`h-[30px] w-[160px] bg-gray-300 py-[5px] px-[12px] rounded-[16px]  `}
      ></div>
      <div
        className={`h-[30px] w-[60px] bg-gray-300 py-[5px] px-[12px] rounded-[16px]  `}
      ></div>
      <div
        className={`h-[30px] w-[80px] bg-gray-300 py-[5px] px-[12px] rounded-[16px]  `}
      ></div>
      <div
        className={`h-[30px] w-[80px] bg-gray-300 py-[5px] px-[12px] rounded-[16px]  `}
      ></div>
      <div
        className={`h-[30px] w-[160px] bg-gray-300 py-[5px] px-[12px] rounded-[16px]  `}
      ></div>
    </div>
  );
}
