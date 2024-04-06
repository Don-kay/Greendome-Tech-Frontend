"use client";
import React from "react";
import axios from "axios";
import ModuleView from "./moduleView";
import { useSelector, useDispatch } from "react-redux";
import { CourseconfirmationModal } from "../minuteComponents/confirmationModal";
import CreateModule from "./createModule";
import EditCourse from "./editCourse";
import functionsSpace from "../../../features/functions/functions";
import _ from "lodash";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import { HoverModal } from "../../../features/functions/functionSlice";
import { resetModule } from "../../../features/course/module/moduleSlice";
import { useRouter } from "next/navigation";
import Loading from "../layout_constructs/loading";
import { setLoading } from "../../../features/user/userSlice";
import Link from "next/link";
import moment from "moment";
import Greendome from "../../asset/greendome.jpg";
import InfoCard2 from "../../Cards/InfoCard 2";
import Image from "next/image";
import { useEffect, useState } from "react";

// async function fetchCourse() {
//   const cookiesStore = cookies();
//   const cookie = cookiesStore.get("myToken")?.value;

//   try {
//     const res = await customFetch.get(
//       "/course/admin/view-all-course",
//       {
//         headers: {
//           Cookie: "myToken=" + cookie,
//         },
//       },
//       { withCredentials: true }
//     );
//     const resp = { data: res.data, stats: res.status };
//     return resp.data;
//   } catch (error) {
//     return { msg: error?.response.data };
//   }
// }
const courseState = {
  name: "",
  id: "",
  fee: "",
  party_type: "",
  author: "",
  Serial_key: "",
  assigned_tutor: "",
  description: "",
  image: "",
  createdAt: "",
  updatedAt: "",
};
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
//

