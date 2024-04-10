"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers, setTutors } from "../../../features/profile/profileSlice";
import ProfileActions from "../../../features/profile/profileActions.jsx";
import FinanceSector from "../minuteComponents/financeSector.jsx";
import { TotalTutorsProps } from "../minuteComponents/sudentPops.jsx";
import customFetch, { customFetchProduction } from "@/utilities/axios";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { getPercentage } from "../../../features/course/percentage/percentageSlice.jsx";
import FormRow from "../../FormRow";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Finance = () => {
  const dispatch = useDispatch();
  const [Users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const { percentage } = useSelector((strore) => strore.percentage);
  const { users } = useSelector((strore) => strore.profiles);
  const [rowId, setRowId] = useState(null);
  // console.log(users);
  const fetch =
    process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const profiles = await fetch.get("/auth/users", {
          withCredentials: true,
          credentials: "include",
        });
        const resp = { data: profiles.data, stats: profiles.status };
        //  console.log(resp.data.user);
        const data = resp.data.user;

        const users = data.map((item) => {
          return {
            id: item.id,
            email: item.email,
            username: item.username,
            firstname: item.firstname,
            roles: _.toString(item.roles),
            lastname: item.lastname,
            createdAt: item.createdAt,
            classesId: item.classesId,
          };
          // item.roles, item.id;
        });

        setUsers(users);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    const fetchCourses = async () => {
      try {
        const course = await fetch.get("/course/admin/view-all-course", {
          withCredentials: true,
          credentials: "include",
        });
        const resp = { data: course.data, stats: course.status };
        //  console.log(resp.data.user);
        const data = resp.data;

        // console.log(data.classses);
        setClasses(data.course);
        // const users = data.map((item) => {
        //   return {
        //     id: item.id,
        //     email: item.email,
        //     username: item.username,
        //     firstname: item.firstname,
        //     roles: _.toString(item.roles),
        //     lastname: item.lastname,
        //     createdAt: item.createdAt,
        //     classesId: item.classesId,
        //   };
        //   // item.roles, item.id;
        // });

        // setUsers(users);
      } catch (error) {
        return { msg: error.response.data };
      }
    };

    dispatch(getPercentage());
    fetchUsers();
    fetchCourses();
    dispatch(GetAllUsers());
  });
  //classes
  const userClassDisp = Users.map((item, id) => {
    const userClasses = item.classesId;
    //get full course detail from array of ids
    const userClass = userClasses.map((it) =>
      classes.filter((i) => it.includes(i._id))
    );
    const paidCourses = userClass.map((i, id) =>
      i.map((c, idx) => {
        return (
          <div key={idx}>
            <h2>{c.name}</h2>
            <h2>{c.Serial_key}</h2>
            <h2>{c.fee}</h2>
            <h2>{c._id}</h2>
          </div>
        );
      })
    );
    const sumFee = userClass.map((i) => {
      return i.map((j) => {
        return _.toString(j.fee);
      });
    });
    const merge = sumFee.flat(1).reduce((accumulator, value) => {
      return parseFloat(accumulator) + parseFloat(value);
    }, 0);
    // const sumTotalCourse = sumFee.reduce((accumulator, value) => {
    //   return parseFloat(accumulator) + parseFloat(value);
    // }, 0);

    // console.log(merge);
    // console.log(merge);
    return (
      <main key={id}>
        <h2>{item.id}</h2>
        <h2>{item.username}</h2>
        {paidCourses}
        <h2>Total: {merge}</h2>
      </main>
    );
  });

  const userClasses = Users.map((i) => i.classesId);

  const userClass = userClasses.map((it) =>
    classes.filter((i) => it.includes(i._id))
  );

  const sumSingleCourses = userClass.map((i) => {
    const sum = i.reduce((accumulator, object) => {
      return accumulator + object.fee;
    }, 0);

    return sum;
  });
  const sumTotalCourses = sumSingleCourses.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  console.log(userClass);
  console.log(sumSingleCourses);
  console.log(sumTotalCourses);
  // console.log(Users);
  // console.log(userClasses);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 220 },
      { field: "username", headerName: "Username", width: 120 },
      { field: "firstname", headerName: "Firstname", width: 170 },
      { field: "lastname", headerName: "Lastname", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "role",
        headerName: "Role",
        width: 200,
        valueGetter: (params) => {
          const role = params.row.roles;
          return role;
        },
      },
      { field: "createdAt", headerName: "Created At", width: 220 },
      {
        field: "actions",
        headerName: "Actions",
        width: 220,
        renderCell: (params) => <ProfileActions {...{ params }} />,
      },
    ],
    []
  );

  return (
    <section className="panel relative top-10   h-screen bg-purple">
      <div>Revenue board</div>
      <div>
        <h1>{sumTotalCourses}</h1>
      </div>
      {/* <button onClick={() => view}>view all users</button> */}
      {userClassDisp}
      <div>
        <FinanceSector
          percentage={percentage}
          Users={Users}
          classes={classes}
        />
      </div>

      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          manage tutors
        </Typography>
        {/* <DataGrid columns={columns} rows={tutor} getRowId={(row) => row.id} /> */}
      </Box>
      <div className="relative top-40 flex items-center justify-around flex-row">
        <TotalTutorsProps />
      </div>
    </section>
  );
};

export default Finance;

// students.Layout = adminLayout;

// export function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }
