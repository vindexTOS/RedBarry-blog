import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  GetBlogData,
  GetSingleBlog,
} from "../../Store/Features/Blog/Blog_thunk";
import { LuDot } from "react-icons/lu";
import SingleFilter from "../Filter/SingleFilter";
import { SingleBlogType } from "./SingleBlogCard";
import SingleBlogCard from "./SingleBlogCard";
import SinglePageLoading from "../LoadingSkeletons/SinglePageLoading";
export default function SingleBlog() {
  const { singleBlog, data, loading } = useSelector(
    (state: any) => state.BlogReducer
  );

  const navigation = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { id } = useParams();

  useEffect(() => {
    dispatch(GetSingleBlog(Number(id)));
    dispatch(GetBlogData());
  }, [id]);

  const local = useLocation();
  const topScrollRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = topScrollRef.current as HTMLDivElement;
    element?.scrollIntoView({ behavior: "smooth" });
  }, [local]);
  const scrollRef = useRef(null);
  const handleScroll = (direction: "left" | "right") => {
    const scrollDistance = 435;
    const element = scrollRef.current as unknown as HTMLDivElement;

    if (element) {
      if (direction === "left") {
        element.scrollBy({
          left: -scrollDistance,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        element.scrollBy({
          left: scrollDistance,
          behavior: "smooth",
        });
      }
    }
  };
  const style = {
    section: `w-[100%] flex flex-col relative bg-[#FBFAFF] items-center justify-center py-10`,
    iconDiv: `p-3 rounded-[50%] bg-gray-200 absolute left-10 top-8 hover:bg-gray-300 cursor-pointer`,
    mainDiv: `h-[100%] w-[720px] flex flex-col   gap-[3rem] py-20`,
    img: `w-[720px] h-[388px] rounded-[12px]`,
    likeItSection: `w-[1264px] items-center justify-start gap-5  flex  overflow-x-scroll `,
    headerAndArrows: `w-[100%] flex justify-between  py-5`,
    header: `text-[1.2rem] font-bold`,
    arrowDiv: `flex  gap-5 text-[1.5rem] font-bold`,
    arrow: `bg-gray-200 text-white rounded-[50%] w-[2.5rem] h-[2.5rem] flex items-center justify-center hover:bg-[#5D37F3] cursor-pointer `,
  };
  if (loading) {
    return <SinglePageLoading />;
  }

  if (singleBlog && singleBlog.publish_date) {
    const {
      author,
      categories,
      description,
      email,
      image,
      publish_date,
      title,
    } = singleBlog || {};

    return (
      <section className={style.section}>
        <span ref={topScrollRef}></span>

        <div onClick={() => navigation("/")} className={style.iconDiv}>
          <MdOutlineArrowBackIos className="text-[1.2rem]" />
        </div>
        <div className={style.mainDiv}>
          <div className={style.img}>
            <img className="rounded-[12px] w-[100%] h-[100%] " src={image} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold ">{author}</h1>
              <div className="flex items-center  text-gray-400  text-[12px]">
                <p>{publish_date.slice(0, 10)}</p>
                <LuDot />
                <p>{email}</p>
              </div>
            </div>
            <h1 className="text-[2rem] font-bold  w-[100%]">{title}</h1>
            <div className="flex flex-wrap w-[100%]  gap-2">
              {categories.map((val: any) => (
                <SingleFilter filter={val} key={val.id} />
              ))}
            </div>
            <p className="py-5">{description}</p>
          </div>
        </div>
        <section>
          {" "}
          <div className={style.headerAndArrows}>
            {/* <h1 onClick={() => console.log(simularData)}>Logg</h1> */}
            <h1 className={style.header}>მსგავსი სტატიები</h1>
            <div className={style.arrowDiv}>
              <p className={style.arrow}>
                <MdOutlineKeyboardArrowLeft
                  onClick={() => handleScroll("left")}
                />
              </p>
              <p className={style.arrow}>
                <MdOutlineKeyboardArrowRight
                  onClick={() => handleScroll("right")}
                />
              </p>
            </div>
          </div>
          <div
            ref={scrollRef}
            style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
            className={style.likeItSection}
          >
            {data
              ?.filter((val: SingleBlogType, i: number) => {
                if (val.id === singleBlog.id) {
                  return false;
                }

                const isPublished =
                  new Date(val.publish_date).getTime() <= new Date().getTime();

                const hasMatchingCategory =
                  categories.length === 0 ||
                  val.categories.some((category: any) =>
                    categories.some(
                      (selectedCategory: any) =>
                        selectedCategory.title === category.title
                    )
                  );

                return isPublished && hasMatchingCategory;
              })
              .map((val: SingleBlogType) => (
                <div key={val.id} className="flex w-[408px]">
                  <SingleBlogCard data={val} />
                </div>
              ))}
          </div>
        </section>
      </section>
    );
  }
}
