import React from "react";
import NavBar from "./Components/NavBar/NabBar";
import Login from "./Pages/Log_In/Login";
import { useSelector } from "react-redux";
export default function LayOut({ children }: { children: React.ReactNode }) {
  const style = {
    main: `bg-[#F3F2FA]`,
  };
  const { ShowLogIn } = useSelector((state: any) => state.UiReducer);
  return (
    <main className={style.main}>
      <NavBar />
      {ShowLogIn && <Login />}
      {children}
    </main>
  );
}
