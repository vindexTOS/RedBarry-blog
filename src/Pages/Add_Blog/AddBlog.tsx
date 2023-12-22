import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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
export type SubArrayType = {
  title: string;
  isCompleted: boolean;
};
export default function AddBlog() {
  const navigation = useNavigate();
  const dispatch = useDispatch<any>();
  // states
  // refrence states
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
  let authorArr = localStorage.getItem("authorSubArray");
  let titleArr = localStorage.getItem("titleSubArray");
  let decArr = localStorage.getItem("descriptionSubArray");
  const [AuthorSubArray, setAuthorSubArray] = useState<SubArrayType[]>(
    authorArr ? JSON.parse(authorArr) : defaultAuthorSubArray
  );
  const [TitleSubArray, setTitleSubArray] = useState<SubArrayType[]>(
    titleArr ? JSON.parse(titleArr) : defaultTitleSubArray
  );
  const [DescriptionSubArray, setDescriptionSubArray] = useState<
    SubArrayType[]
  >(decArr ? JSON.parse(decArr) : defaultDescriptionSubArray);

  // main states
  const { image } = useSelector((state: any) => state.BlogReducer);

  const storedItem = localStorage.getItem("blogForm");

  const savedForm: BlogType = storedItem
    ? JSON.parse(storedItem)
    : {
        email: "",
        title: "",
        description: "",
        publish_date: "",
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
    return string.split("").length >= 4;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // getting event value
    const { name, value } = e.target;

    setForm((prevData) => ({ ...prevData, [name]: value }));
    // validation
    let newAuthor = [...AuthorSubArray];
    let newTitle = [...TitleSubArray];
    let newDes = [...DescriptionSubArray];
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
    }
  };
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
  // sending to database
  const SendDataToDb = async () => {
    dispatch(AddNewBlog({ ...Form, image }));
  };
  // styling
  const style = {
    section: `w-[100%] flex relative bg-[#FBFAFF]`,
    iconDiv: `p-3 rounded-[50%] bg-gray-200 absolute left-10 top-8 hover:bg-gray-300 cursor-pointer`,
    h1: `text-[1.6rem] font-bold   text-[#1A1A1F] `,
    blogSection: `flex flex-col w-[100%] items-center  justify-center  py-10 pb-20 `,
    blogContainer: `flex flex-col gap-6`,
    DropZoneWrapper: `flex flex-col gap-3`,
    topinputWrapper: `flex justify-between`,
    p: `font-bold  text-[#1A1A1F]`,
  };
  return (
    <section className={style.section}>
      <div onClick={() => navigation("/")} className={style.iconDiv}>
        <MdOutlineArrowBackIos className="text-[1.2rem]" />
      </div>
      <section className={style.blogSection}>
        <div className={style.blogContainer}>
          <h1 className={style.h1}>ბლოგის დამატება</h1>
          <div className={style.DropZoneWrapper}>
            <p className={style.p}>ატვირთე ფოტო</p>
            {image ? (
              <div
                onClick={() => console.log(image)}
                className="w-[100%] h-[56px] justify-between text-[1.2rem] text-gray-500  rounded-[12px] bg-[#F2F2FA] flex items-center justify-start px-5"
              >
                <div className="flex items-center gap-3">
                  <BsImageFill />
                  {image.name}
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
              handleChange={handleChange}
              title="ავტორი *"
              placeholder="შეიყვანეთ ავტორი"
              type="text"
              name="author"
              subArray={AuthorSubArray}
              value={Form.author}
            />
            <Input
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
              handleChange={handleChange}
              title="გამოქვეყნების თარიღი *"
              placeholder="შეიყვანეთ აღწერა"
              type="text"
              name="date"
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
            handleChange={handleChange}
            title="ელ-ფოსტა"
            placeholder="Example@redberry.ge"
            type="email"
            name="email"
            value={Form.email}
          />
          <div className="flex py-10 w-[100%] items-end justify-end ">
            <button
              onClick={SendDataToDb}
              className="py-[10px] px-[20px] bg-[#5D37F3]  w-[288px] h-[40px] rounded-[8px] text-white"
            >
              გამოქვეყნება
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