const ViewModules = ({ paramsId, paramsName }) => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [viewDisp, setViewDisp] = useState(false);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedmodule] = useState(initialState);
  const [paramName, setParamname] = useState(paramsName);
  const [courses, setCourse] = useState(courseState);
  const [questions, setQuestions] = useState([]);
  const [idy, setIdy] = useState();
  const [deleteHover, setDeleteHover] = useState(false);
  const [isLoaded, setIsloading] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    module: false,
    course: false,
    viewModule: false,
  });
  const [retrieve, setRetrieve] = useState("");
  const [moduleRetrieved, setModuleRetrieved] = useState(false);
  const { ishover } = useSelector((strore) => strore.functions);
  const { isLoading } = useSelector((strore) => strore.user);
  const [response, setResponse] = useState({ moduleMsg: "", questionMsg: "" });

  const moduleurl = "/panel/admin_dashboard/view-module";
  const url = "/panel/edit-question";
  const createurl = "/panel/admin_dashboard/create-module";
  const router = useRouter();
  // const url = "/panel/admin_dashboard/view-module";
  // const createurl = "/panel/admin_dashboard/create-module";
  //console.log(paramsId);
  //console.log(questions);
  // console.log(data);
  // const modules = data.filter((i) => i.classId === paramsId);
  // const course = data1.filter((i) => i._id === paramsId);
  const onModuleAdded = (moduleProp) => {
    setData([...modules, moduleProp]);
    setCount(modules.length + 1);
  };
  // if (courses.id === "") {
  //   dispatch(setLoading(true));
  // } else {
  //   dispatch(setLoading(false));
  // }

  useEffect(() => {
    setIsloading(true);
    const fetchCourse = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8000/greendometech/ng/course/admin/${paramsId}`,
          {
            withCredentials: true,
          }
        );

        const res = resp.data.course;
        const {
          name,
          _id,
          fee,
          party_type,
          author,
          Serial_key,
          assigned_tutor,
          description,
          image,
          createdAt,
          updatedAt,
        } = res;
        // console.log(res);
        //console.log(resp.data);
        dispatch(HoverModal(false));
        setRetrieve(resp.data);
        setCourse({
          name,
          id: _id,
          fee,
          party_type,
          author,
          Serial_key,
          assigned_tutor,
          description,
          image,
          createdAt,
          updatedAt,
        });
        setIsloading(false);
      } catch (error) {
        return { msg: error?.response.data };
      }
    };
    const fetchModule = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8000/greendometech/ng/module/admin/course/view-module/${paramsId}`,
          {
            withCredentials: true,
          }
        );

        const res = resp.data.modules;
        // console.log(res);
        // console.log(resp.data.modules);
        dispatch(HoverModal(false));
        setRetrieve(resp.data);
        setModules(res);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    const fetchQuestion = async () => {
      try {
        const question = await axios.get(
          `http://localhost:8000/greendometech/ng/module/assessment/admin/all-questions/${paramsId}`,
          {
            withCredentials: true,
          }
        );
        const questionData = question.data.question;

        // const course = res.filter((i) => i._id === paramid);
        // console.log(questionData);
        setQuestions(questionData);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    setDeleteHover(false);
    fetchCourse();
    fetchQuestion();
    fetchModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // const Done = () => {
  //   router.push(moduleurl, {
  //     shallow: true,
  //   });
  // };
  const addModule = () => {
    setModalOpen({ module: true });
    setTrigger(false);
  };

  const confirmDelete = async (id) => {
    //console.log(id);
    // let fetchCont = []
    const courseQuestions = questions.filter((i) => i.classId === id);
    const courseModules = modules.filter((i) => i.classId === id);
    setIsloading(true);
    try {
      await axios
        .all(
          courseQuestions.map((i) =>
            courseQuestions.length === 0
              ? null
              : axios.delete(
                  `http://localhost:8000/greendometech/ng/module/assessment/admin/questions/delete/${i._id}/${id}`,
                  {
                    withCredentials: true,
                  }
                )
          ),
          courseModules.map((i) =>
            courseModules.length === 0
              ? null
              : axios.delete(
                  `http://localhost:8000/greendometech/ng/module/admin-delete-module/${i._id}/${id}`,
                  {
                    withCredentials: true,
                  }
                )
          ),
          axios.delete(
            `http://localhost:8000/greendometech/ng/course/admin/delete/${id}`,
            {
              withCredentials: true,
            }
          )
        )
        .then(
          axios.spread(function (question, module, course) {
            console.log(question, module, course);
          })
        );
      //setResponse({ moduleMsg: data });
      setIsloading(false);
    } catch (error) {
      return error;
    }

    setTrigger(true);
    router.push(moduleurl, {
      shallow: true,
    });
  };
  const ignoreDelete = async () => {
    setDeleteHover(false);
  };

  const UpdateCourse = "/panel/admin-update-course";

  const {
    name,
    id,
    fee,
    party_type,
    author,
    Serial_key,
    assigned_tutor,
    description,
    image,
    createdAt,
    updatedAt,
  } = courses;

  //console.log(selectedModule);

  const ToggleModule = (id) => {
    setIdy(id);
    try {
      const moduler = modules.filter((i) => i._id === id);
      //console.log(moduler[0]);
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
      } = moduler[0];
      setRetrieve(moduler);
      if (_id !== "" || _id !== undefined) {
        setSelectedmodule({
          title,
          id: _id,
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
        setModuleRetrieved(true);
        setModalOpen({ viewModule: true });
      }
    } catch (error) {
      return { msg: error.response.data };
    }
  };
  const toggleMenu = () => {
    dispatch(HoverModal(true));
  };

  return (
    <main>
      <div className=" flex justify-start mt-8 mb-8  gap-x-5 cursor-pointer  flex-row">
        All Modules belonging
        <h3 className=" font-medium">{name}</h3>
      </div>
      <CreateModule
        onClosed={() => setModalOpen({ module: false })}
        isOpen={modalOpen.module}
        courseid={paramsId}
        course={courses}
        paramsName={paramName}
        // module={selectedModule}
        modules={modules}
        questions={questions}
        moduleid={idy}
        retrieve={retrieve}
        moduleRetrieved={moduleRetrieved}
        setQuestions={setQuestions}
        setModule={setModules}
        setTrigger={setTrigger}
        trigger={trigger}
      />
      <EditCourse
        onClosed={() => setModalOpen({ course: false })}
        isOpen={modalOpen.course}
        course={courses}
        modules={modules}
        setParamname={setParamname}
        setCourse={setCourse}
        courseParam={paramsId}
      />
      {modalOpen.viewModule ? (
        <ModuleView
          module={selectedModule}
          setModule={setSelectedmodule}
          coursename={paramName}
          modules={modules}
          courseid={paramsId}
          moduleid={idy}
          retrieve={retrieve}
          moduleRetrieved={moduleRetrieved}
          setModuleRetrieved={() => setModuleRetrieved(true)}
          setTrigger={setTrigger}
          trigger={trigger}
          questions={questions}
          setQuestions={setQuestions}
          setViewDisp={() => setModalOpen({ viewModule: false })}
        />
      ) : (
        <div>
          {deleteHover && (
            <div>
              <CourseconfirmationModal
                deleteModule={confirmDelete}
                retainModule={ignoreDelete}
                courseid={paramsId}
              />
            </div>
          )}
          <section className=" flex  gap-y-28 cursor-pointer  flex-col">
            {/* <Link href={`${createurl}/${paramsName}/${paramsId}`}>
          <div className=" flex justify-center items-center flex-row">
            <button>add module</button>
          </div>
        </Link> */}
            {isLoaded && (
              <div className=" flex items-center  min-w-innerlay3 h-96 top-52 left-20 z-20 absolute ">
                <Loading />
              </div>
            )}
            <div className="overflow-hidden flex flex-col gap-y-5 rounded-sm p-5 bg-whiteOpaque shadow-default dark:border-strokedark dark:bg-boxdark">
              {/* <h2 className=" text-greenGraded1 text-2xl ">{`welcome  ${username}, please view your profile`}</h2> */}
              <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                <div className="relative mx-auto h-30 w-full max-w-30 rounded-full bg-greenGradedHov p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                  <div className="relative flex flex-row top-10 justify-around item-center drop-shadow-2">
                    <div className=" flex items-center justify-center overflow-hidden h-28 w-32">
                      {image === undefined || image === "" ? (
                        <Image
                          width={100}
                          height={100}
                          src={Greendome}
                          alt="image"
                        />
                      ) : (
                        <Image
                          width={100}
                          height={100}
                          src={image}
                          alt="image"
                        />
                      )}
                    </div>
                    <button onClick={() => addModule()}> add module </button>
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
                          <h4 className=" font-bold">title:</h4> {name}
                        </div>
                        <div className=" flex flex-row gap-x-2">
                          <h4 className=" font-bold">serial-key:</h4>{" "}
                          {Serial_key}
                        </div>
                        <div className=" flex flex-row gap-x-2">
                          <h4 className=" font-bold">Author:</h4> {author}
                        </div>
                        <div className=" flex flex-row gap-x-2">
                          <h4 className=" font-bold">fee:</h4>
                          {fee}
                        </div>
                        <div className=" flex flex-row gap-x-2">
                          <h4 className=" font-bold">party-type:</h4>{" "}
                          {functionsSpace(party_type)}
                        </div>
                        {/* <div className=" flex flex-row gap-x-2">
                        <h4 className=" font-bold">assigned-tutor:</h4>
                        {assigned_tutor.length === 0 ? "none" : assigned_tutor}
                      </div> */}
                        <div className=" flex flex-row gap-x-2">
                          <h4 className=" font-bold">description:</h4>{" "}
                          {description}
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
            {/* {ishover && (
          )}  */}
            <div className=" relative flex my-5 justify-center items-center gap-12 flex-row">
              <button onClick={() => setDeleteHover(true)}>delete</button>
              <button onClick={(e) => setModalOpen({ course: true })}>
                Edit course
              </button>
            </div>

            {modules?.length === 0 ? (
              <div className=" flex justify-center items-center flex-row">
                <h1>no module created</h1>
              </div>
            ) : (
              <div className="grid gap-14 mb-8 sm:grid-cols-1 md:grid-cols-3">
                {modules?.map((item, id) => {
                  const { _id, title, image, code } = item;
                  const imageType =
                    image === undefined || image === "" ? "" : image;
                  // console.log(image);
                  return (
                    <div
                      className=" flex justify-center cursor-pointer overflow-x-hidden bg-greenGradedHov p-12 rounded-md mx-10 items-center flex-col hover:bg-whiteGraded"
                      key={id}
                    >
                      <div
                        className=""
                        onClick={() => ToggleModule(_id)}
                        key={id}
                      >
                        <InfoCard2
                          imageType={imageType}
                          value1={title}
                          sub1="title:"
                          value2={_id}
                          sub2="id:"
                          value3={code}
                          sub3="code"
                        />
                        {/* <Link href={`${moduleurl}/${paramName}/${paramsId}/${_id}`}>
                     
                    </Link> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* <button onClick={() => Done()}>Done</button> */}
          </section>
        </div>
      )}
    </main>
  );
};

export default ViewModules;
