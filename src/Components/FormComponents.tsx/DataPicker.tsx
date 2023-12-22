import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

type DataPickerProps = {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  subArray?: string[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
const DataPicker: FC<DataPickerProps> = ({
  title,
  placeholder,
  type,
  name,
  subArray,
  handleChange,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const handleData = (e: any) => {
    handleChange(e);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="px-1 font-bold text-[#1A1A1F]" htmlFor={name}>
          {title}
        </label>
        <div className="w-[288px] h-[44px]  rounded-[12px] border-[1px] border-[#E4E3EB] bg-[#FCFCFD] flex items-center gap-2 px-5">
          <FaCalendarAlt className="text-gray-300 mb-1" />
          <DatePicker
            style={{ background: "#FCFCFD" }}
            selected={startDate}
            onChange={(date: Date) => handleData(date)}
          />
        </div>
      </div>
    </div>
  );
};

export default DataPicker;
