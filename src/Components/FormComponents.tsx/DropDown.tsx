import React, { FC, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import SingleFilter from "../Filter/SingleFilter";
import { RefrenceFilterTpye } from "../Filter/Filter";
import useOutClick from "../../Hooks/useOutClick";
import { FiX } from "react-icons/fi";

type DropDownProps = {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  handleChange: (Id: number) => void;
  handleRemoveCategories: (Id: number) => void;
};
const DropDown: FC<DropDownProps> = ({
  title,
  placeholder,
  type,
  name,

  handleChange,
  handleRemoveCategories,
}) => {
  const { data } = useSelector((state: any) => state.RefrenceReducer);
  const [search, setSearch] = useState("");
  const displayLocal = localStorage.getItem("Display");
  const savedDisplay = displayLocal ? JSON.parse(displayLocal) : [];
  const [displayCategories, setDisplayCategories] =
    useState<RefrenceFilterTpye[]>(savedDisplay);
  useEffect(() => {
    localStorage.setItem("Display", JSON.stringify(displayCategories));
  }, [displayCategories]);
  const [isArrayStart, setisArrayStart] = useState(false);
  const [selectedFilterMirror, setSelectedFilterMirror] = useState(
    new Array(displayCategories.length).fill(false)
  );
  const HandleAddingCategories = (val: RefrenceFilterTpye, i: number) => {
    setisArrayStart(true);
    let isCategoryExist = displayCategories.find(
      (v: RefrenceFilterTpye) => v.id == val.id
    );
    if (!isCategoryExist) {
      setDisplayCategories((state) => [...state, val]);
      handleChange(val.id);
    }
  };
  const HandleRemoveCategoires = (val: number, i: number) => {
    let newDisplay = displayCategories.filter(
      (v: RefrenceFilterTpye) => v.id !== val
    );
    handleRemoveCategories(val);
    setDisplayCategories(newDisplay);
  };

  //  drop down
  const [dropDown, setDropDown] = useState(false);

  const handleDrop = () => {
    setDropDown(!dropDown);
  };
  const handleCancel = () => {
    setDropDown(false);
  };
  const cancleRef = useRef(null);
  useOutClick(cancleRef, handleCancel);

  return (
    <div ref={cancleRef} className={"flex flex-col gap-2 relative "}>
      <label className="px-2 font-bold  text-[#1A1A1F]" htmlFor={name}>
        {title}
      </label>
      <div
        className={`${
          isArrayStart && displayCategories.length <= 0
            ? " bg-red-600/20  border-red-600 "
            : !isArrayStart
            ? ""
            : "bg-green-600/20  border-green-600"
        }    w-[288px] h-[44px] rounded-[12px] border-[1px]  flex items-center justify-between px-5`}
      >
        {displayCategories.length > 0 ? (
          <div className="flex gap-1 relative  w-[95%]  items-center mt-4 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent  ">
            {displayCategories.map((val: RefrenceFilterTpye, i: number) => {
              return (
                <div className="mr-[6px]" key={val.id}>
                  <SingleFilter
                    i={i}
                    removeFunction={HandleRemoveCategoires}
                    isFilter={true}
                    filter={val}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <input
            onClick={() => setDropDown(true)}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none bg-transparent  "
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
          />
        )}
        {!dropDown ? (
          <IoIosArrowDown
            className="cursor-pointer text-[1rem]"
            onClick={handleDrop}
          />
        ) : (
          <IoIosArrowUp
            className="cursor-pointer text-[1rem]"
            onClick={handleDrop}
          />
        )}
      </div>
      {dropDown && (
        <div className="w-[288px] absolute  top-20  flex flex-wrap p-2 gap-1 overflow-y-scroll justify-center h-[144px] rounded-[12px] boxShaddowDropDown  bg-[#FFFFFF] border-[1px] border-[#E4E3EB]">
          {data
            ?.filter((val: RefrenceFilterTpye) => {
              if (!search) {
                return val;
              } else if (
                val.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val: RefrenceFilterTpye, i: number) => (
              <div onClick={() => HandleAddingCategories(val, i)} key={val.id}>
                <SingleFilter filter={val} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
