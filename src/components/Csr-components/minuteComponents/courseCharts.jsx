"use client";
import React from "react";
import { GiTeacher, GiRead } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import TotalCourseComp from "./courseComp";
import { useSelector } from "react-redux";
import _ from "lodash";

const CourseCharts = ({ course, params, isStudent }) => {
  const { users } = useSelector((state) => state.profiles);
  const Reader = <GiRead />;
  const Teacher = <GiTeacher />;
  const Tie = <FaUserTie />;

  const rating = course.map((i) =>
    users.filter((j) => j.classesId.includes(i._id))
  );
  const loggedInUserId = params;
  //const courses = course.data?.classes;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);
  const UserClasses = loggedInUser?.map((i) => {
    return i.classesId;
  });

  //const mapClasses = UserClasses[0];
  const studentCourses = course?.filter((i) => UserClasses[0]?.includes(i._id));

  // const courseTitle = course.filter((i) => i.classesId.includes);
  const courseFee = course.map((j) => {
    return _.toString(j.fee);
  });
  const studentCourseFee = studentCourses.map((j) => {
    return _.toString(j.fee);
  });
  const sumTotalCourses = courseFee.reduce((accumulator, value) => {
    return parseFloat(accumulator) + parseFloat(value);
  }, 0);
  const sumTotalStudentCourses = studentCourseFee.reduce(
    (accumulator, value) => {
      return parseFloat(accumulator) + parseFloat(value);
    },
    0
  );

  // console.log(sumTotalCourses);
  //console.log(rating);
  const rated = _.max(Object.values(rating).filter((a) => a.length));
  //console.log(rated);
  return (
    <section className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <TotalCourseComp isStudent={isStudent} params={params} course={course} />

      {isStudent ? (
        <div>
          <div className=" flex justify-center items-center flex-col flex-wrap gap-2 shadow  shadow-gradedBack  rounded-lg bg-greenGraded1 p-responsive3">
            <div className=" bg-white">{Teacher}</div>
            <div className="flex items-center justify-center flex-col m-auto relative">
              <h2 className=" text-1xl text-white"> Total expense on course</h2>
              <h3 className=" text-1xl text-white">
                ${sumTotalStudentCourses}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex justify-center items-center flex-col flex-wrap gap-2 shadow  shadow-gradedBack  rounded-lg bg-greenGraded1 p-responsive3">
          <div className=" bg-white">{Teacher}</div>
          <div className="flex items-center justify-center flex-col m-auto relative">
            <h2 className=" text-1xl text-white">Total Revenue</h2>
            <h3 className=" text-1xl text-white">${sumTotalCourses}</h3>
          </div>
        </div>
      )}

      <div className=" flex justify-center items-center flex-col flex-wrap gap-2 shadow  shadow-gradedBack  rounded-lg bg-greenGraded1  p-responsive3">
        <div className=" bg-white">{Tie}</div>
        <div className="flex items-center justify-center flex-col m-auto relative">
          <h2 className=" text-1xl text-white">Course Rating</h2>
          <h3 className=" text-1xl text-white">507</h3>
        </div>
      </div>
    </section>
  );
};

export default CourseCharts;
