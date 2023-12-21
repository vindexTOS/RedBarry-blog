import React, { FC } from "react";
import { RefrenceFilterTpye } from "./Filter";

type SingleFilterPropType = {
  filter: RefrenceFilterTpye;
};

const SingleFilter: FC<SingleFilterPropType> = ({ filter }) => {
  const dynamicStyles = {
    display: "flex",
    padding: "8px 16px",
    alignItems: "flex-start",
    gap: "10px",
    borderRadius: "30px",
    // border: "1px solid #000",
    backgroundColor: filter.background_color,
    color: filter.text_color,
    fontFamily: "FiraGO",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "16px",
    cursor: "pointer",
  };
  return <div style={dynamicStyles}>{filter.title}</div>;
};

export default SingleFilter;
