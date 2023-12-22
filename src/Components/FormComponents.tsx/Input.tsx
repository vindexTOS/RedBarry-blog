import React, { FC } from "react";
import { LuDot } from "react-icons/lu";
import { SubArrayType } from "../../Pages/Add_Blog/AddBlog";
import { HiMiniExclamationCircle } from "react-icons/hi2";

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
  require: boolean;
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
  require,
}) => {
  const CheckValidations = (
    val: boolean,
    truth: string,
    notTruth: string,
    defa: string
  ) => {
    if (value !== "") {
      if (val) {
        return truth;
      } else {
        return notTruth;
      }
    }
    return defa;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="px-2 font-bold  text-[#1A1A1F]" htmlFor={name}>
          {title}
        </label>
        {isTextArea ? (
          <div
            className={`w-[600px] h-[124px] rounded-[12px] border-[1px] border-[#E4E3EB] bg-[#FCFCFD] flex items-center px-5  ${
              subArray &&
              CheckValidations(
                subArray[subArray.length - 1].isCompleted,
                "bg-green-300/20 border-green-600 ",
                "bg-red-600/20 border-red-600",
                "border-[#E4E3EB] bg-[#FCFCFD]"
              )
            }`}
          >
            <textarea
              required={require}
              value={value}
              style={{
                resize: "none",
              }}
              onChange={(e) => handleChange(e)}
              className="outline-none  bg-transparent w-[600px] h-[114px] "
              id={name}
              name={name}
              placeholder={placeholder}
            ></textarea>
          </div>
        ) : (
          <div
            className={`${
              subArray &&
              CheckValidations(
                subArray[subArray.length - 1].isCompleted,
                "bg-green-300/20 border-green-600 ",
                "bg-red-600/20 border-red-600",
                "border-[#E4E3EB] bg-[#FCFCFD]"
              )
            } w-[288px] h-[44px] rounded-[12px] border-[1px]  flex items-center px-5 relative`}
          >
            <input
              required={require}
              onChange={(e) => handleChange(e)}
              value={value}
              className="outline-none bg-transparent	 "
              id={name}
              name={name}
              placeholder={placeholder}
              type={type}
            />
            {type === "email" && value && !value?.endsWith("@redberry.ge") ? (
              <div className="text-red-600 text-[12px] font-bold flex items-center justify-start gap-2 absolute left-0 top-[3rem] w-[100%] ">
                <HiMiniExclamationCircle className="mt-1 text-[1.2rem]" />
                მეილი უნდა მთავრდებოდეს @redberry.ge-ით
              </div>
            ) : null}
          </div>
        )}
      </div>
      {subArray && subArray.length > 0 && (
        <ol className=" text-gray-400 text-[14px]  ">
          {subArray.map((val: SubArrayType, i: number) => (
            <li
              className={`flex items-center ${CheckValidations(
                val.isCompleted,
                "text-green-400",
                "text-red-500",
                "text-gray-400"
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
