import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import Filter from "../../Components/Filter/Filter";
import Blogs from "../../Components/Blogs/Blogs";
import { useDispatch } from "react-redux";
import { GetRefrenceData } from "../../Store/Features/Refrence/Refrence_thunk";
export default function Home() {
  const style = { section: `w-[100%] ` };

  return (
    <section className={style.section}>
      <Header />
      <Filter />
      <Blogs />
    </section>
  );
}
