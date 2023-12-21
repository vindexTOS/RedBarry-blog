import React from "react";
import HeaderPhoto from "../../Assets/Images/header.png";
export default function Header() {
  const style = {
    section: `flex items-center justify-around w-[100%] py-6 `,
    h1: `text-[#1A1A1F]   text-[4rem] font-bold leading-80`,
    img: "w-[624px] h-[200px] flex-shrink-0",
  };
  return (
    <section className={style.section}>
      <h1 className={style.h1}>ბლოგი</h1>
      <img className={style.img} src={HeaderPhoto} />
    </section>
  );
}
