"use client";

import React, { useEffect, useState } from "react";
import RolesCharts from "../minuteComponents/rolesCharts";
import CourseCharts from "../minuteComponents/courseCharts";
import RevenueCharts from "../minuteComponents/revenueCharts";
import StudentsSlice from "../minuteComponents/slicedRolecomp";
import Calendar from "./calendar";
import EventsChart from "../minuteComponents/eventsChart";
import { GetAllCourse } from "../../../features/course/courseSlice";
import RatedCourse from "../minuteComponents/ratedCourse";
import Link from "next/link";
import StudentViewModules from "./studentViewModule";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import axios from "axios";

const Lectures = () => {
  const dispatch = useDispatch();
  const [course, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourses] = useState();
  const [selectedModule, setSelectedModule] = useState();
  const [modules, setModules] = useState([]);
  const [id, setId] = useState("");
  const { user } = useSelector((strore) => strore.user);
  const { users } = useSelector((state) => state.profiles);
  // const { course } = useSelector((state) => state.course);
  const loggedInUserId = user.data.user.id;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);
  const UserClasses = loggedInUser?.map((i) => {
    return i.classesId;
  });
  //const mapClasses = UserClasses[0];

  const studentCourses = course?.filter((i) => UserClasses[0]?.includes(i._id));
  //   const Student = loggedInUser?.map((i) => {
  //     return i.roles.includes("student");
  //   });

  //   const IsStudent = _.toString(Student);
  // console.log(IsStudent);
  // console.log(IsStudentBool);
  // console.log(loggedInUser);

  // const isStudent = _.toString(IsStudent);
  // console.log(users);
  const cancelToken = axios.CancelToken.source();

  const getAllcourses = async () => {
    axios.defaults.withCredentials = true;
    try {
      const profiles = await axios.get(
        "http://localhost:8000/greendometech/ng/course/admin/view-all-course"
      );
      // console.log(profiles);
      const resp = { data: profiles.data.course, stats: profiles.status };
      setCourses(resp.data);
      // console.log(resp.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return { msg: error };
      }
    }
  };
  const fetchModule = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:8000/greendometech/ng/module/view-all-module`,
        {
          withCredentials: true,
        }
      );

      const res = resp.data.modules;
      // console.log(res);
      setModules(res);
    } catch (error) {
      return { msg: error.response.data };
    }
  };

  useEffect(() => {
    dispatch(GetAllUsers());
    getAllcourses();
    fetchModule();
    // return () => {
    //   cancelToken.cancel();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewModules = (_id) => {
    setId(_id);
    const Course = studentCourses?.filter((i) => i._id === _id);
    const moduler = modules?.filter((i) => i.classId === _id);
    // console.log(Course);
    setSelectedModule(moduler);
    setSelectedCourses(Course);
  };

  //console.log(course);
  // console.log(TotalCourse);

  return (
    <main className=" relative top-0 flex h-fit justify-center items-center gap-y-10 flex-col bg-bubblegum  ">
      {id === "" ? null : (
        <div className=" flex justify-center items-center relative top-0">
          <StudentViewModules
            studentCourses={selectedCourse}
            modules={selectedModule}
            setId={setId}
            paramsId={id}
          />
        </div>
      )}
      {id !== "" ? null : (
        <section className=" relative top-0 flex h-fit justify-center items-center gap-y-10 flex-col bg-bubblegum p-12 ">
          {" "}
          <h1>courses acquired</h1>
          <div>
            {studentCourses?.length <= 0 ? (
              <div>no course available, please apply for a course</div>
            ) : (
              <div className=" flex justify-center px-8 items-center flex-wrap gap-x-14 flex-row">
                {studentCourses?.map((item, id) => {
                  const { _id, name, Serial_key, image } = item;
                  const imageType =
                    image === "" || image === undefined ? "" : image;
                  return (
                    <div
                      className=" flex justify-center cursor-pointer bg-greenGradedHov px-4 rounded-md items-center flex-col hover:bg-whiteGraded"
                      onClick={() => viewModules(_id)}
                      key={id}
                    >
                      {imageType !== "" ? (
                        <div
                          key={id}
                          className=" flex justify-center items-center m-3 overflow-hidden bg-greenGraded1 w-11/12 h-72 rounded-md"
                        >
                          <Image
                            className=" w-gallery h-full"
                            width={100}
                            height={200}
                            src={image}
                            alt="image"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center m-3 overflow-hidden  w-24 h-auto rounded-full">
                          <Image
                            width={100}
                            height={100}
                            src={Greendome}
                            alt="image"
                          />
                        </div>
                      )}

                      <div className=" flex justify-start  gap-y-3 cursor-pointer p-7  flex-col">
                        <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                          <h3 className=" font-medium">name:</h3>
                          <h2 className=" text-17"> {item.name}</h2>
                        </div>
                        <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                          <h3 className=" font-medium">serial key:</h3>
                          <h4 className=" text-15"> {item.Serial_key}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Lectures;

//  <Link key={id} href={`${url}/${name}/${_id}`}></Link>
