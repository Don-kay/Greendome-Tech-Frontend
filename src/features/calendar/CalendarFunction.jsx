"use client";
import React from "react";
import { Box, Fab } from "@mui/material";
import { GrOverview } from "react-icons/gr";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import { ProfileModal } from "../functions/functionSlice";
import { useDispatch, useSelector } from "react-redux";

const CalendarFunction = ({
  isOpen,
  params,
  onclosed,
  ondelete,
  isStudent,
  setEventview,
}) => {
  // const { users } = useSelector((strore) => strore.profiles);
  // console.log(studentId);
  const dispatch = useDispatch();
  const eventId = params.id;
  const displayEvents = (attendeesId) => {
    dispatch(ProfileModal({ id: attendeesId, bool: true }));
  };

  const dispatchFunction = () => {
    displayEvents(eventId);
    isOpen({ viewEvent: true });
    //  setEventview(true);
  };

  // console.log(studentId);
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
        display: "flex",
        justifyItems: "center",
        flexFlow: "row",
      }}
    >
      {isStudent === "true" ? null : (
        <Fab
          onClick={() => onclosed(eventId)}
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <AiFillSetting />
        </Fab>
      )}

      <div onClick={() => dispatchFunction()}>
        <Fab
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <GrOverview />
        </Fab>
      </div>
      {isStudent === "true" ? null : (
        <Fab
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={() => ondelete(eventId)}
        >
          <AiFillDelete />
        </Fab>
      )}
    </Box>
  );
};

export default CalendarFunction;
