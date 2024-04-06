"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllUsers,
  setStudents,
  setActiveStudent,
  setRefresh,
} from "../../../features/profile/profileSlice";

import ProfileActions from "../../../features/profile/profileActions";
import StudentView from "./studentView.jsx";
import Loading from "../layout_constructs/loading";
import TotalStudentPops, {
  ActiveStudentPops,
} from "../minuteComponents/sudentPops.jsx";
import { setLoading } from "../../../features/user/userSlice";
import _ from "lodash";
import Greendome from "../../asset/greendome.jpg";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";

const Students = () => {
  const dispatch = useDispatch();
  const [student, setStudent] = useState([]);
  const [studentId, setStudentId] = useState();
  const [activeStudent, setactiveStudent] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { users } = useSelector((strore) => strore.profiles);
  const [rowId, setRowId] = useState(null);

  const { user, isLoading } = useSelector((strore) => strore.user);
  const loggedInUserId = user.data.user.id;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

  const Admin = loggedInUser?.map((i) => {
    return i.roles.includes("Admin");
  });
  const company = loggedInUser?.map((i) => {
    return i.roles.includes("company");
  });

  const IsAdmin = _.toString(Admin);
  const IsCompany = _.toString(company);
  //console.log(student);

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchUsers = async () => {
      try {
        const profiles = await axios.get(
          "http://localhost:8000/greendometech/ng/auth/users",
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        const resp = { data: profiles.data, stats: profiles.status };
        //console.log(resp.stats);
        const data = resp.data.user;
        if (resp.stats === 200) {
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(true));
        }

        const studentObj = data.filter((item) => {
          return item.roles.includes("student");
        });
        const activeStudents = data.filter((item) => {
          return (
            item.roles.includes("student") &&
            (item.classesId.length !== 0 || item.classesId === undefined)
          );
        });
        const students = studentObj.map((item) => {
          return {
            id: item.id,
            image: item.image,
            email: item.email,
            username: item.username,
            firstname: item.firstname,
            roles: _.toString(item.roles),
            lastname: item.lastname,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            classesId: item.classesId,
          };
          // item.roles, item.id;
        });

        setactiveStudent(activeStudents);
        if (activeStudent?.length === 0) {
          dispatch(setActiveStudent(0));
        } else {
          dispatch(setActiveStudent(activeStudent.length));
        }

        setStudent(students);
        dispatch(setStudents(students.length));
      } catch (error) {
        return { msg: error.response.data };
      }
    };

    fetchUsers();
    dispatch(GetAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  //console.log(users);
  // const User = users?.data;
  // const allUsers = User?.user;

  // console.log(studentObj);

  // const studentId = studentObj.map((key) => key.id);

  const handleModalId = (id) => {
    setStudentId(id);
    //setModalOpen(true);
  };

  useEffect(() => {
    dispatch(setStudents(student.length));

    if (activeStudent?.length === 0) {
      dispatch(setActiveStudent(0));
    } else {
      dispatch(setActiveStudent(activeStudent.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 220,
        renderCell: (params) =>
          params.row.image === "" || params.row.image === undefined ? (
            <Image width={200} height={200} src={Greendome} alt="image" />
          ) : (
            <Image
              width={100}
              height={100}
              src={params.row.image}
              alt="image"
            />
          ),
        sortable: false,
        filterable: false,
      },
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
      {
        field: "createdAt",
        headerName: "Created At",
        width: 220,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "updatedAt",
        headerName: "updated At",
        width: 220,
        renderCell: (params) =>
          moment(params.row.updatedAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 220,
        renderCell: (params) => (
          <ProfileActions
            isAdmin={IsAdmin}
            {...{ params }}
            onOpen={() => setModalOpen(true)}
            studentId={(id) => handleModalId(id)}
          />
        ),
      },
    ], // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <section className="panel relative top-10 h-screen bg-purple">
      <div>board</div>
      <StudentView
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        studentid={studentId}
        IsCompany={IsCompany}
        loggedInUser={loggedInUserId}
        setStudent={setStudent}
      />
      {/* <button onClick={() => view}>view all users</button> */}
      {isLoading && (
        <div className=" flex items-center  min-w-innerlay3 h-96 top-32 left-0 z-20 absolute ">
          <Loading />
        </div>
      )}

      <Box
        sx={{
          height: "50vh",
          width: "100%",
          backgroundColor: "hsl(0, 14%, 97%)",
          padding: "1.3rem",
          borderRadius: "0.9rem",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          color="hsl(111.72413793103448, 49.15254237288135%, 11.568627450980392%)"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          manage students
        </Typography>
        <DataGrid
          columns={columns}
          rows={student}
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

      <div className="relative top-40 flex items-center justify-around flex-row">
        <TotalStudentPops />
        <ActiveStudentPops />
      </div>
    </section>
  );
};

export default Students;

// students.Layout = adminLayout;

// export function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }
