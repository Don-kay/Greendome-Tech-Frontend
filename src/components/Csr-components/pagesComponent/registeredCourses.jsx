"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { HoverModal } from "../../../features/functions/functionSlice";
import PageTitle from "../../typography/PageTitle";
import moment from "moment";
import customFetch, { customFetchProduction } from "../../../utilities/axios";
import { Fetch } from "../../../utilities/axios";
import Image from "next/image";
import Greendome from "../../asset/greendome.jpg";
import ViewCourse from "./viewCourse";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import _ from "lodash";

const RegisteredCourses = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [course, setCourses] = useState();
  const [modules, setModules] = useState();
  const [CourseModules, setCourseModules] = useState();
  const [assignedTutors, setAssignedTutors] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [id, setId] = useState();
  const { ishover } = useSelector((strore) => strore.functions);
  const { users } = useSelector((state) => state.profiles);
  const { user } = useSelector((strore) => strore.user);
  const loggedInUserId = user.data.user.id;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);
  const userCourse = users?.filter((i) => i.id === loggedInUserId);
  const classesId = loggedInUser?.map((i) => i.classesId);
  const assinged = classesId;
  const singleAss = assinged?.flat(1);
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;

  useEffect(() => {
    dispatch(GetAllUsers());
    const fetchCourses = async () => {
      try {
        const resp = await Fetch.get("/course/admin/view-all-course", {
          withCredentials: true,
        });

        const Courses = resp.data.course;
        // console.log(Courses);
        const paidCourses = Courses.filter((i) => singleAss.includes(i._id));
        // console.log(paidCourses);

        setData(paidCourses);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    const fetchModule = async () => {
      try {
        const resp = await Fetch.get("/module/view-all-module", {
          withCredentials: true,
        });

        const res = resp.data.modules;
        // console.log(res);
        //  const module = res.filter((i) => i.classId === paramid);
        //  console.log(module);
        setModules(res);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    dispatch(HoverModal(false));

    fetchCourses();
    fetchModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //const classesId = users.map((i) => i.classesId);
  useEffect(() => {
    const courseModules = modules?.filter((item) => item.classId === id);
    setCourseModules(courseModules);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleMenu = (id) => {
    const singleCourse = data?.filter((item) => item._id === id);
    const CourseTutors = singleCourse?.map((item) => item.assigned_tutor);
    const CourseId = _.toString(singleCourse?.map((item) => item._id));
    const AssignedTutor = users.filter((i) => CourseTutors[0].includes(i.id));
    const AssignedStudents = users.filter((i) =>
      i.classesId.includes(CourseId)
    );

    setCourses(singleCourse);
    setAssignedTutors(AssignedTutor);
    setAssignedStudents(AssignedStudents);
    //console.log(courseModules);
    // console.log(CourseTutors);
    // console.log(CourseTutors);
    // console.log(CourseId);
    // console.log();
    setId(id);
    setModalOpen(true);
    // dispatch(HoverModal(true));
  };

  // const singleAss = assinged.flat(1);

  return (
    <main className=" relative flex justify-center gap-y-14 items-center flex-col">
      <PageTitle>All Courses</PageTitle>
      <ViewCourse
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        course={course}
        assignedStudents={assignedStudents}
        assignedTutors={assignedTutors}
        courseModules={CourseModules}
        courseId={id}
        setCourse={setCourses}
      />
      {data.length === 0 ? (
        <div className=" flex items-center flex-col">
          <PageTitle>sorry, yet to apply for a course?</PageTitle>
          <Link href="/panel/student_dashboard/courses">
            <button className=" text-center">apply</button>
          </Link>
        </div>
      ) : (
        <section className=" relative grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3 cursor-pointer">
          {data?.map((item, id) => {
            const { _id, name, Serial_key, author, fee, image } = item;
            const imageType = image === "" || image === undefined ? "" : image;

            return (
              <section key={id}>
                <div
                  key={id}
                  className=" flex justify-center cursor-pointer bg-greenGradedHov px-8 w-11/12 rounded-md mx-10 items-center flex-col hover:bg-whiteGraded"
                  onClick={() => toggleMenu(_id)}
                >
                  <div>
                    {imageType !== "" ? (
                      <div className=" flex justify-center items-center m-3 overflow-hidden w-11/12 h-72 rounded-md">
                        <Image
                          className=" w-gallery h-full"
                          width={100}
                          height={200}
                          src={imageType}
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
                  </div>

                  <div className=" flex justify-start  gap-y-3 cursor-pointer p-7  flex-col">
                    <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">name:</h3>
                      <h2 className=" text-17 text-greenGraded1 "> {name}</h2>
                    </div>
                    <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">serial key:</h3>
                      <h4 className=" text-15 text-greenGraded1 ">
                        {Serial_key}
                      </h4>
                    </div>
                    <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">author:</h3>
                      <h4 className=" text-greenGraded1 "> {author}</h4>
                    </div>
                    <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">fee:</h3>
                      <h4 className=" text-greenGraded1 "> {fee}</h4>
                    </div>
                  </div>
                </div>

                {/* {ishover && (
                <div>
                  <MenuDropDown id={_id} name={name} />
                </div>
              )} */}
              </section>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default RegisteredCourses;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
