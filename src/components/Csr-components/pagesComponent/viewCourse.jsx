"use client";
import React from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import StudentView1 from "./studentView1";
import functionsSpace from "../../../features/functions/functions";
import { CourseconfirmationModal } from "../minuteComponents/confirmationModal";
import CreateModule from "./createModule";
import EditCourse from "./editCourse";
import _ from "lodash";
import Modal from "react-modal";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import { HoverModal } from "../../../features/functions/functionSlice";
import { resetModule } from "../../../features/course/module/moduleSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Greendome from "../../asset/greendome.jpg";
import PageTitle from "../../typography/PageTitle";
import InfoCard2 from "../../Cards/InfoCard 2";
import Image from "next/image";
import customFetch, {
  customFetchProduction,
} from "../../../utilities/axios.js";
import { Fetch } from "../../../utilities/axios";
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
  id: "",
  email: "",
  country: "",
  mobilenumber: "",
  image: "",
  roles: "",
  certificate: "",
  classesId: "",
  firstname: "",
  lastname: "",
  username: "",
  biography: "",
  createdAt: "",
  updatedAt: "",
};
//

const ViewCourse = ({
  isOpen,
  onClosed,
  course,
  assignedTutors,
  assignedStudents,
  courseModules,
  courseId,
  setCourse,
}) => {
  const dispatch = useDispatch();
  const [modalOpen1, setModalOpen1] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [authCourses, setAuthCourses] = useState([]);
  const [Courses, setCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [singleuser, setSingleuser] = useState(initialState);
  const [status, setStatus] = useState("");
  const [userID, setUserID] = useState("");
  const { ishover } = useSelector((strore) => strore.functions);
  const [response, setResponse] = useState({ moduleMsg: "", questionMsg: "" });
  const moduleurl = "/panel/admin_dashboard/view-module";
  const url = "/panel/edit-question";
  const createurl = "/panel/admin_dashboard/create-module";
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;
  const router = useRouter();

  const Done = () => {};
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await Fetch.get("/course/admin/view-all-course", {
          withCredentials: true,
        });

        const courses = course.data.course;
        //console.log(courses);
        setCourses(courses);
      } catch (error) {
        return { msg: error?.response.data };
      }

      //   console.log(cookie);
    };
    const fetchProfiles = async () => {
      try {
        const profiles = await Fetch.get(`/auth/users`, {
          withCredentials: true,
        });
        //console.log(profiles);
        const users = profiles.data.user;
        setUsers(users);
        const status = profiles.status;
        setStatus(status);
        //  const {
        //    _id,
        //    email,
        //    country,
        //    mobilenumber,
        //    image,
        //    roles,
        //    certificate,
        //    classesId,
        //    firstname,
        //    lastname,
        //    username,
        //    biography,
        //    createdAt,
        //    updatedAt,
        //  } = users;
        //  const img = image === undefined || image === "" ? "" : image;

        //  const assinged = classesId;
        //  // const singleAss = assinged.flat(1);
        //  const paidCourses = Courses?.filter((i) => assinged.includes(i._id));
        //  setPaidCourses(paidCourses);
        //  console.log(users);
        //  setUsers({
        //    id: _id,
        //    email,
        //    country,
        //    mobilenumber,
        //    image: img,
        //    roles,
        //    certificate,
        //    classesId,
        //    firstname,
        //    lastname,
        //    username,
        //    biography,
        //    createdAt,
        //    updatedAt,
        //  });
      } catch (error) {
        return { msg: error?.response };
      }

      //   console.log(cookie);
    };

    // setDeleteHover(false);
    fetchCourse();
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const customStyles = {
    content: {
      position: "relative",
      top: "9vh",
      left: "18.5%",
      maxWidth: "80%",
      padding: "3%",
      overflow: "auto",
      maxHeight: "90vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 0,
    },
  };

  useEffect(() => {
    const state = setTimeout(() => {
      setUserID("");
      // setStatus(null);
    }, 1000);
    clearTimeout(state);
    // if (userID === "") {
    //   setModalOpen1(false);
    // } else if (userID !== "") {

    // }
  }, [userID]);

  const toggleHover = (id) => {
    setUserID(id);
    const singleProfile = users?.filter((i) => i.id === id);
    const ids = singleProfile?.map((i) => i.id);
    const email = singleProfile?.map((i) => i.email);
    const country = singleProfile?.map((i) => i.country);
    const mobilenumber = singleProfile?.map((i) => i.mobilenumber);
    const cert = singleProfile?.map((i) => i.certificate);
    const role = singleProfile?.map((i) => i.roles);
    const firstname = singleProfile?.map((i) => i.firstname);
    const lastname = singleProfile?.map((i) => i.lastname);
    const username = singleProfile?.map((i) => i.username);
    const image = singleProfile?.map((i) => i.image);
    const biography = singleProfile?.map((i) => i.biography);
    const createdAt = singleProfile?.map((i) => i.createdAt);
    const updatedAt = singleProfile?.map((i) => i.updatedAt);
    const certificate = cert.flat(1);
    const roles = role.flat(1);
    // console.log(_.toString(email));
    // console.log(certificate.flat(1));
    // console.log(roles);
    const classesId = singleProfile?.map((i) => i.classesId);
    const assinged = classesId;
    const singleAss = assinged?.flat(1);
    setSingleuser({
      id: _.toString(ids),
      email: _.toString(email),
      country: _.toString(country),
      mobilenumber: _.toString(mobilenumber),
      certificate: certificate,
      roles: roles,
      firstname: _.toString(firstname),
      lastname: _.toString(lastname),
      username: _.toString(username),
      image: _.toString(image),
      biography: _.toString(biography),
      createdAt: _.toString(createdAt),
      updatedAt: _.toString(updatedAt),
      classesId: _.toString(singleAss),
    });
    const paidCourses = Courses.filter((i) => singleAss.includes(i._id));
    setPaidCourses(paidCourses);
    const authorCourses = Courses?.filter((item) => item.createdBy === id);
    setAuthCourses(authorCourses);
    //console.log(authorCourses);
    setModalOpen1(true);
    setTrigger(true);
  };

  //console.log(singleuser);
  // useEffect(() => {

  // }, [trigger]);

  const AssignedTutors = assignedTutors?.map((item, idx) => {
    const { image, id, username, roles } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    const Roles = functionsSpace(roles);
    return (
      <div className=" my-3" key={idx}>
        {/* <StudentView
          onClosed={() => setModalOpen1(false)}
          isOpen={modalOpen1}
          studentid={id}
        /> */}
        <InfoCard2
          imageType={imageType}
          title="Tutors"
          value1={username}
          sub1="name:"
          value2={Roles}
          sub2="role:"
        />
      </div>
    );
  });
  const AssignedStudents = assignedStudents?.map((item, idx) => {
    const { image, id, username } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    return (
      <div key={idx} className="">
        <InfoCard2
          imageType={imageType}
          title="Students"
          value1={username}
          sub1="name:"
          toggleHover={toggleHover}
          id={id}
        />
        <button onClick={() => toggleHover(id)} className=" my-3" key={idx}>
          view
        </button>
      </div>
    );
  });
  const CourseModules = courseModules?.map((item, id) => {
    const { image, classId, className, code } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    return (
      <div className=" my-3" key={id}>
        <InfoCard2
          imageType={imageType}
          title="Modules"
          value1={classId}
          value2={className}
          value3={code}
          sub1="c-id:"
          sub2="c-name:"
          sub3="code:"
        />

        {/* {imageType !== "" ? (
          <div className=" flex justify-center items-center h-gallery1 overflow-hidden w-fit ">
            <Image
              className=" w-gallery1 h-gallery2"
              width={200}
              height={200}
              src={imageType}
              alt="image"
            />
          </div>
        ) : (
          <Image width={200} height={200} src={Greendome} alt="image" />
        )}
        <div
          key={id}
          className=" flex justify-start my-3 items-start flex-col gap-y-3"
        >
          <div className=" flex flex-row gap-x-2">
            <h4 className=" font-bold">C-id:</h4> {classId}
          </div>
          <div className=" flex flex-row gap-x-2">
            <h4 className=" font-bold">c-name:</h4> {className}
          </div>
          <div className=" flex flex-row gap-x-2">
            <h4 className=" font-bold">code:</h4> {code}
          </div>
        </div> */}
      </div>
    );
  });

  // const toggleMenu = () => {
  //   dispatch(HoverModal(true));
  // };

  return (
    <Modal
      className="rounded-md border-y-greenui overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 "
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      {/* <EditCourse
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        courseParam={courseId}
        setSingleCourse={setSingleCourse}
        setCourse={setCourse}
      /> */}
      {course?.map((i, id) => {
        const {
          name,
          Serial_key,
          author,
          image,
          fee,
          _id,
          party_type,
          description,
          createdAt,
          updatedAt,
        } = i;
        const imageType = image === undefined || image === "" ? "" : image;
        return (
          <section key={id}>
            {userID !== "" ? (
              <StudentView1
                onClosed={() => setModalOpen1(false)}
                isOpen={modalOpen1}
                data={authCourses}
                setData={setAuthCourses}
                paidCourses={paidCourses}
                singleUser={singleuser}
                setSingleuser={setSingleuser}
                studentid={userID}
              />
            ) : null}

            <button onClick={() => onClosed()}>Done</button>
            <div
              key={id}
              className=" flex justify-center items-center gap-y-20 flex-col"
            >
              <h1 className=" font-bold">{` ${name}`}</h1>
              <div className="grid gap-14 mb-8 sm:grid-cols-1 md:grid-cols-2">
                <div className=" p-5 max-w-addCourse flex items-center flex-col h-4/6 ">
                  {imageType !== "" ? (
                    <Image width={200} height={200} src={image} alt="image" />
                  ) : (
                    <Image
                      width={200}
                      height={200}
                      src={Greendome}
                      alt="image"
                    />
                  )}
                  <div className=" relative top-16 flex justify-center items-start gap-y-3 flex-col">
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">Id:</h4> {_id}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">Title:</h4> {name}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">Serial Key:</h4> {Serial_key}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">Author:</h4> {author}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">fee:</h4> {fee}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">Party_Type:</h4> {party_type}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">Description:</h4> {description}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">Created:</h4> {createdAt}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">Last Updated:</h4> {updatedAt}
                    </div>
                  </div>
                </div>
                <div className=" flex items-center flex-col h-card  bg-greenGradedHov rounded-md shadow-md shadow-gradedBack overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 ">
                  <PageTitle className=" my-6 text-xl">
                    assigned tutors
                  </PageTitle>
                  {assignedTutors?.length === 0 ? (
                    <h2 className=" relative top-40 text-greenGraded1 text-2xl">
                      no assigned tutor
                    </h2>
                  ) : (
                    AssignedTutors
                  )}
                </div>
                <div className=" flex items-center flex-col h-card  bg-greenGradedHov rounded-md shadow-md shadow-gradedBack overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 ">
                  <PageTitle className=" my-6 text-xl">modules</PageTitle>
                  {courseModules?.length === 0 ? (
                    <h2 className=" relative top-40 text-greenGraded1 text-2xl">
                      no module created
                    </h2>
                  ) : (
                    CourseModules
                  )}
                </div>
                <div className=" flex items-center flex-col h-card bg-greenGradedHov rounded-md shadow-md shadow-gradedBack overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 ">
                  <PageTitle className=" my-6 text-xl">
                    assigned students
                  </PageTitle>
                  {assignedStudents?.length === 0 ? (
                    <h2 className=" relative top-40 text-greenGraded1 text-2xl">
                      no assigned Student
                    </h2>
                  ) : (
                    AssignedStudents
                  )}
                </div>
              </div>
            </div>
            {/* <button onClick={() => setModalOpen(true)}>edit course</button> */}
            {/* {ishover && (
              <div>
                <button onClick={() => setDeleteHover(true)}>delete</button>
                <button onClick={(e) => setModalOpen({ course: true })}>
                  Edit course
                </button>
              </div>
            )} */}
          </section>
        );
      })}
    </Modal>
  );
};

export default ViewCourse;
