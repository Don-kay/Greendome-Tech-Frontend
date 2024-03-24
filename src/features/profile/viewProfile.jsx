"use client";
import React from "react";
import { Box, Fab } from "@mui/material";
import Link from "next/link";
import { GrOverview } from "react-icons/gr";
import { ProfileModal } from "../functions/functionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

const ViewProfile = ({ params }) => {
  // const { users } = useSelector((strore) => strore.profiles);
  // console.log(studentId);
  const dispatch = useDispatch();
  const attendeesId = params.id;
  // console.log(params.id);

  const displayProfile = (attendeesId) => {
    dispatch(ProfileModal({ id: attendeesId, bool: true }));
  };

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <div onClick={() => displayProfile(attendeesId)}>
        <Fab>
          <GrOverview />
        </Fab>
      </div>
    </Box>
  );
};

export default ViewProfile;

export async function getStaticPaths() {
  return {};
}
