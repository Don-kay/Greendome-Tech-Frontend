"use client";
import React from "react";
import { Box, Fab } from "@mui/material";
import Link from "next/link";
import { GrOverview } from "react-icons/gr";
import { AiFillSetting, AiFillDelete, AiFillFileAdd } from "react-icons/ai";

const ProfileActions = ({ isAdmin, params, onOpen, studentId }) => {
  // const { users } = useSelector((strore) => strore.profiles);
  // console.log(studentId);
  const studentid = params.id;
  const route = "/panel/admin_dashboard/all-students";
  const addRoute = "/panel/admin_dashboard/add-to-course/";
  const handler = () => {
    studentId(studentid);
    onOpen();
  };
  // console.log(studentId);
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <Fab onClick={() => handler()}>
        <GrOverview />
      </Fab>
      {/* <Link href={`${route}/${studentId}`}>
        <Fab>
          <GrOverview />
        </Fab> */}
      {isAdmin ? (
        <Link href={`${addRoute}/${studentid}`}>
          <Fab>
            <AiFillFileAdd />
          </Fab>
        </Link>
      ) : null}

      {isAdmin ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <AiFillSetting />
        </Fab>
      ) : null}
    </Box>
  );
};

export default ProfileActions;

export async function getStaticPaths() {
  return {};
}
