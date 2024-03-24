"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllUsers,
  setStudents,
  setActiveStudent,
  setTutors,
  setAdmin,
} from "../../../features/profile/profileSlice";
import {
  displayTutor,
  displayAdmin,
  displayStudents,
} from "../../../features/functions/functionSlice";
import ProfileActions from "../../../features/profile/profileActions.jsx";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import PageTitle from "../../typography/PageTitle";
import { DataGrid } from "@mui/x-data-grid";
import TotalStudentPops, {
  TotalTutorsProps,
  TotalAdminProps,
  ActiveStudentPops,
} from "./sudentPops";

const StudentsSlice = ({ trigger }) => {
  const dispatch = useDispatch();
  const { studentView, tutorView, adminView } = useSelector(
    (strore) => strore.functions
  );
  const { users, errorMsg } = useSelector((strore) => strore.profiles);
  const { user } = useSelector((strore) => strore.user);
  const loggedInUserId = user.data.user.id;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

  const Admin = loggedInUser?.map((i) => {
    return i.roles.includes("Admin");
  });

  const IsAdmin = _.toString(Admin);

  const [rowId, setRowId] = useState(null);
  const [roleView, setRoleView] = useState({
    admin: "Admin",
    student: "student",
    tutor: "tutor",
  });
  // console.log(users);
  // const fetchUsers = async () => {
  //   try {
  //     const profiles = await axios.get(
  //       "http://localhost:8000/greendometech/ng/auth/users",
  //       {
  //         withCredentials: true,
  //         credentials: "include",
  //       }
  //     );
  //     const resp = { data: profiles.data, stats: profiles.status };
  //     console.log(profiles);
  //     setUsers(resp);
  //   } catch (error) {
  //     return { msg: error.response.data };
  //   }
  // };
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [trigger]);

  const studentObj = users?.filter((item) => {
    return item.roles.includes("student");
  });
  const tutorObj = users?.filter((item) => {
    return item.roles.includes("tutor");
  });
  const adminObj = users?.filter((item) => {
    return item.roles.includes("Admin");
  });
  const activeStudents = users?.filter((item) => {
    return (
      item.roles.includes("student") &&
      (item.classesId.length !== 0 || item.classesId === undefined)
    );
  });

  const students = studentObj?.map((item) => {
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
  const tutor = tutorObj?.map((item) => {
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
  const admin = adminObj?.map((item) => {
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
  // const studentId = studentObj.map((key) => key.id);
  // console.log(studentId);

  useEffect(() => {
    dispatch(setStudents(students?.length));
    dispatch(setTutors(tutorObj?.length));
    dispatch(setAdmin(adminObj?.length));

    if (activeStudents?.length === 0) {
      dispatch(setActiveStudent(0));
    } else {
      dispatch(setActiveStudent(activeStudents?.length));
    }
  }, [users]);

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
        renderCell: (params) => (
          <ProfileActions isAdmin={IsAdmin} {...{ params }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <section className="panel flex items-center flex-col relative w-full h-fit">
      <PageTitle>board</PageTitle>
      <div className=" flex justify-center items-center gap-20 flex-row p-responsive2">
        <button
          className={
            !tutorView && !adminView
              ? " text-greenGraded1 font-bold"
              : " font-bold "
          }
          onClick={() => dispatch(displayStudents())}
        >
          student
        </button>
        <button
          className={
            !studentView && !tutorView
              ? " text-greenGraded1 font-bold"
              : " font-bold "
          }
          onClick={() => dispatch(displayAdmin())}
        >
          admin
        </button>
        <button
          className={tutorView ? " text-greenGraded1 font-bold" : " font-bold "}
          onClick={() => dispatch(displayTutor())}
        >
          tutor
        </button>

        <div className="relative max-w-overviewLayer">
          {tutorView ? (
            <div className="absolute">
              <TotalTutorsProps />
            </div>
          ) : adminView ? (
            <div className="absolute">
              <TotalAdminProps />
            </div>
          ) : (
            <div className="absolute">
              <TotalStudentPops />
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-center items-center gap-10 flex-col p-responsive2">
        <div className=" flex justify-center items-center p-responsive2 h-fit bg-lime-600 max-w-maxo">
          {tutorView ? (
            <Box
              sx={{
                height: 400,
                width: "100%",
                backgroundColor: "hsl(0, 14%, 97%)",
                padding: "1.5rem",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{ textAlign: "center", mt: 0, mb: 0 }}
              >
                view all users
              </Typography>
              <DataGrid
                columns={columns}
                rows={tutor}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 5,
                  bottom: params.isLastVisible ? 0 : 5,
                })}
              />
            </Box>
          ) : adminView ? (
            <Box
              sx={{
                height: 400,
                width: "100%",
                backgroundColor: "hsl(0, 14%, 97%)",
                padding: "1.5rem",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{ textAlign: "center", mt: 0, mb: 0 }}
              >
                view all users
              </Typography>
              <DataGrid
                columns={columns}
                rows={admin}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 5,
                  bottom: params.isLastVisible ? 0 : 5,
                })}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: 400,
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{ textAlign: "center", mt: 0, mb: 0 }}
              >
                view all users
              </Typography>
              <DataGrid
                columns={columns}
                rows={students}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 5,
                  bottom: params.isLastVisible ? 0 : 5,
                })}
              />
            </Box>
          )}
        </div>
      </div>
      {/* <ActiveStudentPops /> */}
    </section>
  );
};

export default StudentsSlice;
