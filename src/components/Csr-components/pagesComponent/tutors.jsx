"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers, setTutors } from "../../../features/profile/profileSlice";
import TutorProfileActions from "../../../features/profile/tutorprofileActions";
import { TotalTutorsProps } from "../minuteComponents/sudentPops.jsx";
import Loading from "../layout_constructs/loading";
import { setLoading } from "../../../features/user/userSlice";
import Greendome from "../../asset/greendome.jpg";
import Image from "next/image";
import StudentView from "./studentView.jsx";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";

const Tutors = () => {
  const dispatch = useDispatch();
  const [tutor, setTutor] = useState([]);
  const [tutorsId, setTutorsId] = useState();
  const { users } = useSelector((strore) => strore.profiles);
  const { user, isLoading } = useSelector((strore) => strore.user);
  const [rowId, setRowId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStudent, setactiveStudent] = useState([]);
  // console.log(users);

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
        //  console.log(resp.data.user);
        if (resp.stats === 200) {
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(true));
        }

        const data = resp.data.user;

        const tutorObj = data.filter((item) => {
          return item.roles.includes("tutor");
        });
        const tutors = tutorObj.map((item) => {
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

        setTutor(tutors);
        dispatch(setTutors(tutors.length));
      } catch (error) {
        return { msg: error.response.data };
      }
    };

    fetchUsers();
    dispatch(GetAllUsers());
  }, []);

  // console.log(users);
  // const User = users?.data;
  // const allUsers = User?.user;

  // console.log(studentObj);

  const handleModalId = (id) => {
    setTutorsId(id);
    setModalOpen(true);
  };

  // const studentId = studentObj.map((key) => key.id);

  useEffect(() => {
    dispatch(setTutors(tutor.length));
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
        headerName: "created At",
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
          <TutorProfileActions
            {...{ params }}
            onOpen={() => setModalOpen(true)}
            studentId={(id) => handleModalId(id)}
          />
        ),
      },
    ],
    [rowId]
  );

  return (
    <section className="panel relative top-10   h-screen bg-purple">
      <div>board</div>
      {/* <button onClick={() => view}>view all users</button> */}
      <StudentView
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        studentid={tutorsId}
      />
      {isLoading && (
        <div className=" flex items-center  min-w-innerlay3 h-96 -top-32 left-0 z-20 absolute ">
          <Loading />
        </div>
      )}
      <Box
        sx={{
          height: 400,
          width: "100%",
          backgroundColor: "hsl(0, 14%, 97%)",
          padding: "1.3rem",
          borderRadius: "0.9rem",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          manage tutors
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
      <div className="relative top-40 flex items-center justify-around flex-row">
        <TotalTutorsProps />
      </div>
    </section>
  );
};

export default Tutors;

// students.Layout = adminLayout;

// export function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }
