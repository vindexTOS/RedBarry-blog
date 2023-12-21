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
const TextArea: FC<InputProps> = ({
  title,
  placeholder,
  type,
  name,
  subArray,
  handleChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="px-2 font-bold" htmlFor={name}>
        {title}
      </label>
      <div className="w-[600px] h-[124px] rounded-[12px] border-[1px] border-[#E4E3EB] bg-[#FCFCFD] flex items-center px-5">
        <textarea
          style={{
            resize: "none",
          }}
          onChange={(e) => handleChange(e)}
          className="outline-none bg-[#FCFCFD]  w-[600px] h-[114px] "
          id={name}
          name={name}
          placeholder={placeholder}
        ></textarea>
      </div>{" "}
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

export default TextArea;
