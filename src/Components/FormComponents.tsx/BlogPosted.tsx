import React, { useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useOutClick from "../../Hooks/useOutClick";
import { useNavigate } from "react-router-dom";
import { setImage, setSuccses } from "../../Store/Features/Blog/Blog_slice";

export default function BlogPosted() {
  const dispatch = useDispatch();

  const { success } = useSelector((state: any) => state.BlogReducer);
  const cancleRef = useRef(null);
  const handleClose = () => {};
  useOutClick(cancleRef, handleClose);
  const navigation = useNavigate();
  const handleNav = () => {
    dispatch(setSuccses(""));
    dispatch(setImage(""));
    localStorage.removeItem("authorSubArray");
    localStorage.removeItem("Display");
    localStorage.removeItem("blogForm");
    localStorage.removeItem("titleSubArray");
    localStorage.removeItem("emailSubArray");
    localStorage.removeItem("descriptionSubArray");
    navigation("/");
  };

  const style = {
    loginDiv: `   w-[480px] h-[272px] shrink-0 bg-[#FFF] rounded-[12px] flex flex-col items-center  justify-around  relative  z-50`,
    cancel: `absolute text-[1.3rem] text-gray-500 top-1 right-2`,
    h1: `font-bold text-[1.5rem]`,

    btn: `flex w-[432px] h-[20px] text-white   py-5 rounded-[8px] justify-center items-center gap-10   bg-[#5D37F3]`,
  };
  return (
    <div ref={cancleRef} className={style.loginDiv}>
      {/* <MdOutlineCancel onClick={handleClose} className={style.cancel} /> */}

      <div className="flex flex-col items-center justify-center gap-2 mt-5">
        <FaCheckCircle className="text-green-400 text-[3rem]" />
        <h1 className={style.h1}>{success}</h1>
      </div>
      <button onClick={handleNav} className={style.btn}>
        მთავარ გვერდზე დაბრუნება
      </button>
    </div>
  );
}
