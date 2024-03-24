"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";
import customFetch from "../../../utilities/axios";
import Image from "next/image";
import Select from "react-select";
import Loading from "../layout_constructs/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import EditQuestion from "./editQuestion2";
import PageTitle from "../../typography/PageTitle";
import { Input, HelperText, Label, Textarea } from "@roketid/windmill-react-ui";
import functionsSpace from "../../../features/functions/functions";
import InfoCard2 from "../../Cards/InfoCard 2";
import Link from "next/link";
import Greendome from "../../asset/greendome.jpg";
import { resetErrorMsg } from "../../../features/course/module/moduleSlice";
import moment from "moment";
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
  module1,
  moduler,
  setQuestion,
  Question,
  setModuleQuestion,
  setModuleRetrieved,
}) => {
  const paramname = paramsName;
  const courseId = courseid;
  const [modules, setModules] = useState([]);
  const [questioner, setquestioners] = useState(questionsinitialStates);
  const [check, setCheck] = useState(null);
  const [modal, setModal] = useState({ show: false, msg: "", type: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
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
  // const {
  //   _id,
  //   title,
  //   status,
  //   party_type,
  //   level,
  //   completed,
  //   featured,
  //   description,
  //   code,
  //   image,
  //   content,
  //   createdBy,
  //   createdAt,
  //   updatedAt,
  // } = module1;
  //console.log(module1);

  const selectModule = modules.filter((i) => i._id === moduleid);

  //console.log(selectModule);

  const showModal = (show = false, msg = "", type = "") => {
    setModal(show, msg, type);
  };
  const Done = () => {
    onClosed();

    // router.push(`${url}/${paramname}/${courseId}`, {
    //   shallow: true,
    // });
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
      const newQuestions = questions.filter((item) => item._id !== deletedId);
      setQuestions(newQuestions);
      setModuleQuestion(newQuestions);
      setModuleRetrieved();
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

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const question = await axios.get(
          `http://localhost:8000/greendometech/ng/module/assessment/all-questions/${moduleid}`,
          {
            withCredentials: true,
          }
        );
        const questionData = question.data.question;

        // const course = res.filter((i) => i._id === paramid);
        //console.log(questionData);
        setQuestions(questionData);
      } catch (error) {
        return { msg: error.response.data };
      }
    };

    fetchQuestion();
  }, [moduleid]);

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
            `http://localhost:8000/greendometech/ng/module/admin/course/view-module/${courseId}`,
            {
              withCredentials: true,
            }
          );

          const res = resp.data.modules;
          // console.log(res);
          // console.log(resp.data.modules);
          // setRetrieve(resp.data);
          setModules(res);
        } catch (error) {
          return { msg: error.response.data };
        }
      };
      // const fetchModule = async () => {
      //   try {
      //     const resp = await axios.get(
      //       `http://localhost:8000/greendometech/ng/module/admin/view-module/${moduleid}`,
      //       {
      //         withCredentials: true,
      //       }
      //     );

      //     const res = resp.data.modules;
      //     const {
      //       title,
      //       _id,
      //       status,
      //       party_type,
      //       level,
      //       completed,
      //       featured,
      //       description,
      //       code,
      //       image,
      //       content,
      //       createdBy,
      //       createdAt,
      //       updatedAt,
      //     } = res;
      //     // console.log(res);
      //     setModules({
      //       title,
      //       _id,
      //       status,
      //       party_type,
      //       level,
      //       completed,
      //       featured,
      //       description,
      //       code,
      //       image,
      //       content,
      //       createdAt,
      //       createdBy,
      //       updatedAt,
      //     });
      //   } catch (error) {
      //     return console.log(error?.response);
      //   }
      // };
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
      return error?.response;
    }
  }, [moduler, check, trigger]);

  useEffect(() => {
    if (errorMsg?.msg !== undefined) {
      showModal({ show: true });
    }
    const timeout = setTimeout(() => {
      showModal({ show: false });
      disPatch(resetErrorMsg(""));
    }, 5000);

    return () => clearTimeout(timeout);
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
    const question = questions?.filter((i) => i._id === id);
    setSelectedQuestions(question);
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
    } else {
      setError(true);
    }
    setLoader(true);
    const fileType = file === undefined ? "" : file;
    //console.log(question);

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
      if (resp.stats === 201) {
        setLoader(false);
      }
      console.log(resp);
      setFile("");
      setCheck(res.data.question);
      const questioner1 = res.data.question;
      //reset input field
      setquestioners({ question: "", a: "", b: "", c: "", d: "", answer: "" });
      setQuestions([...questions, questioner1]);
      setModuleQuestion([...questions, questioner1]);
      setModuleRetrieved();
      setQuestion([...questions, questioner1]);

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
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <div className=" relative  flex flex-col gap-y-5 rounded-sm p-5 bg-whiteOpaque shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* <h2 className=" text-greenGraded1 text-2xl ">{`welcome  ${username}, please view your profile`}</h2> */}
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative mx-auto w-full max-w-30 rounded-full bg-greenGradedHov p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative flex flex-row top-10 justify-around item-center drop-shadow-2">
              <div className=" flex items-center justify-center overflow-hidden h-28 w-32">
                {module1?.image === undefined || module1?.image === "" ? (
                  <Image width={100} height={100} src={Greendome} alt="image" />
                ) : (
                  <Image
                    width={100}
                    height={100}
                    src={module1?.image}
                    alt="image"
                  />
                )}
              </div>
              <PageTitle>{module1?.title}</PageTitle>
              <button onClick={() => Done()}>Done</button>
            </div>
          </div>
          <div className=" relative">
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-2 rounded-md  py-2.5 shadow-1 dark:border-strokedark dark:">
              {/* <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"></div> */}
              <div className=" relative top-5 flex justify-around items-center p-14 gap-y-3 flex-col">
                <div className=" relative top-5 flex justify-center max-w-addCourse items-start gap-y-3 flex-col">
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">title:</h4> {module1?.title}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">code:</h4> {module1?.code}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">status:</h4> {module1?.status}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">party:</h4>
                    {functionsSpace(module1?.party_type)}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">level:</h4>
                    {module1?.level}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">completed:</h4>
                    {_.toString(module1?.completed)}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">featured:</h4>
                    {_.toString(module1?.featured)}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">description:</h4>
                    {module1?.description}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">content:</h4> {module1?.content}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">Author:</h4> {module1?.createdBy}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">createdAt:</h4>{" "}
                    {moment(module1?.createdAt).format("YYYY-MM-DD HH:MM:SS")}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">updated:</h4>{" "}
                    {moment(module1?.updatedAt).format("YYYY-MM-DD HH:MM:SS")}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=" relative top-10">
                <p>Edit Profile</p>
                <button onClick={() => setModalOpen({ editProfile: true })}>
                  <AiFillSetting />
                </button>
              </div> */}
          </div>
        </div>
      </div>
      {loader && (
        <div className=" flex items-center  min-w-innerlay3 h-96 top-full left-0 z-20 absolute ">
          <Loading />
        </div>
      )}
      <div className=" relative flex top-0 justify-center ">
        <form className="px-4 py-3 mb-8 flex flex-col gap-y-4" action="">
          <PageTitle>set questions</PageTitle>
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
          <Label>
            <FormRow
              type="text"
              name="question"
              value={questioner.question}
              handleChange={handleQuestionChange}
              className=" w-80 p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name="a"
              value={questioner.a}
              handleChange={handleQuestionChange}
              className=" w-72 p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name="b"
              value={questioner.b}
              handleChange={handleQuestionChange}
              className=" w-72 p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name="c"
              value={questioner.c}
              handleChange={handleQuestionChange}
              className=" w-72 p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name="d"
              value={questioner.d}
              //   check={featured}
              handleChange={handleQuestionChange}
              className=" w-72 p-2"
            />
          </Label>
          <Label>
            <FormRow
              type="text"
              name="answer"
              value={questioner.answer}
              //   check={featured}
              handleChange={handleQuestionChange}
              className=" w-72 p-2"
            />
          </Label>
          <button onClick={handleSubmitQuestion} type="submit">
            create
          </button>
        </form>
        <div>
          <EditQuestion
            onClosed={() => setModalOpen(false)}
            isOpen={modalOpen}
            moduleParam={moduleid}
            courseid={courseid}
            paramName={paramname}
            questionParam={questionId}
            Questions={Question}
            Questions1={questions}
            Question={selectedQuestions}
            setQuestions={setQuestions}
            setQuestion={setQuestion}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateQuestion;
