"use client";
import React from "react";
import { Box, Fab } from "@mui/material";
import Link from "next/link";
import { GrOverview } from "react-icons/gr";
import { AiFillSetting, AiFillDelete, AiFillFileAdd } from "react-icons/ai";

const UpdateDropDown = ({ id }) => {
  // console.log(id);
  const updateRoute = "/panel/admin-update-module";
  // console.log(studentId);
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <Link href={`${updateRoute}/${id}`}>
        <Fab>
          <AiFillSetting />
        </Fab>
      </Link>
      {/* <Link href={`${url}/${id}`}>
        <Fab>
          <AiFillFileAdd />
        </Fab> */}
      {/* </Link> */}
      {/* <Link href={`${url}/${name}/${id}`}>
        <Fab>
          <AiFillFileAdd />
        </Fab>
      </Link> */}
    </Box>
  );
};

export default UpdateDropDown;
