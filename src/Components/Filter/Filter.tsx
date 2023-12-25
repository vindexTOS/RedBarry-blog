import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetRefrenceData } from "../../Store/Features/Refrence/Refrence_thunk";
import SingleFilter from "./SingleFilter";
export type RefrenceFilterTpye = {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
};
export default function Filter() {
  const { loading, data } = useSelector((state: any) => state.RefrenceReducer);

  if (loading) {
    return <div>Loading</div>;
  }
  const style = {
    mainDiv: `flex items-center justify-center  py-5 w-[100%] px-20`,
    filterDiv: `flex   gap-2 flex-wrap items-center justify-center  `,
  };
  return (
    <div className={style.mainDiv}>
      <div className={style.filterDiv}>
        {data?.map((val: RefrenceFilterTpye) => (
          <SingleFilter filter={val} key={val.id} />
        ))}
      </div>
    </div>
  );
}
