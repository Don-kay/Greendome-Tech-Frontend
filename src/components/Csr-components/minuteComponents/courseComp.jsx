"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "../../Cards/InfoCard";
import { GiTeacher, GiRead } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import RoundIcon from "../../icon/RoundIcon";
import { usePathname } from "next/navigation";
import {
  getAllCourse,
  setTotalCourse,
} from "../../../features/course/courseSlice";
import _ from "lodash";

const TotalCourseComp = ({ isStudent, params, course }) => {
  const dispatch = useDispatch();
  const { TotalCourse, errorMsg } = useSelector((strore) => strore.course);
  const { users } = useSelector((state) => state.profiles);

  const loggedInUserId = params;
  //const courses = course.data?.classes;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);
  const UserClasses = loggedInUser?.map((i) => {
    return i.classesId;
  });

  //const mapClasses = UserClasses[0];
  const classId = course?.filter((i) => UserClasses[0].includes(i._id));
  const pathname = usePathname();

  // const IsStudent = loggedInUser.map((i) => {
  //   return i.roles.includes("student");
  // });
  // console.log(course);
  const stats = course.stats;
  const Reader = <GiRead />;
  // const count = course.data?.count;
  // console.log(mapClasses);
  // console.log(classId);
  // console.log(mapClasses);
  // console.log(classId);

  return (
    <section>
      <InfoCard
        title={
          isStudent && pathname.includes("admin_dashboard")
            ? "Total Course"
            : "no. of courses taken"
        }
        value={
          isStudent && pathname.includes("admin_dashboard")
            ? course?.length
            : classId?.length
        }
      >
        {/* @ts-ignore */}
        <RoundIcon
          icon={Reader}
          iconColorClass="text-white dark:text-orange-100"
          bgColorClass="  bg-green dark:bg-orange-500"
          className="mr-4"
        />
      </InfoCard>
    </section>
  );
};

export default TotalCourseComp;

const CourseRating = () => {};
// students.Layout = adminLayout;

// export function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }
