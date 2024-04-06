"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import PageTitle from "../../typography/PageTitle";
import Loading from "../layout_constructs/loading";
import { setLoading } from "../../../features/user/userSlice";
import Image from "next/image";
import { Input, HelperText, Label, Textarea } from "@roketid/windmill-react-ui";
import { getQuestions } from "../../../features/course/module/moduleSlice";
import { useRouter } from "next/navigation";
import FormRow from "../../FormRow";
import Select from "react-select";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function EditQuestion({
  moduleParam,
  questionParam,
  paramName,
  courseid,
  isOpen,
  onClosed,
  Question,
  Questions1,
  Questions,
  setQuestions,
  setQuestion,
  setModuleQuestion,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [img, setImg] = useState(false);
  const [loader, setLoader] = useState(false);
  // const { allQuestions } = useSelector((strore) => strore.module);
  const [questionCont, setQuestionCont] = useState([]);
  // console.log(moduleParam);
  // console.log(moduleName);
  // console.log(courseName);
  const url2 = "/panel/admin_dashboard/create-module";
  const initialQuestions = {
    questions: "",
    a: "",
    b: "",
    c: "",
    d: "",
    answer: "",
    image: "undefined",
    className: "",
  };
  const [updatedQuestion, setUpdatedQuestion] = useState(initialQuestions);

  useEffect(() => {
    const questions = _.toString(Question?.map((i) => i.question));
    const moduleName = _.toString(Question?.map((i) => i.className));
    const answer = _.toString(Question?.map((i) => i.answer));
    const option1 = _.toString(Question?.map((i) => i.option1));
    const option2 = _.toString(Question?.map((i) => i.option2));
    const option3 = _.toString(Question?.map((i) => i.option3));
    const option4 = _.toString(Question?.map((i) => i.option4));
    const image = _.toString(Question?.map((i) => i.image));
    //console.log(singleQuestion);

    const imgs = !image ? "" : image;

    setUpdatedQuestion({
      questions: questions,
      answer: answer,
      a: option1,
      b: option2,
      c: option3,
      d: option4,
      image: imgs,
      className: moduleName,
    });
    setFile(imgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionParam]);

  // const id = _.toString(singleQuestion?.map((i) => i._id));

  const customStyles = {
    content: {
      position: "relative",
      top: "4vh",
      left: "18.5%",
      maxWidth: "80%",
      padding: "8%",
      overflow: "auto",
      maxHeight: "90vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 0,
    },
  };

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      // console.log(file[0]?.name);
    } else if (
      file[0]?.size > 1024 * 1024 &&
      file[0].type.startsWith("image/")
    ) {
      setImg(true);
    }
  };
  const setImageFiletoBase = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // console.log(reader.result);
        if (reader.result !== "") {
          setImg(false);
          setFile(reader.result);
        }
      };
    } catch (error) {
      return;
    }

    // setFile(file[0].name);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedQuestion({ ...updatedQuestion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { questions, a, b, c, d, answer, className } = updatedQuestion;

    if (!questions || !a || !b || !c || !d || !answer) {
      toast.error("please fill all details");
    }
    setLoader(true);

    const res = await axios.put(
      `http://localhost:8000/greendometech/ng/module/assessment/questions/update/${questionParam}/${moduleParam}`,
      {
        question: questions,
        option1: a,
        option2: b,
        option3: c,
        option4: d,
        answer: answer,
        image: file,
        className: className,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    console.log(res.status);

    const updateQuestion = res.data.questions;
    const updatedId = updateQuestion._id;
    const refreshed = Questions1.filter((item) => item._id !== updatedId);

    const refreshedQuestion = [...refreshed, updateQuestion];

    let sortedQuestions = refreshedQuestion.sort((r1, r2) =>
      r1.createdAt > r2.createdAt ? 1 : r1.createdAt < r2.createdAt ? -1 : 0
    );

    setQuestions(sortedQuestions);
    setModuleQuestion(sortedQuestions);
    if (res.status === 200) {
      setLoader(false);
    }
    // setQuestion([...Question, sortedQuestions]);
    if (updatedId !== "") {
      onClosed();
    }

    // router.push(`${url2}/${paramName}/${courseid}/${moduleParam}`);

    return res.data;
    // dispatch(
    //   adminUpdateUsers({
    //     params: profileParams,
    //     firstname: firstname,
    //     lastname: lastname,
    //     certificate: certCont,
    //     mobilenumber: mobilenumber,
    //     biography: biography,
    //     roles: roleCont,
    //     country: _.toString(countryZip),
    //   })
    // );
    //     dispatch(GetAllUsers());
  };
  return (
    <Modal
      className={" flex items-center flex-col"}
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      <button onClick={() => onClosed()}>Go Back</button>
      <div className="px-4 py-3 mb-8 flex flex-col gap-y-5 w-2/4 justify-center items-center bg-white rounded-lg shadow-md dark:bg-gray-800">
        {loader && (
          <div className=" flex items-center  min-w-innerlay3 h-96 top-44 left-0 z-20 absolute ">
            <Loading />
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          action=""
          className="px-4 py-3 mb-8 flex flex-col gap-y-4"
        >
          <PageTitle>edit module</PageTitle>

          <Label>
            <FormRow
              type="text"
              name="questions"
              value={updatedQuestion.questions}
              handleChange={handleChange}
              className=" p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name={`a`}
              value={updatedQuestion.a}
              handleChange={handleChange}
              className=" p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name={`b`}
              value={updatedQuestion.b}
              handleChange={handleChange}
              className=" p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name={`c`}
              value={updatedQuestion.c}
              handleChange={handleChange}
              className=" p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name={`d`}
              value={updatedQuestion.d}
              handleChange={handleChange}
              className=" p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name="answer"
              value={updatedQuestion.answer}
              handleChange={handleChange}
              className=" p-2"
            />
          </Label>
          <FormRow
            type="file"
            accept="image/*"
            name="profile-image"
            // value={values.password}
            handleChange={handleImageFile}
            className=" p-2"
          />
          <div>
            {img && (
              <small style={{ color: "red" }}>
                image exceeds 1mb, choose another inage
              </small>
            )}
            {file === "" || file === undefined ? (
              ""
            ) : (
              <Image width={200} height={200} src={file} alt="image" />
            )}
          </div>
          <button type="submit">submit</button>
        </form>
        {/* <Label className="mt-6" check>
          <Input type="checkbox" />
          <span className="ml-2">
            I agree to the <span className="underline">privacy policy</span>
          </span>
        </Label> */}
      </div>
    </Modal>
  );
}

export default EditQuestion;
