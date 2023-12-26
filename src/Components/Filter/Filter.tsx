import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetRefrenceData } from "../../Store/Features/Refrence/Refrence_thunk";
import SingleFilter from "./SingleFilter";
import { toggleFilter } from "../../Store/Features/UiSlice/Ui_slice";
import FilterLoading from "../LoadingSkeletons/FilterLoading";
export type RefrenceFilterTpye = {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
};
export default function Filter() {
  const { loading, data } = useSelector((state: any) => state.RefrenceReducer);
  const dispatch = useDispatch();
  const [MirrorValue, setMirrorValue] = useState(() => {
    const storedMirrorValue = localStorage.getItem("mirrorValue");
    return storedMirrorValue
      ? JSON.parse(storedMirrorValue)
      : new Array(data.length).fill(false);
  });
  const handleFilter = (val: string, i: number) => {
    let newArr = [...MirrorValue];
    newArr[i] = !newArr[i];
    setMirrorValue(newArr);
    dispatch(toggleFilter(val));
  };
  useEffect(() => {
    localStorage.setItem("mirrorValue", JSON.stringify(MirrorValue));
  }, [MirrorValue]);
  // useEffect(() => {
  //   console.log(filter);
  // }, [filter]);
  const style = {
    mainDiv: `flex items-center justify-center  py-5 w-[100%] px-20`,
    filterDiv: `flex   gap-2 flex-wrap items-center justify-center  `,
  };
  if (loading) {
    return (
      <div className={style.filterDiv}>
        <FilterLoading />
      </div>
    );
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.filterDiv}>
        {data?.map((val: RefrenceFilterTpye, i: number) => (
          <div
            className={`${
              MirrorValue[i] &&
              "outline-2 outline outline-gray-800  rounded-[30px]"
            }`}
            onClick={() => handleFilter(val.title, i)}
            key={val.id}
          >
            <SingleFilter filter={val} />
          </div>
        ))}
      </div>
    </div>
  );
}
