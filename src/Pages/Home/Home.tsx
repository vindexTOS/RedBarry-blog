import React from "react";
import Header from "../../Components/Header/Header";
import Filter from "../../Components/Filter/Filter";
import Blogs from "../../Components/Blogs/Blogs";
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
