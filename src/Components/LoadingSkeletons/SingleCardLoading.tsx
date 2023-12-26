import React from "react";

export default function SingleCardLoading() {
  return (
    <div className="w-[408px] h-[640px] flex flex-col gap-[10px] pb-20">
      <div className="w-[100%] h-[328px] rounded-[12px] bg-gray-300 animate-pulse"></div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[15px] font-bold rounded-[12px] bg-gray-300 animate-pulse"></h1>
        <p className="text-gray-400 text-[12px] rounded-[12px] bg-gray-300 animate-pulse"></p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[20px] font-bold  rounded-[12px] leading-[28px] h-[60px] bg-gray-300 animate-pulse"></h1>
        <div className="flex flex-wrap gap-2 z-50 rounded-[12px] max-h-[300px] min-h-[50px] bg-gray-300 animate-pulse"></div>
        <p className="text-gray-600 break-normal rounded-[12px] flex h-[50px] bg-gray-300 animate-pulse"></p>
      </div>
      <p className="flex text-center items-center gap-2 rounded-[12px] font-bold text-[13px] cursor-pointer text-[#5D37F3] hover:text-[#5D37F3]/80 z-40 bg-gray-300 animate-pulse">
        ...
      </p>
    </div>
  );
}
