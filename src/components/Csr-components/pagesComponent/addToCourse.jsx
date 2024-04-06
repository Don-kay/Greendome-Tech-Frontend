"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import CourseHover from "../minuteComponents/courseHover";
import CourseHover1 from "../minuteComponents/courseHover1";
import Link from "next/link";
import _ from "lodash";
import Loading from "../layout_constructs/loading";
import Image from "next/image";
import Greendome from "../../asset/greendome.jpg";

const AllCourseDisp = ({ params }) => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState([]);
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [trigger, setTrigger] = useState(false);
  const [id1, setId1] = useState();
  const [studentCourses, setStudentCourses] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [modalOpen1, setModalOpen1] = useState(false);
  const [studentCourse, setStudentCourse] = useState();
  const [studentCourse1, setStudentCourse1] = useState();
  const { users, errorMsg } = useSelector((strore) => strore.profiles);
  const { user } = useSelector((strore) => strore.user);
  const loggedInUser = users?.filter((i) => i.id === params);
  const classesId = loggedInUser?.map((i) => i.classesId);
  const assinged = classesId;
  const singleAss = assinged?.flat(1);
  const [dispCourse, setDispCourse] = useState(false);

  const url = "/panel/admin_dashboard/view-module";
  const route = "/panel/admin_dashboard/all-students";
  // console.log(params);

  const container = useRef(null);

  useEffect(() => {
    dispatch(GetAllUsers());

    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/greendometech/ng/auth/users",
          {
            withCredentials: true,
          }
        );
        const userResp = res.data.user;
        //console.log(userResp);
        const resp = await axios.get(
          "http://localhost:8000/greendometech/ng/course/admin/view-all-course",

          {
            withCredentials: true,
            credentials: "includes",
          }
        );

        const Courses = resp.data.course;
        // console.log(Courses);

        const student = userResp.filter((item) => item.id === params);
        const studentName = student.map((i) => {
          return i.username;
        });
        const studentClas = student.map((i) => {
          return i.classesId;
        });
        //console.log(studentClas);
        const studentClasses = studentClas[0];

        const studentsCourses = Courses.filter((i) =>
          studentClasses.includes(i._id)
        );
        //console.log(studentsCourses);
        setName(_.toString(studentName));
        // console.log(studentClas);
        // console.log(studentClasses);
        // setStudentClass(userClasses)
        // console.log(studentsCourses);
        setStudentCourses(studentsCourses);

        // const allAttendees = s.map((item) => {
        //   return {
        //     id: item.id,
        //     email: item.email,
        //     username: item.username,
        //     firstname: item.firstname,
        //     roles: _.toString(item.roles),
        //     lastname: item.lastname,
        //   }});
        setCourse(Courses);
      } catch (error) {
        return { msg: error.response.data };
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id1]);

  const AddToCourse = async (_id) => {
    axios.defaults.withCredentials = true;
    try {
      const resp = await axios.put(
        `http://localhost:8000/greendometech/ng/course/myclasses/assign-students/${params}/classes/${_id}`,
        {
          method: "PUT",
          withCredentials: true,
          credentials: "includes",
        }
      );

      const userClasses = resp.data.user.classesId;
      const studentsCourses = course.filter((i) => userClasses.includes(i._id));

      // setStudentClass(userClasses)
      //console.log(userClasses);
      setStudentCourses(studentsCourses);
      setId1(_id);
    } catch (error) {
      return { msg: error.response.data };
    }
  };
  const RemoveCourse = async (id) => {
    axios.defaults.withCredentials = true;
    try {
      const resp = await axios.put(
        `http://localhost:8000/greendometech/ng/course/myclasses/unassign-students/${params}/classes/${id}`,
        {
          method: "PUT",
          withCredentials: true,
          credentials: "includes",
        }
      );

      const userClasses = resp.data.user.classesId;
      const studentsCourses = course.filter((i) => userClasses.includes(i._id));

      // setStudentClass(userClasses)
      //console.log(userClasses);
      //setTrigger(true);
      setModalOpen(false);
      setStudentCourses(studentsCourses);
    } catch (error) {
      return { msg: error.response.data };
    }
  };
  const CourseView = (_id) => {
    setId(_id);
    setModalOpen(true);
  };
  const displayHov = (e) => {
    // const item = e.target.textContext;
    // const tempBtn = e.target.getBoundingClientRect();
    // const center = (tempBtn.left + tempBtn.right) / 2;
    // const bottom = tempBtn.bottom - 3;
    // //console.log(tempBtn);
    // // console.log(item);
    // setLocation({ center, bottom });
    setModalOpen1(true);
    // setModalOpen1(true);
  };
  const closedisplay = () => {
    setModalOpen1(false);
    // setDispCourse(false);
  };
  const displayInfo = (_id) => {
    setId1(_id);
  };
  useEffect(() => {
    if (id !== "") {
      const dataHov = studentCourses?.filter((i) => i._id === id);
      const singleCourse = dataHov?.map((item) => {
        return {
          id: item._id,
          image: item.image,
          name: item.name,
          Serial_key: item.Serial_key,
          author: item.author,
          fee: item.fee,
          Party_Type: item.party_type,
          description: item.description,
          // <h3>Content: {item.content}</h3>
          // <h3>Content: {item.content1}</h3>
          // <h3>Content: {item.content2}</h3>
          // <h3>Content: {item.content3}</h3>
          // <h3>Content: {item.content4}</h3>
          // {cont}
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      setStudentCourse(singleCourse);
      // console.log(dataHov);
      // console.log(singleCourse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (id1 !== "") {
      const dataHov = course?.filter((i) => i._id === id1);
      const singleCourse = dataHov?.map((item) => {
        return {
          image: item.image,
          id: item._id,
          name: item.name,
          Serial_key: item.Serial_key,
          author: item.author,
          fee: item.fee,

          Party_Type: item.party_type,
          description: item.description,
          // <h3>Content: {item.content}</h3>
          // <h3>Content: {item.content1}</h3>
          // <h3>Content: {item.content2}</h3>
          // <h3>Content: {item.content3}</h3>
          // <h3>Content: {item.content4}</h3>
          // {cont}
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      setStudentCourse1(singleCourse);
      // console.log(dataHov);
      // console.log(singleCourse);
    }

    // const timer = setTimeout(() => {
    //   setModalOpen1(false);
    // }, 1000);
    // clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id1]);
  // console.log(id);
  return (
    <main onClick={() => closedisplay()}>
      <div className=" relative flex justify-around item-center flex-row top-5">
        <h1>Assign a Course</h1>
        <Link href={route}>
          <button>back</button>
        </Link>
        {name !== undefined && (
          <div className=" cursor-pointer" onClick={() => setDispCourse(true)}>
            add course
          </div>
        )}
      </div>

      <section className=" flex item-center p-20 my-12 outline h-auto w-full justify-between  flex-row ">
        <div className=" p-10 overflow-y-scroll">
          <div>
            {name === undefined ? (
              <div>
                <Loading />
              </div>
            ) : (
              <div>
                <h2 className=" font-medium">{`${name}'s paid courses`}</h2>
                {studentCourses?.length === 0 ? (
                  <div>no course registered</div>
                ) : (
                  <div>
                    {studentCourses?.map((item, id) => {
                      const { _id, name, Serial_key, description, author } =
                        item;
                      return (
                        <div
                          className=" flex justify-center cursor-pointer m-5 items-center flex-col"
                          key={id}
                          onClick={() => AddToCourse(_id)}
                        >
                          <div
                            key={id}
                            className=" flex justify-center gap-y-1  border-grey border-b-2 items-center flex-col "
                            onMouseOver={() => CourseView(_id)}
                          >
                            <small>{Serial_key}</small>
                            <h2 className=" font-medium">{name}</h2>
                            <h4 className=" font-medium">{author}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-center cursor-pointer gap-y-20 border-grey border-b-2 items-center flex-col">
          {modalOpen1 && dispCourse ? (
            <div className=" absolute right-1/4 z-20">
              {/* <div onMouseOut={() => setModalOpen1(false)}>Hederw</div> */}
              <CourseHover1
                studentCourse={studentCourse1}
                container={container}
                location={location}
                setModalOpen1={setModalOpen1}
                // onClosed={() => setModalOpen(false)}
                // isOpen={modalOpen}
              />
            </div>
          ) : null}
          <div
            onMouseLeave={() => setDispCourse(false)}
            className={
              dispCourse
                ? " absolute flex justify-start px-5 py-1 m-1 z-20 top-56 right-28 h-fortyFive border-width1px overflow-y-scroll border-grey  bg-white items-center flex-col "
                : " absolute justify-start px-5 py-1 m-1 top-24 right-68 border-width1px overflow-hidden border-grey  bg-white items-center h-0 hidden flex-col "
            }
          >
            {course?.map((item, id) => {
              const { image, _id, name, Serial_key, description, author, fee } =
                item;
              const imageType =
                image === undefined || image === "" ? "" : image;
              const appliedCourse = singleAss?.includes(_id);
              return (
                <div
                  className=" flex justify-center cursor-pointer m-6  border-grey border-b-2 items-center flex-row"
                  key={id}
                  onMouseOver={() => setId1(_id)}
                >
                  <div
                    key={id}
                    className=" flex justify-start py-7 items-center gap-3 flex-col"
                    onMouseOver={displayHov}
                  >
                    <div className=" flex justify-end items-center flex-col">
                      {imageType !== "" ? (
                        <div className="imgCont inline-block items-stretch overflow-hidden max-w-md h-20 ">
                          <Image
                            width={100}
                            height={100}
                            src={image}
                            alt="image"
                          />
                        </div>
                      ) : (
                        <div className="imgCont inline-block items-stretch overflow-hidden max-w-md">
                          <Image
                            width={100}
                            height={100}
                            src={Greendome}
                            alt="image"
                          />
                        </div>
                      )}
                      <small>{_id}</small>
                    </div>
                    <h2 className=" font-medium">{name}</h2>
                    {appliedCourse ? (
                      <button className="border-width1px text-white text-sm tracking-wide border-grey p-2 rounded-md bg-greenGraded1 hover:text-whiteHov">
                        registered
                      </button>
                    ) : (
                      <button
                        className="border-width1px text-white text-sm tracking-wide border-grey p-2 rounded-md bg-greenGraded1 hover:text-whiteHov"
                        onClick={() => AddToCourse(_id)}
                      >
                        apply
                      </button>
                    )}
                  </div>

                  {/* {modalOpen && (
                    <div
                      key={id}
                      className=" absolute flex justify-center items-center flex-row "
                    >
                      {imageType !== "" ? (
                        <div className="imgCont inline-block items-stretch overflow-hidden max-w-md h-20 ">
                          <Image
                            width={100}
                            height={100}
                            src={image}
                            alt="image"
                          />
                        </div>
                      ) : (
                        <div className="imgCont inline-block items-stretch overflow-hidden max-w-md">
                          <Image
                            width={100}
                            height={100}
                            src={Greendome}
                            alt="image"
                          />
                        </div>
                      )}
                      <h2>{_id}</h2>
                      <h4>{Serial_key}</h4>
                      <h2>{name}</h2>
                      <h2>{fee}</h2>
                      <h4>{description}</h4>
                      <h4>{author}</h4>
                    </div>
                  )} */}
                </div>
              );
            })}
          </div>

          {modalOpen && (
            <CourseHover
              studentCourse={studentCourse}
              studentCourses={studentCourses}
              onClosed={() => setModalOpen1(false)}
              RemoveCourse={RemoveCourse}
              modalOpen={modalOpen}
              // isOpen={modalOpen}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default AllCourseDisp;
