"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";
import customFetch from "../../../utilities/axios";
import Image from "next/image";
import Select from "react-select";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import EditQuestion from "./editQuestion2";
import Link from "next/link";
import Greendome from "../../asset/greendome.jpg";
import { resetErrorMsg } from "../../../features/course/module/moduleSlice";
import FormRow from "../../FormRow";
import _ from "lodash";

const questionsinitialStates = {
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  answer: "",
  image: "",
};
const initialState = {
  title: "",
  _id: "",
  status: "",
  party_type: "",
  level: "",
  completed: "",
  featured: "",
  description: "",
  code: "",
  image: "",
  content: "",
  createdBy: "",
  createdAt: "",
  updatedAt: "",
};

const CreateQuestion = ({
  paramsName,
  courseid,
  moduleid,
  isOpen,
  onClosed,
  Question,
  setQuestion,
  moduler,
}) => {
  const paramname = paramsName;
  const courseId = courseid;
  const [modules, setModules] = useState(initialState);
  const [questioner, setquestioners] = useState(questionsinitialStates);
  const [check, setCheck] = useState(null);
  const [modal, setModal] = useState({ show: false, msg: "", type: "" });
  const [modalOpen, setModalOpen] = useState(false);
  // const [Question, setQuestion] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [img, setImg] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [file, setFile] = useState();
  const { module, errorMsg, allQuestions } = useSelector(
    (strore) => strore.module
  );
  const router = useRouter();
  const disPatch = useDispatch();
  //console.log(paramname);

  const url = "/panel/admin_dashboard/view-module";
  const {
    _id,
    title,
    status,
    party_type,
    level,
    completed,
    featured,
    description,
    code,
    image,
    content,
    createdBy,
    createdAt,
    updatedAt,
  } = modules;
  //console.log(typeof image);

  const showModal = (show = false, msg = "", type = "") => {
    setModal(show, msg, type);
  };
  const Done = () => {
    router.push(`${url}/${paramname}/${courseId}/${moduleid}`, {
      shallow: true,
    });
  };

  const customStyles = {
    content: {
      position: "relative",
      top: "9vh",
      left: "18.5%",
      maxWidth: "80%",
      padding: "4%",
      overflow: "auto",
      maxHeight: "90vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 0,
    },
  };

  const deleteQuestion = async (_id) => {
    try {
      const question = await axios.delete(
        `http://localhost:8000/greendometech/ng/module/assessment/admin/delete-question/${_id}/${moduleid}`,
        {
          withCredentials: true,
        }
      );
      const questionData = question.data.questions;

      // // const course = res.filter((i) => i._id === paramid);
      // // console.log(questionData);
      // //   const updateQuestion = res.data.questions;
      const deletedId = questionData._id;
      const newQuestions = Question.filter((item) => item._id !== deletedId);
      setQuestion(newQuestions);
      // console.log(deletedId);
      // console.log(newQuestions);
      // console.log(question);
      setTrigger(true);
    } catch (error) {
      return { msg: error?.response };
    }
    // console.log(singleQuestion);
  };

  // const { _id, title } = module;
  // const moduleid = _id;
  // console.log(module);
  useEffect(() => {
    showModal({ show: false });
    disPatch(resetErrorMsg(""));
    // disPatch(getQuestions());

    try {
      const fetchModule = async () => {
        try {
          const resp = await axios.get(
            `http://localhost:8000/greendometech/ng/module/admin/view-module/${moduleid}`,
            {
              withCredentials: true,
            }
          );

          const res = resp.data.modules;
          const {
            title,
            _id,
            status,
            party_type,
            level,
            completed,
            featured,
            description,
            code,
            image,
            content,
            createdBy,
            createdAt,
            updatedAt,
          } = res;
          // console.log(res);
          setModules({
            title,
            _id,
            status,
            party_type,
            level,
            completed,
            featured,
            description,
            code,
            image,
            content,
            createdAt,
            createdBy,
            updatedAt,
          });
        } catch (error) {
          return console.log(error?.response);
        }
      };
      // const fetchQuestion = async () => {
      //   const res = await axios.get(
      //     `http://localhost:8000/greendometech/ng/module/assessment/all-questions/${moduleid}`,
      //     {
      //       withCredentials: true,
      //     }
      //   );
      //   const resp = res.data.question;
      //   setQuestion(resp);
      // };
      if (moduleid !== "" || moduleid !== undefined) {
        // fetchQuestion();
        fetchModule();
      } else {
        return;
      }

      // const fetchCourses = async () => {
      //   try {
      //     const resp = await axios.get(
      //       `http://localhost:8000/greendometech/ng/course/admin/${paramsId}`,
      //       {
      //         withCredentials: true,
      //       }
      //     );

      //     const Courses = resp.data.course;
      //     console.log(Courses);
      //     //  setData(Courses);
      //   } catch (error) {
      //     return { msg: error.response.data };
      //   }
      // };

      // fetchCourses();
    } catch (error) {
      return console.log(error?.response);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduler]);

  useEffect(() => {
    if (errorMsg?.msg !== undefined) {
      showModal({ show: true });
    }
    const timeout = setTimeout(() => {
      showModal({ show: false });
      disPatch(resetErrorMsg(""));
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg]);
  // useEffect(() => {
  //   if (file !== "" || file !== undefined) {
  //     setImg(false);
  //   }
  // }, [img]);

  const handleQuestionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setquestioners({ ...questioner, [name]: value });
  };
  const handleEditQuestion = (id) => {
    setModalOpen(true);
    setQuestionId(id);
  };

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;
    // console.log(file);

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      // console.log(file[0]?.name);
    } else if (
      file[0]?.size > 1024 * 1024 &&
      file[0].type.startsWith("image/")
    ) {
      setImg(true);
    }

    // setFile(file[0].name);
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

  // const handleSelectedFeatured = (selectedOptions) => {
  //   const label = selectedOptions.label;
  //   setFeaturedCont(label);
  // };

  // useEffect(() => {
  //   const mit = setTimeout(() => {
  //     if (errorMsg.msg !== undefined) {
  //       setModal(true);
  //     }
  //   }, 3000);
  //   return () => clearTimeout(mit);
  // }, [createModules]);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    // console.log("hello");
    // const { _id, title } = module;
    const { question, a, b, c, d, answer } = questioner;
    if (!question || !a || !b || !c || !d || !answer) {
      toast.error("please fill out all details");
      return;
    }
    const fileType = file === undefined ? "" : file;
    console.log(question);

    try {
      const res = await customFetch.post(
        `module/assessment/create_question/${moduleid}/${courseId}`,
        {
          question: question,
          option1: a,
          option2: b,
          option3: c,
          option4: d,
          answer: answer,
          image: fileType,
        },
        {
          withCredentials: true,
          credentials: "includes",
        }
      );
      const resp = { data: res.data, stats: res.status };
      console.log(resp);
      setFile("");
      setCheck(res.data.question);
      const questioner = res.data.question;
      setQuestion([...Question, questioner]);
      //reset input field
      setquestioners({ question: "", a: "", b: "", c: "", d: "", answer: "" });
      // setQuestion([...Question], resp.data.question);
    } catch (error) {
      return {
        msg: error.response,
      };
    }

    // disPatch(
    //   createQuestions({
    //     moduleId: moduleid,
    //     question: question,
    //     option1: a,
    //     option2: b,
    //     option3: c,
    //     option4: d,
    //     answer: answer,
    //   })
    // );
    // console.log(_id);
    // console.log(questioner.question);
    // const modules = await axios.get();
  };

  return (
    <Modal
      className={" flex justify-center items-center flex-col"}
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      <section className=" relative top-64 ">
        <div className=" relative flex top-8  justify-center items-center gap-72 flex-row">
          <h2>{`Module: ${title} `}</h2>
          <div>
            {image === undefined || image === "" ? (
              <Image width={200} height={200} src={Greendome} alt="image" />
            ) : (
              <Image width={200} height={200} src={image} alt="image" />
            )}
          </div>
          <button onClick={() => onClosed()}>Done</button>
        </div>

        <div className=" relative top-24 flex justify-around items-center gap-10 flex-row ">
          <div className=" flex justify-center items-start gap-y-7 flex-col ">
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">title:</h3>
              <h2 className=" text-17"> {title}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">title:</h3>
              <h2 className=" text-17"> {_id}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">status:</h3>
              <h2 className=" text-17"> {status}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">party:</h3>
              <h2 className=" text-17"> {party_type}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">level: </h3>
              <h2 className=" text-17"> {level}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">completed:</h3>
              <h2 className=" text-17"> {_.toString(completed)}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">featured:</h3>
              <h2 className=" text-17"> {_.toString(featured)}</h2>
            </div>
          </div>

          <div className="  flex  justify-center items-start gap-y-7 flex-col ">
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">description:</h3>
              <h2 className=" text-17"> {description}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">code:</h3>
              <h2 className=" text-17"> {code}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">content:</h3>
              <h2 className=" text-17"> {content}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">createdBy:</h3>
              <h2 className=" text-17"> {createdBy}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">createdAt: </h3>
              <h2 className=" text-17"> {createdAt}</h2>
            </div>
            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
              <h3 className=" font-medium">updatedAt:</h3>
              <h2 className=" text-17"> {updatedAt}</h2>
            </div>
          </div>
        </div>
      </section>
      <section className=" relative flex my-2 top-96 justify-center items-center flex-col">
        <div>set questions</div>
        <form
          className=" relative top-5 flex justify-center items-start gap-y-3 flex-col"
          action=""
          onSubmit={handleSubmitQuestion}
        >
          <FormRow
            type="file"
            accept="image/*"
            name="profile-image"
            // value={values.password}
            handleChange={handleImageFile}
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
          <FormRow
            type="text"
            name="question"
            value={questioner.question}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="a"
            value={questioner.a}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="b"
            value={questioner.b}
            handleChange={handleQuestionChange}
          />

          <FormRow
            type="text"
            name="c"
            value={questioner.c}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="d"
            value={questioner.d}
            //   check={featured}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="answer"
            value={questioner.answer}
            //   check={featured}
            handleChange={handleQuestionChange}
          />
        </form>
        <button style={{ position: "relative", top: "5vh", zIndex: 20 }}>
          create
        </button>
      </section>
      <div>
        <EditQuestion
          onClosed={() => setModalOpen(false)}
          isOpen={modalOpen}
          moduleParam={moduleid}
          courseid={courseid}
          paramName={paramname}
          questionParam={questionId}
          Questions={Question}
          setQuestion={setQuestion}
        />
      </div>
      {Question?.length === 0 ? (
        <h1 className=" relative flex my-2 top-80 justify-center items-center">
          no question has been created
        </h1>
      ) : (
        <section className=" grid grid-cols-3 gap-x-20 relative top-96">
          {Question?.map((item, id) => {
            const {
              _id,
              image,
              question,
              option1,
              option2,
              option3,
              option4,
              answer,
              createdAt,
              updatedAt,
            } = item;

            // console.log(image);

            const url = "/panel/create-page-edit-question";
            return (
              <div className=" relative top-44 " key={id}>
                <div className=" flex justify-center items-start gap-y-3 flex-col ">
                  <div key={id}>
                    {image !== "" && (
                      <Image width={200} height={200} src={image} alt="image" />
                    )}
                  </div>

                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium">questions:</h3>
                    <h2 className=" text-17"> {question}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium">questionsId:</h3>
                    <h2 className=" text-17"> {_id}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium">{`"(a)."`}</h3>
                    <h2 className=" text-17"> {option1}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium">{`"(b)."`}</h3>
                    <h2 className=" text-17"> {option2}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium">{`"(c)."`}</h3>
                    <h2 className=" text-17"> {option3}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium">{`"(d)."`}</h3>
                    <h2 className=" text-17"> {option4}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium">answer:</h3>
                    <h2 className=" text-17"> {answer}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium">createdAt: </h3>
                    <h2 className=" text-17"> {createdAt}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium"> updatedAt:</h3>
                    <h2 className=" text-17"> {updatedAt}</h2>
                  </div>
                </div>

                <div className=" relative flex my-5 justify-center items-center gap-12 flex-row">
                  <button onClick={(e) => handleEditQuestion(_id)}>Edit</button>{" "}
                  <button onClick={() => deleteQuestion(_id)}>delete</button>
                </div>

                {/* <Link
                key={id}
                href={`${url}/${paramname}/${courseId}/${moduleid}/${_id}`}
              >
                <button>Edit</button>
              </Link> */}
              </div>
            );
          })}
        </section>
      )}
    </Modal>
  );
};

export default CreateQuestion;
