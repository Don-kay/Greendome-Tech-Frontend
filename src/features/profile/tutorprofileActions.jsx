"use client";
import React from "react";
import { Box, Fab } from "@mui/material";
import Link from "next/link";
import { GrOverview } from "react-icons/gr";
import { AiFillSetting, AiFillDelete, AiFillFileAdd } from "react-icons/ai";

const TutorProfileActions = ({ params, onOpen, studentId }) => {
  // const { users } = useSelector((strore) => strore.profiles);
  // console.log(studentId);
  const studentid = params.id;
  const route = "/panel/admin_dashboard/all-students";
  const addRoute = "/panel/add-to-course/";
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
      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <AiFillSetting />
      </Fab>
    </Box>
  );
};

export default TutorProfileActions;

export async function getStaticPaths() {
  return {};
}
