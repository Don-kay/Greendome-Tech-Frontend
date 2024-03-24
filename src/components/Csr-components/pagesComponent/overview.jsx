"use client";
import React, { useEffect, useState } from "react";
import Loading from "../layout_constructs/loading";
import RolesCharts from "../minuteComponents/rolesCharts";
import CourseCharts from "../minuteComponents/courseCharts";
import RevenueCharts from "../minuteComponents/revenueCharts";
import StudentsSlice from "../minuteComponents/slicedRolecomp";
import Calendar from "./calendar";
import EventsChart from "../minuteComponents/eventsChart";
import { GetAllCourse } from "../../../features/course/courseSlice";
import RatedCourse from "../minuteComponents/ratedCourse";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Overview = () => {
  const dispatch = useDispatch();
  const [course, setCourses] = useState([]);
  const { user } = useSelector((strore) => strore.user);
  const { users } = useSelector((state) => state.profiles);
  // const { course } = useSelector((state) => state.course);
  const loggedInUserId = user.data.user.id;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

  const Student = loggedInUser?.map((i) => {
    return i.roles.includes("student");
  });

  const IsStudent = _.toString(Student);
  // console.log(IsStudent);
  // console.log(IsStudentBool);
  // console.log(loggedInUser);

  const loggeduser = user.data.user;
  const userParams = loggeduser.id;

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

  useEffect(() => {
    dispatch(GetAllUsers());
    getAllcourses();

    // return () => {
    //   cancelToken.cancel();
    // };
  }, []);
  //console.log(course);
  // console.log(TotalCourse);

  return (
    <main className=" relative  top-0 flex h-fit justify-center bg-bubblegum gap-2 ">
      {course?.length === 0 ? (
        <Loading />
      ) : (
        <div>
          {IsStudent === "true" ? (
            <section>
              <div className="h-fit p-responsive3   border-x-metal min-w-innerlay">
                <CourseCharts
                  course={course}
                  params={userParams}
                  isStudent={IsStudent}
                />
              </div>
              <div className="min-w-innerlay2 bg-red-700">
                <Calendar params={userParams} isStudent={IsStudent} />
                {/* <EventsChart params={userParams} isStudent={IsStudent} /> */}
                {/* <RatedCourse params={userParams} isStudent={IsStudent} /> */}
              </div>
            </section>
          ) : (
            <section>
              <div className=" h-fit bg-white p-responsive3   border-x-metal min-w-innerlay">
                <RolesCharts />
                <CourseCharts
                  course={course}
                  params={userParams}
                  isStudent={IsStudent}
                />
                <RevenueCharts course={course} />
                <StudentsSlice />
              </div>
              {/* <div className="min-w-innerlay2 bg-red-700">
            Calender % student rating
            <Calender params={userParams} isStudent={IsStudent} />
            <EventsChart params={userParams} isStudent={IsStudent} />
            <RatedCourse params={userParams} isStudent={IsStudent} />
          </div> */}
            </section>
          )}
        </div>
      )}
    </main>
  );
};

export default Overview;
