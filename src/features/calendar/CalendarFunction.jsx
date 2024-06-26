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
  updateEventHandler,
  ondelete,
  isStudent,
  isAdmin,
  setEventview,
}) => {
  // const { users } = useSelector((strore) => strore.profiles);

  const dispatch = useDispatch();
  const eventId = params.id;
  const displayEvents = (attendeesId) => {
    dispatch(ProfileModal({ id: attendeesId, bool: true }));
  };
  // console.log(params.id);
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
      {isAdmin === "true" ? (
        <Fab
          onClick={() => updateEventHandler(eventId)}
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <AiFillSetting />
        </Fab>
      ) : null}

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
      {isAdmin === "true" ? (
        <Fab
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={() => ondelete(eventId)}
        >
          <AiFillDelete />
        </Fab>
      ) : null}
    </Box>
  );
};

export default CalendarFunction;
