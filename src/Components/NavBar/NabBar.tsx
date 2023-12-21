import React, { useEffect, useState } from "react";
import logo from "../../Assets/Logos/logo.png";
import { handleLogInOpen } from "../../Store/Features/UiSlice/Ui_slice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../Store/Features/Login/Login_slice";
import { useLocation, useNavigate } from "react-router-dom";

export default function NabBar() {
  // const [token, setToken] = useState(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.LoginReducer);
  const localToken = localStorage.getItem("user");
  const navigation = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (localToken) {
      dispatch(setToken(localToken));
    }
  }, []);
  const style = {
    nav: `h-[80px] w-[100%] bg-[#FFF] border-[#E4E3EB] border-[1px] flex items-center  ${
      location.pathname === "/blog" ? "justify-center " : "justify-between"
    } px-20`,
    img: "w-[150px] h-[24px] shrink-0",
    btn: ` ${
      location.pathname === "/blog" && "hidden"
    } inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#5D37F3] text-white font-fira-go font-medium text-base`,
  };
  return (
    <nav className={style.nav}>
      <img onClick={() => navigation("/")} className={style.img} src={logo} />
      {token ? (
        <button onClick={() => navigation("/blog")} className={style.btn}>
          დაამატე ბლოგი
        </button>
      ) : (
        <button
          onClick={() => dispatch(handleLogInOpen())}
          className={style.btn}
        >
          შესვლა
        </button>
      )}
    </nav>
  );
}
