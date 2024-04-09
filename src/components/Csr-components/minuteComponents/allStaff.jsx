"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ViewProfile from "../../../features/profile/viewProfile";
import { ProfileModal } from "../../../features/functions/functionSlice";
import SingleProfileView from "./SingleProfileView";
import Image from "next/image";
import moment from "moment";

const AllStaff = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [allAttendees, setAllattendees] = useState([]);

  const fetchCourses = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
        {
          withCredentials: true,
        }
      );

      const Courses = resp.data.course;
      setData(Courses);
    } catch (error) {
      return { msg: error?.response.data };
    }
  };
  useEffect(() => {
    try {
      if (users === undefined || users?.length === 0) {
        setTrigger(true);
      } else {
        const staffObj = users?.filter((item) => {
          return item.roles.includes("Admin");
        });
        const allAttendee = staffObj?.map((item) => {
          return {
            id: item.id,
            image: item.image,
            username: item.username,
            roles: _.toString(item.roles),
          };

          // item.roles, item.id;
        });
        setAllattendees(allAttendee);
        setTrigger(false);
      }
    } catch (error) {
      return error;
    }
    fetchCourses();
    dispatch(GetAllUsers());
    dispatch(ProfileModal({ bool: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //console.log("users");
  const { users, errorMsg } = useSelector((strore) => strore.profiles);
  const { profileView, modalId } = useSelector((strore) => strore.functions);
  const [pageSize, setpageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

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
        field: "role",
        headerName: "Role",
        width: 200,
        valueGetter: (params) => {
          const role = params.row.roles;
          return role;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    []
  );
  return (
    <section>
      <div>Management</div>
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
          view all Tutors
        </Typography>
        {trigger ? (
          <div className=" flex justify-center items-center relative top-36  h-72 w-full ">
            <h1 className=" text-align">no user available</h1>
          </div>
        ) : (
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
        )}
      </Box>
      {profileView && (
        <div>
          <SingleProfileView courses={data} users={users} id={modalId} />
        </div>
      )}
    </section>
  );
};

export default AllStaff;
