import React, { useEffect } from "react";
import NavBar from "./Components/NavBar/NabBar";
import Login from "./Pages/Log_In/Login";
import { useDispatch, useSelector } from "react-redux";
import { GetRefrenceData } from "./Store/Features/Refrence/Refrence_thunk";
export default function LayOut({ children }: { children: React.ReactNode }) {
  const style = {
    main: `bg-[#F3F2FA] relative`,
  };
  const { ShowLogIn } = useSelector((state: any) => state.UiReducer);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(GetRefrenceData());
  }, []);

  return (
    <main className={style.main}>
      <NavBar />
      {ShowLogIn && <Login />}
      {children}
    </main>
  );
}
