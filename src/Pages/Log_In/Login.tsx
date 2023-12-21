import React, { useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { handleLogInOpen } from "../../Store/Features/UiSlice/Ui_slice";
import useOutClick from "../../Hooks/useOutClick";
import { LoginThunk } from "../../Store/Features/Login/Login_thunk";
import { FaCheckCircle } from "react-icons/fa";

import { setError, setToken } from "../../Store/Features/Login/Login_slice";
import { HiMiniExclamationCircle } from "react-icons/hi2";
export default function Login() {
  const localToken = localStorage.getItem("user");

  const dispatch = useDispatch<any>();
  const { error, token, success } = useSelector(
    (state: any) => state.LoginReducer
  );
  const cancleRef = useRef(null);
  const handleClose = () => {
    dispatch(handleLogInOpen());
  };

  useOutClick(cancleRef, handleClose);

  const [email, setEmail] = useState("");

  const handleLogIn = async () => {
    if (!email) {
      dispatch(setError("გთხოვთ შეიყვანოთ ელ-ფოსტა"));
    } else if (!email.endsWith("@redberry.ge")) {
      dispatch(setError("ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge"));
    } else {
      dispatch(LoginThunk(email));
    }
  };

  const handleSuccseLogIn = () => {
    dispatch(setToken(localToken));
    handleClose();
  };
  const style = {
    mainDiv: `w-[100vw]  h-[91vh] absolute  overflow-hidden	 bg-gray-500/20 flex items-center justify-center`,
    loginDiv: `w-[480px] h-[272px] shrink-0 bg-[#FFF] rounded-[12px] flex flex-col items-center  justify-around relative`,
    cancel: `absolute text-[1.3rem] text-gray-500 top-1 right-2`,
    h1: `font-bold text-[1.5rem]`,
    inputWrapper: `flex flex-col items-centet justify-around gap-2`,
    label: `text-[#1A1A1F] text-[1.2rem]   font-medium leading-20`,
    input: `w-[432px] h-[44px] flex-shrink-0 rounded-[12px] border-[1.5px]  px-4 py-2 ${
      error ? "border-red-500 bg-red-600/10" : "border-[#5D37F3] bg-[#F7F7FF]"
    }`,
    btn: `flex w-[432px] h-[20px] text-white   py-5 rounded-[8px] justify-center items-center gap-10   bg-[#5D37F3]`,
  };

  return (
    <div className={style.mainDiv}>
      {success ? (
        <div ref={cancleRef} className={style.loginDiv}>
          <MdOutlineCancel onClick={handleClose} className={style.cancel} />

          <div className="flex flex-col items-center justify-center gap-2 mt-5">
            <FaCheckCircle className="text-green-400 text-[3rem]" />
            <h1 className={style.h1}>{success}</h1>
          </div>
          <button onClick={handleSuccseLogIn} className={style.btn}>
            კარგი
          </button>
        </div>
      ) : (
        <div ref={cancleRef} className={style.loginDiv}>
          <MdOutlineCancel onClick={handleClose} className={style.cancel} />

          <h1 className={style.h1}>შესვლა</h1>
          <div className={style.inputWrapper}>
            <label className={style.label} htmlFor="email">
              ელ-ფოსტა
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className={style.input}
              placeholder="Example@redberry.ge"
            />
            {error && (
              <div className="text-red-600 text-[15px] font-bold flex items-center justify-start gap-2 ">
                <HiMiniExclamationCircle className="mt-1 text-[1.2rem]" />
                {error}
              </div>
            )}
          </div>

          <button onClick={handleLogIn} className={style.btn}>
            შესვლა
          </button>
        </div>
      )}
    </div>
  );
}
