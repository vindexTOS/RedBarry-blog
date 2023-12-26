import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import DropZone from "../../Components/FormComponents.tsx/DropZone";
import Input from "../../Components/FormComponents.tsx/Input";
import DataPicker from "../../Components/FormComponents.tsx/DataPicker";
import DropDown from "../../Components/FormComponents.tsx/DropDown";
import { BlogType } from "../../types/BlogTypes";
import { useDispatch, useSelector } from "react-redux";
import { BsImageFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { setImage } from "../../Store/Features/Blog/Blog_slice";
import { AddNewBlog } from "../../Store/Features/Blog/Blog_thunk";
import { ThunkDispatch } from "@reduxjs/toolkit";
import LoadingComponent from "../../Components/Status/Loading";
import BlogPosted from "../../Components/FormComponents.tsx/BlogPosted";
export type SubArrayType = {
  title: string;
  isCompleted: boolean;
};
export default function AddBlog() {
  const navigation = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { token } = useSelector((state: any) => state.LoginReducer);

  // refrence states

  // initial state hardcoded
  const defaultAuthorSubArray = [
    { title: "მინიმუმ 4 სიმბოლო", isCompleted: false },
    { title: "მინიმუმ ორი სიტყვა", isCompleted: false },
    { title: "მხოლოდ ქართული სიმბოლოები", isCompleted: false },
  ];

  const defaultTitleSubArray = [
    { title: "მინიმუმ 4 სიმბოლო", isCompleted: false },
  ];

  const defaultDescriptionSubArray = [
    { title: "მინიმუმ 4 სიმბოლო", isCompleted: false },
  ];

  const emailSubArray = [
    [
      {
        title: "",
        isCompleted: false,
      },
    ],
  ];
  //getting changed initial state from local storage
  let authorArr = localStorage.getItem("authorSubArray");
  let titleArr = localStorage.getItem("titleSubArray");
  let decArr = localStorage.getItem("descriptionSubArray");
  let emailArr = localStorage.getItem("emailSubArray");
  // giving initial state to useState to change it dynamicily
  //checking if data on local storage exists, if so we take data from local storage if not we set initial state in to useState
  const [AuthorSubArray, setAuthorSubArray] = useState<SubArrayType[]>(
    authorArr ? JSON.parse(authorArr) : defaultAuthorSubArray
  );
  const [TitleSubArray, setTitleSubArray] = useState<SubArrayType[]>(
    titleArr ? JSON.parse(titleArr) : defaultTitleSubArray
  );
  const [DescriptionSubArray, setDescriptionSubArray] = useState<
    SubArrayType[]
  >(decArr ? JSON.parse(decArr) : defaultDescriptionSubArray);

  const [EmailSubArray, setEmailSubArray] = useState<SubArrayType[]>(
    emailArr ? JSON.parse(emailArr) : emailSubArray
  );

  // main states
  const { image, loading, success } = useSelector(
    (state: any) => state.BlogReducer
  );

  const storedItem = localStorage.getItem("blogForm");

  const savedForm: BlogType = storedItem
    ? JSON.parse(storedItem)
    : {
        email: "",
        title: "",
        description: "",
        publish_date: new Date(),
        categories: [],
        author: "",
      };
  const [Form, setForm] = useState<BlogType>(savedForm);

  useEffect(() => {
    localStorage.setItem("blogForm", JSON.stringify(Form));
  }, [Form]);
  // validation

  const isGeorgianName = (name: string): boolean => {
    const georgianRange = /^[\u10A0-\u10FF]+$/;
    return georgianRange.test(name.split(" ").join(""));
  };

  const isForLetters = (string: string): boolean => {
    return string.split("").length + 1 >= 4;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    // getting event value
    const { name, value } = e.target;
    console.log(e.target);
    setForm((prevData) => ({ ...prevData, [name]: value }));
    // validation
    let newAuthor = [...AuthorSubArray];
    let newTitle = [...TitleSubArray];
    let newDes = [...DescriptionSubArray];
    let newEmail = [...EmailSubArray];
    switch (name) {
      case "author":
        newAuthor[0].isCompleted = isForLetters(Form.author);
        newAuthor[1].isCompleted = Form.author.split(" ").length >= 2;
        newAuthor[2].isCompleted = isGeorgianName(Form.author);
        localStorage.setItem("authorSubArray", JSON.stringify(newAuthor));
        break;
      case "title":
        newTitle[0].isCompleted = isForLetters(Form.title);
        localStorage.setItem("titleSubArray", JSON.stringify(newTitle));
        break;
      case "description":
        newDes[0].isCompleted = isForLetters(Form.description);
        localStorage.setItem("descriptionSubArray", JSON.stringify(newDes));
        break;
      case "email":
        newEmail[0].isCompleted = value.endsWith("@redberry.ge");
        localStorage.setItem("emailSubArray", JSON.stringify(newEmail));
        break;
    }
  };
  // checcking if all values are fill

  const areAllCompleted = (subArray: SubArrayType[]) => {
    for (const subItem of subArray) {
      if (!subItem.isCompleted) {
        return false;
      }
    }
    return true;
  };

  const isAllCompleted = () => {
    const authorCompleted = areAllCompleted(AuthorSubArray);
    const titleCompleted = areAllCompleted(TitleSubArray);
    const descriptionCompleted = areAllCompleted(DescriptionSubArray);
    const emailCompleted = areAllCompleted(EmailSubArray);

    return (
      authorCompleted &&
      titleCompleted &&
      descriptionCompleted &&
      emailCompleted &&
      Form.categories.length > 0 &&
      image
    );
  };
  const allCompleted = isAllCompleted();

  // categories filters
  const handleCategorie = (Id: number) => {
    let categoRies: number[] = [...Form.categories];
    categoRies.push(Id);
    setForm((prevData) => ({ ...prevData, categories: categoRies }));
  };

  const handleRemoveCategories = (Id: number) => {
    let newCategories = Form.categories.filter((val: number) => val !== Id);
    setForm((prevData) => ({ ...prevData, categories: newCategories }));
  };

  // adding photo

  // sending to database
  const SendDataToDb = async () => {
    await dispatch(AddNewBlog({ ...Form, image }));
  };
  // styling
  const style = {
    section: `w-[100%] flex   bg-[#FBFAFF]`,
    iconDiv: `p-3   rounded-[50%] bg-gray-200 absolute left-10 top-8 hover:bg-gray-300 cursor-pointer`,
    h1: `text-[1.6rem] font-bold   text-[#1A1A1F] `,
    blogSection: `flex flex-col w-[100%] items-center  justify-center  py-10 pb-20 `,
    blogContainer: `flex flex-col gap-6`,
    DropZoneWrapper: `flex flex-col gap-3`,
    topinputWrapper: `flex justify-between`,
    p: `font-bold  text-[#1A1A1F]`,
  };
  if (token) {
    return (
      <section className={style.section}>
        <div
          className={` ${
            success ? "" : "hidden"
          }  absolute w-[100vw] h-[1200px] top-0  bg-gray-500/40 flex items-start py-[20rem] justify-center `}
        >
          <BlogPosted />
        </div>
        <div
          onClick={() => navigation("/")}
          className={`${style.iconDiv} ${success && "hidden"}`}
        >
          <MdOutlineArrowBackIos className="text-[1.2rem]" />
        </div>
        <section className={style.blogSection}>
          <div className={style.blogContainer}>
            <h1 className={style.h1}>ბლოგის დამატება</h1>
            <div className={style.DropZoneWrapper}>
              <p className={style.p}>ატვირთე ფოტო</p>
              {image ? (
                <div className="w-[100%] h-[56px] justify-between text-[1.2rem] text-gray-500  rounded-[12px] bg-[#F2F2FA] flex items-center justify-start px-5">
                  <div className="flex items-center gap-3">
                    <BsImageFill />
                    {image.name.slice(0, 30)}
                  </div>
                  <FiX
                    onClick={() => dispatch(setImage(null))}
                    className="text-gray-600  cursor-pointer text-[1rem] font-bold "
                  />
                </div>
              ) : (
                <DropZone />
              )}
            </div>
            <div className={style.topinputWrapper}>
              <Input
                require={true}
                handleChange={handleChange}
                title="ავტორი *"
                placeholder="შეიყვანეთ ავტორი"
                type="text"
                name="author"
                subArray={AuthorSubArray}
                value={Form.author}
              />
              <Input
                require={true}
                handleChange={handleChange}
                title="სათაური *"
                placeholder="შეიყვანეთ სათაური"
                type="text"
                name="title"
                subArray={TitleSubArray}
                value={Form.title}
              />
            </div>

            <Input
              require={true}
              isTextArea={true}
              handleChange={handleChange}
              title="აღწერა *"
              placeholder="შეიყვანეთ აღწერა"
              type="text"
              name="description"
              subArray={DescriptionSubArray}
              value={Form.description}
            />
            <div className={`${style.topinputWrapper}   `}>
              <DataPicker
                value={Form.publish_date}
                handleChange={handleChange}
                title="გამოქვეყნების თარიღი *"
                placeholder="შეიყვანეთ აღწერა"
                type="text"
                name="publish_date"
                subArray={["მინიმუმ 2 სიმბოლო"]}
              />

              <DropDown
                handleChange={handleCategorie}
                handleRemoveCategories={handleRemoveCategories}
                title="გამოქვეყნების თარიღი *"
                placeholder="შეიყვანეთ აღწერა"
                type="text"
                name="title"
              />
            </div>
            <Input
              require={true}
              handleChange={handleChange}
              title="ელ-ფოსტა"
              placeholder="Example@redberry.ge"
              type="email"
              name="email"
              subArray={EmailSubArray}
              value={Form.email}
            />
            <div className="flex py-10 w-[100%] items-end justify-end ">
              <LoadingComponent loading={loading} />

              <button
                disabled={!allCompleted}
                onClick={SendDataToDb}
                className={` ${
                  allCompleted ? "bg-[#5D37F3]" : "bg-gray-400"
                } py-[10px] px-[20px]   w-[288px] h-[40px] rounded-[8px] text-white`}
              >
                გამოქვეყნება
              </button>
            </div>
          </div>
        </section>
      </section>
    );
  } else {
    return <Navigate to="/" />;
  }
}
