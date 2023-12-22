import React, { FC } from "react";
import { RefrenceFilterTpye } from "./Filter";
import { FiX } from "react-icons/fi";

type SingleFilterPropType = {
  filter: RefrenceFilterTpye;
  isFilter?: boolean;
  removeFunction?: any;
};

const SingleFilter: FC<SingleFilterPropType> = ({
  filter,
  isFilter,
  removeFunction,
}) => {
  const dynamicStyles = {
    gap: "10px",
    borderRadius: "30px",
    // border: "1px solid #000",
    backgroundColor: filter.background_color,
    color: filter.text_color,

    fontSize: "12px",

    cursor: "pointer",
    whiteSpace: "nowrap",
  };
  return (
    <div
      style={dynamicStyles}
      className={`h-[32px] flex  items-center justify-center    text-center py-[8px] px-[16px] $ `}
    >
      <p>{filter.title}</p>
      {isFilter && (
        <FiX
          onClick={() => removeFunction(filter.id)}
          className="text-white   text-[14px] font-bold "
        />
      )}
    </div>
  );
};

export default SingleFilter;
