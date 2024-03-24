"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ViewProfile from "../../../features/profile/viewProfile";
import Image from "next/image";
import customFetch from "../../../utilities/axios.js";
import { ProfileModal } from "../../../features/functions/functionSlice";
import SingleProfileView from "./SingleProfileView";
import moment from "moment";

const AllAttendees = () => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [user, setUser] = useState([]);
  const { users, errorMsg } = useSelector((strore) => strore.profiles);
  const { profileView, modalId } = useSelector((strore) => strore.functions);
  useEffect(() => {
    // const fetchUsers = async () => {
    //   try {
    //     const res = await customFetch.get("/auth/users", {
    //       withCredentials: true,
    //       credentials: "includes",
    //     });
    //     //console.log(res);
    //     const resp = { data: res.data.user, stats: res.status };
    //     setUser(resp.data);
    //     // console.log(resp.data);
    //   } catch (error) {
    //     return { msg: error };
    //   }
    // };
    // fetchUsers();
    dispatch(GetAllUsers());
    dispatch(ProfileModal({ bool: false }));
  }, []);

  // console.log(users);
  const [rowId, setRowId] = useState(null);

  const allAttendees = users?.map((item) => {
    return {
      image: item.image,
      id: item.id,
      email: item.email,
      username: item.username,
      roles: _.toString(item.roles),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
    // item.roles, item.id;
  });

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 220,
        renderCell: (params) => (
          <Image width={100} height={100} src={params.row.image} alt="image" />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "id", headerName: "Id", width: 220 },
      { field: "username", headerName: "Username", width: 120 },
      {
        field: "roles",
        headerName: "Role",
        width: 200,
        valueGetter: (params) => {
          const role = params.row.roles;
          return role;
        },
      },
      {
        field: "actions",
        headerName: "View Profile",
        width: 220,
        renderCell: (params) => <ViewProfile {...{ params }} />,
      },
      {
        field: "createdAt",
        headerName: "Member since",
        width: 220,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "updatedAt",
        headerName: "Last updated",
        width: 220,
        renderCell: (params) =>
          moment(params.row.updatedAt).format("YYYY-MM-DD HH:MM:SS"),
      },
    ],
    [rowId]
  );
  return (
    <section className="  ">
      <div>All Attendees</div>
      <Box
        sx={{
          height: 500,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: "center", mt: 0, mb: 0 }}
        >
          view all attendees
        </Typography>
        {users?.length !== 0 ? (
          <DataGrid
            columns={columns}
            rows={allAttendees}
            className=" mt-5 p-8"
            getRowId={(row) => row.id}
            pagination={true}
            {...columns}
            initialState={{
              ...columns.initialState,

              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[10, 20]}
            // paginationMode="server"
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
          />
        ) : (
          <h1>no user available</h1>
        )}
      </Box>
      {profileView && (
        <div className="">
          <SingleProfileView users={users} id={modalId} />
        </div>
      )}
    </section>
  );
};

export default AllAttendees;
