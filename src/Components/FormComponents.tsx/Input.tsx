import React, { FC } from "react";
import { LuDot } from "react-icons/lu";
import { SubArrayType } from "../../Pages/Add_Blog/AddBlog";

type InputProps = {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  subArray?: SubArrayType[];
  value?: string;
  isTextArea?: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
const Input: FC<InputProps> = ({
  title,
  placeholder,
  type,
  name,
  subArray,
  handleChange,
  value,
  isTextArea,
}) => {
  const CheckValidations = (val: boolean) => {
    if (value !== "") {
      if (val) {
        return "text-green-400";
      } else {
        return "text-red-500";
      }
    }
    return "text-gray-400";
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="px-2 font-bold  text-[#1A1A1F]" htmlFor={name}>
          {title}
        </label>
        {isTextArea ? (
          <div className="w-[600px] h-[124px] rounded-[12px] border-[1px] border-[#E4E3EB] bg-[#FCFCFD] flex items-center px-5">
            <textarea
              value={value}
              style={{
                resize: "none",
              }}
              onChange={(e) => handleChange(e)}
              className="outline-none bg-[#FCFCFD]  w-[600px] h-[114px] "
              id={name}
              name={name}
              placeholder={placeholder}
            ></textarea>
          </div>
        ) : (
          <div className="w-[288px] h-[44px] rounded-[12px] border-[1px] border-[#E4E3EB] bg-[#FCFCFD] flex items-center px-5">
            <input
              onChange={(e) => handleChange(e)}
              value={value}
              className="outline-none bg-[#FCFCFD] "
              id={name}
              name={name}
              placeholder={placeholder}
              type={type}
            />
          </div>
        )}
      </div>
      {subArray && subArray.length > 0 && (
        <ol className=" text-gray-400 text-[14px]  ">
          {subArray.map((val: SubArrayType, i: number) => (
            <li
              className={`flex items-center ${CheckValidations(
                val.isCompleted
              )} `}
              key={i}
            >
              {subArray.length > 1 && <LuDot className="text-[1.2rem]" />}
              {val.title}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Input;
