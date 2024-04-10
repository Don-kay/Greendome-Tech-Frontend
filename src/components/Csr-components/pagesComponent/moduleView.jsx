"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import customFetch, { customFetchProduction } from "../../../utilities/axios";
import { Fetch } from "../../../utilities/axios";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationModal from "../minuteComponents/confirmationModal";
import _ from "lodash";
import Loading from "../layout_constructs/loading";
import Image from "next/image";
import EditQuestion from "./editQuestion2";
import EditModule from "./editModule";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import Greendome from "../../asset/greendome.jpg";
import PageTitle from "../../typography/PageTitle";
import { HoverModal } from "../../../features/functions/functionSlice";
import { Label } from "@roketid/windmill-react-ui";
import functionsSpace from "../../../features/functions/functions";
import InfoCard2 from "../../Cards/InfoCard 2";
import moment from "moment";
import { useRouter } from "next/navigation";
import FormRow from "../../FormRow";

const initialState = {
  title: "",
  id: "",
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
const questionsinitialStates = {
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  answer: "",
  image: "",
};
const ModuleView = ({
  coursename,
  courseid,
  moduleid,
  module,
  modules,
  setModule,
  moduleRetrieved,
  setModuleRetrieved,
  retrieve,
  setTrigger,
  questions,
  setQuestions,
  setViewDisp,
  trigger,
}) => {
  const dispatch = useDispatch();
  // const [modules, setModules] = useState(initialState);
  // const [question, setQuestion] = useState();
  const [questionId, setQuestionId] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedModule, setSelectedModule] = useState([]);
  const [questioner, setquestioners] = useState(questionsinitialStates);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [moduleQuestion, setModuleQuestion] = useState([]);
  const [deleteHover, setDeleteHover] = useState(false);
  const [img, setImg] = useState(false);
  const [file, setFile] = useState();
  const [modalOpen, setModalOpen] = useState({
    setQuestion: false,
    editQuestion: false,
    editModule: false,
  });
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;

  const { ishover } = useSelector((strore) => strore.functions);

  const [response, setResponse] = useState({ moduleMsg: "", questionMsg: "" });
  const moduleurl = "/panel/admin_dashboard/view-module";
  const url = "/panel/edit-question";
  const createurl = "/panel/admin_dashboard/create-module";
  const router = useRouter();

  useEffect(() => {
    setModuleQuestion(questions?.filter((i) => i.moduleId === moduleid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleRetrieved]);
  // console.log(questions);
  // console.log(moduleQuestion);
  // useEffect(() => {
  //   const fetchQuestion = async () => {
  //     try {
  //       const question = await axios.get(
  //         `http://localhost:8000/greendometech/ng/module/assessment/all-questions/${moduleid}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       const questionData = question.data.question;

  //       // const course = res.filter((i) => i._id === paramid);
  //       //console.log(questionData);
  //       setQuestion(questionData);
  //     } catch (error) {
  //       return { msg: error.response.data };
  //     }
  //   };
  //   setDeleteHover(false);
  //   fetchQuestion();
  // }, [trigger]);
  // const paramID = course.id;
  const paramName = coursename;
  // console.log(courseid);
  // console.log(paramName);
  // console.log(paramID);
  //console.log(selectedModule);

  const confirmDelete = async (id) => {
    // console.log(id);
    // let fetchCont = [];
    try {
      await axios
        .all(
          moduleQuestion.map((i) => {
            moduleQuestion.length === 0
              ? null
              : Fetch.delete(
                  `/module/assessment/admin/delete-question/${i._id}/${id}`,
                  {
                    withCredentials: true,
                  }
                );
          }),
          Fetch.delete(`/module/admin-delete-module/${id}`, {
            withCredentials: true,
          })
        )
        .then(
          axios.spread(function (questions, module) {
            ///console.log(questions, module);
            //console.log(true);
            setModule({
              title: "",
              id: "",
              status: "",
              party_type: "",
              level: "",
              completed: "",
              featured: "",
              description: "",
              code: "",
              image: "",
              content: "",
              createdAt: "",
              createdBy: "",
              updatedAt: "",
            });
            setTrigger(true);
            setDeleteHover(false);
            setViewDisp();
          })
        );
    } catch (error) {
      return error.repsonse;
    }
    // for (let i = 0; i < question.length; i++) {
    //   // console.log(question[i]._id);
    //     const question = axios.delete(
    //       `http://localhost:8000/greendometech/ng/module/assessment/admin/questions/delete/${question[i]._id}/${id}`,
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     fetchCont.push(question)
    //     // console.log(resp.data.msg);
    //     // setResponse({ questionMsg: resp.data.msg });
    //   // } catch (error) {
    //   //   return { msg: error.response };
    //   // }
    // }

    // router.push(`${moduleurl}/${coursename}/${courseid}`, {
    //   shallow: true,
    // });
  };
  const ignoreDelete = async () => {
    setDeleteHover(false);
  };
  const Done = () => {
    setViewDisp();
  };

  const deleteQuestion = async (_id) => {
    setTrigger(true);
    try {
      const question = await Fetch.delete(
        `/module/assessment/admin/delete-question/${_id}/${moduleid}`,
        {
          withCredentials: true,
        }
      );
      const questionData = question.data.questions;

      // // const course = res.filter((i) => i._id === paramid);
      // // console.log(questionData);
      // //   const updateQuestion = res.data.questions;
      const deletedId = questionData._id;
      const newQuestions = moduleQuestion.filter(
        (item) => item._id !== deletedId
      );
      setQuestions(newQuestions);
      setModuleQuestion(newQuestions);
      // if (deletedId !== "") {
      //   setDeleteHover(true);
      // }
      // setQuestion(newQuestions);
      // console.log(deletedId);
      // console.log(newQuestions);
      // console.log(question);
      setTrigger(true);
    } catch (error) {
      return { msg: error?.response };
    }
    // console.log(singleQuestion);
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

  const handleEditModule = () => {
    setSelectedModule(modules.filter((i) => i._id === id));
    setModalOpen({ editModule: true });
  };
  const handleEditQuestion = (id) => {
    const question = questions?.filter((i) => i._id === id);
    setTrigger(true);
    setSelectedQuestions(question);

    setModalOpen(true);
    setQuestionId(id);
    setModalOpen({ editQuestion: true });
  };

  const handleQuestionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setquestioners({ ...questioner, [name]: value });
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    // console.log("hello");
    // const { _id, title } = module;
    const { question, a, b, c, d, answer } = questioner;
    if (!question || !a || !b || !c || !d || !answer) {
      toast.error("please fill out all details");
      setLoader(false);
      return;
    } else {
      setError(true);
      setLoader(true);
    }

    const fileType = file === undefined ? "" : file;
    //console.log(question);

    try {
      const res = await Fetch.post(
        `module/assessment/create_question/${moduleid}/${courseid}`,
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
        setTrigger(true);
      }
      //console.log(resp);
      setFile("");
      // setCheck(res.data.question);
      const questioner1 = res.data.question;
      //reset input field
      setquestioners({
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        answer: "",
      });
      // setQuestions([...questions, questioner1]);
      setModuleQuestion([...moduleQuestion, questioner1]);
      setModuleRetrieved();
      // setQuestion([...questions, questioner1]);

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
  // const question = questions.question;
  // const questionCount = questions.count;

  const {
    title,
    id,
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
  } = module;

  const toggleMenu = () => {
    dispatch(HoverModal(true));
  };
  const imageType = image === undefined || image === "" ? "" : image;

  // const courseProp = { data: Courses.modules, count: Courses.count };
  // const mod = courseProp.data;
  // // console.log(data);
  // const modules = mod.filter((i) => i._id === moduleId);
  // console.log(modules);
  return (
    <main className=" relative flex flex-col justify-center items-center h-full p-20">
      <EditQuestion
        onClosed={() => setModalOpen({ editQuestion: false })}
        isOpen={modalOpen.editQuestion}
        moduleParam={moduleid}
        courseid={courseid}
        paramName={paramName}
        questionParam={questionId}
        Questions1={moduleQuestion}
        Question={selectedQuestions}
        setModuleQuestion={setModuleQuestion}
        // setQuestion={setQuestion}
        setQuestions={setQuestions}
      />
      <EditModule
        onClosed={() => setModalOpen({ editModule: false })}
        isOpen={modalOpen.editModule}
        setTrigger={setTrigger}
        paramName={paramName}
        courseId={courseid}
        module={module}
        moduleRetrieved={moduleRetrieved}
        setModule={setModule}
      />
      {deleteHover && (
        <div>
          <ConfirmationModal
            deleteModule={confirmDelete}
            retainModule={ignoreDelete}
            moduleid={moduleid}
          />
        </div>
      )}

      {retrieve === "" || retrieve === undefined ? (
        <h1>sorry module doesnt exist {response.moduleMsg}</h1>
      ) : (
        <section className=" relative flex flex-col -top-10 gap-y-3 justify-center items-center">
          <div className="overflow-hidden flex flex-col gap-y-5 rounded-sm p-5 bg-whiteOpaque shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <h2 className=" text-greenGraded1 text-2xl ">{`welcome  ${username}, please view your profile`}</h2> */}
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div className="relative mx-auto h-30 w-full max-w-30 rounded-full bg-greenGradedHov p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative flex flex-row top-10 justify-around item-center drop-shadow-2">
                  <div className=" flex items-center justify-center overflow-hidden h-28 w-32">
                    {imageType !== "" ? (
                      <Image
                        width={100}
                        height={100}
                        src={imageType}
                        alt="image"
                      />
                    ) : (
                      <Image
                        width={100}
                        height={100}
                        src={Greendome}
                        alt="image"
                      />
                    )}
                  </div>
                  <PageTitle>{`questions set to ${title}`}</PageTitle>
                  <button
                    className=" font-medium relative top-0"
                    onClick={() => Done()}
                  >
                    go back
                  </button>
                </div>
              </div>
              <div className=" relative -top-12">
                <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-2 rounded-md  py-2.5 shadow-1 dark:border-strokedark dark:">
                  {/* <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"></div> */}
                  <div className=" relative top-5 flex justify-around items-center p-14 gap-y-3 flex-col">
                    <div className=" relative top-5 flex justify-center max-w-addCourse items-start gap-y-3 flex-col">
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">id:</h4> {id}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">author:</h4> {createdBy}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">title:</h4> {title}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">status:</h4> {status}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">party:</h4>{" "}
                        {functionsSpace(party_type)}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">level:</h4>
                        {level}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">completed:</h4>
                        {_.toString(completed)}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">featured:</h4>
                        {_.toString(featured)}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">code:</h4>
                        {code}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">content:</h4>
                        {content}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">created:</h4>{" "}
                        {moment(createdAt).format("YYYY-MM-DD HH:MM:SS")}
                      </div>
                      <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">updated:</h4>{" "}
                        {moment(updatedAt).format("YYYY-MM-DD HH:MM:SS")}
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
          <div className=" flex items-center  gap-x-10">
            <button className=" relative top-0" onClick={() => toggleMenu()}>
              update module
            </button>
          </div>

          {ishover && (
            <div className=" relative flex my-5 top-0 justify-center items-center gap-12 flex-row">
              <button onClick={() => setDeleteHover(true)}>delete</button>
              <button onClick={() => handleEditModule()}>update</button>
            </div>
          )}
        </section>
      )}

      {loader && (
        <div className=" flex items-center  min-w-innerlay3 h-96 left-0 z-20 absolute ">
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
        {/* <div>
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
        </div> */}
      </div>
      {moduleQuestion?.length === 0 ? (
        <h1 className="relative top-0">
          no question has been set{response.questionMsg}
        </h1>
      ) : (
        <div className=" grid grid-cols-3 gap-x-20 gap-y-14 relative top-0">
          {moduleQuestion?.map((item, id) => {
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
              className,
            } = item;
            const imageType = image === undefined || image === "" ? "" : image;
            return (
              <div className="relative rounded-md p-6 bg-white top-0" key={id}>
                <InfoCard2
                  imageType={imageType}
                  value1={question}
                  sub1="question:"
                  value2={_id}
                  sub2="id:"
                  value3={option1}
                  sub3="a."
                  value4={option2}
                  sub4="b."
                  value5={option3}
                  value6={option4}
                  value7={answer}
                  value8={moment(createdAt).format("YYYY-MM-DD HH:MM:SS")}
                  value9={moment(updatedAt).format("YYYY-MM-DD HH:MM:SS")}
                  sub5="c."
                  sub6="d."
                  sub7="answer"
                  sub8="created"
                  sub9="updated"
                />
                <div className=" relative flex my-5 justify-center items-center gap-12 flex-row">
                  <button onClick={(e) => handleEditQuestion(_id)}>Edit</button>{" "}
                  <button onClick={() => deleteQuestion(_id)}>delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default ModuleView;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
