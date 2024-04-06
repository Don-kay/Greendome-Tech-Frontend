"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers, setTutors } from "../../../features/profile/profileSlice";
import ProfileActions from "../../../features/profile/profileActions.jsx";
import { TotalTutorsProps } from "./sudentPops.jsx";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const FinanceSector = ({ percentage, Users, classes }) => {
  const dispatch = useDispatch();
  // const [Users, setUsers] = useState([]);
  // const [classes, setClasses] = useState([]);
  // const { users } = useSelector((strore) => strore.profiles);
  const [rowId, setRowId] = useState(null);
  console.log(percentage);

  useEffect(() => {
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
        const course = await axios.get(
          "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        const resp = { data: course.data, stats: course.status };
        //  console.log(resp.data.user);
        const data = resp.data;

        // console.log(data.classses);
        setClasses(data.classes);
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

    // fetchUsers();
    // fetchCourses();
    // dispatch(GetAllUsers());
  });

  // const paidCourses = userClass.map((i, id) =>
  //   i.map((c, idx) => {
  //     return (
  //       <div key={idx}>
  //         <h2>{c.name}</h2>
  //         <h2>{c.Serial_key}</h2>
  //         <h2>{c.fee}</h2>
  //         <h2>{c._id}</h2>
  //       </div>
  //     );
  //   })
  // );

  // const userClassDisp = classes.map((item, id) => {
  //   const authorId = item.createdBy;
  //   const authorCourse = userClasses.map((it) =>
  //     classes.filter((i) => it.includes(i._id))
  //   );

  //   const sumFee = userClass.map((i) => {
  //     return i.map((j) => {
  //       return _.toString(j.fee);
  //     });
  //   });
  //   const merge = sumFee.flat(1).reduce((accumulator, value) => {
  //     return parseFloat(accumulator) + parseFloat(value);
  //   }, 0);
  //   // const sumTotalCourse = sumFee.reduce((accumulator, value) => {
  //   //   return parseFloat(accumulator) + parseFloat(value);
  //   // }, 0);

  //   // console.log(merge);
  //   // console.log(merge);
  //   return (
  //     <main key={id}>
  //       <h2>{item.id}</h2>
  //       <h2>{item.username}</h2>
  //       {paidCourses}
  //       <h2>Total: {merge}</h2>
  //     </main>
  //   );
  // });

  const tutorId = Users.map((i) => i.id);
  // const tutorRoles = Users.filter((i) => i.roles.includes("tutor"));
  const tutorRoles = Users.filter((i) => i.roles === "tutor");
  const TutorClasses = classes.filter(
    (i) =>
      tutorId.includes(i.createdBy) &&
      !i.party_type.includes("Admin") &&
      i.party_type.includes("tutor")
  );

  // const Class = userClasses.map((it) =>
  //   classes.filter((i) => it.includes(i._id))
  // );

  // const sumSingleCourses = userClass.map((i) => {
  //   const sum = i.reduce((accumulator, object) => {
  //     return accumulator + object.fee;
  //   }, 0);

  //   return sum;
  // });
  // const sumTotalCourses = sumSingleCourses.reduce((accumulator, value) => {
  //   return accumulator + value;
  // }, 0);

  // console.log(classes);
  // console.log(tutorId);
  // console.log(classes);

  useEffect(() => {
    const UpdateProfit = () => {
      const tutorFee = TutorClasses.map(async (i) => {
        const fee = (i.fee / 100) * percentage;
        const Tutorfee = i.fee - fee;
        console.log(Tutorfee);

        try {
          axios.defaults.withCredentials = true;
          const profiles = await axios.put(
            `http://localhost:8000/greendometech/ng/course/admin/update-profit/${i._id}`,
            {
              profit: Tutorfee,
            },
            {
              withCredentials: true,
              credentials: "include",
            }
          );
          const resp = { data: profiles.data, stats: profiles.status };
          console.log(resp.data);
        } catch (error) {
          return { msg: error };
        }

        return tutorFee;
      });
    };
    UpdateProfit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Users]);

  // console.log(tutorRoles);
  // console.log(TutorClasses);

  // console.log(userClasses);

  //  const singleAss = userClasses.flat(1);
  //  const paidCourses = classes.filter((i) => singleAss.includes(i._id));

  //  const contentDisplay = paidCourses?.map((item, id) => {
  //    return (
  //      <div key={id}>
  //        <h2 key={id}>title: {item.name}</h2>
  //        <small>id: {item._id}</small>
  //      </div>
  //    );
  //  });
  // const User = users?.data;
  // const allUsers = User?.user;

  // console.log(studentObj);

  // const studentId = studentObj.map((key) => key.id);

  // const columns = useMemo(
  //   () => [
  //     { field: "id", headerName: "Id", width: 220 },
  //     { field: "username", headerName: "Username", width: 120 },
  //     { field: "firstname", headerName: "Firstname", width: 170 },
  //     { field: "lastname", headerName: "Lastname", width: 170 },
  //     { field: "email", headerName: "Email", width: 200 },
  //     {
  //       field: "role",
  //       headerName: "Role",
  //       width: 200,
  //       valueGetter: (params) => {
  //         const role = params.row.roles;
  //         return role;
  //       },
  //     },
  //     { field: "createdAt", headerName: "Created At", width: 220 },
  //     {
  //       field: "actions",
  //       headerName: "Actions",
  //       width: 220,
  //       renderCell: (params) => <ProfileActions {...{ params }} />,
  //     },
  //   ],
  //   [rowId]
  // );

  return (
    <section className="panel relative top-10   h-screen bg-purple">
      <div>Revenue board</div>
      {/* <div>
        <h1>{sumTotalCourses}</h1>
      </div> */}
      {/* <button onClick={() => view}>view all users</button> */}
      {/* {userClassDisp} */}
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

export default FinanceSector;

// students.Layout = adminLayout;

// export function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }
