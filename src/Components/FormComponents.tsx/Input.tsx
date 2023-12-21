import React, { FC } from "react";

type InputProps = {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  subArray?: string[];
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
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="px-2 font-bold" htmlFor={name}>
          {title}
        </label>
        <div className="w-[288px] h-[44px] rounded-[12px] border-[1px] border-[#E4E3EB] bg-[#FCFCFD] flex items-center px-5">
          <input
            onChange={(e) => handleChange(e)}
            className="outline-none "
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
          />
        </div>
      </div>
      {subArray && subArray.length > 0 && (
        <div className="text-gray-500">
          {subArray.map((val: string, i: number) => (
            <li key={i}>{val}</li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
