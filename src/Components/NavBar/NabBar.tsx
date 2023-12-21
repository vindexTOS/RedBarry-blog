import React from "react";
import logo from "../../Assets/Logos/logo.png";
import { handleLogInOpen } from "../../Store/Features/UiSlice/Ui_slice";
import { useDispatch } from "react-redux";
export default function NabBar() {
  const style = {
    nav: `h-[80px] w-[100%] bg-[#FFF] border-[#E4E3EB] border-[1px] flex items-center justify-between px-20`,
    img: "w-[150px] h-[24px] shrink-0",
    btn: `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#5D37F3] text-white font-fira-go font-medium text-base`,
  };

  const dispatch = useDispatch();

  return (
    <nav className={style.nav}>
      <img className={style.img} src={logo} />
      <button onClick={() => dispatch(handleLogInOpen())} className={style.btn}>
        შესვლა
      </button>
    </nav>
  );
}
