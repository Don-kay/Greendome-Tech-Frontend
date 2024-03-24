"use client";

import React, { useState, useRef, useReducer, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "../minuteComponents/addEventModal";

import UpdateEventModal from "../minuteComponents/updateEventModal";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import ViewProfile from "../../../features/profile/viewProfile";
import CalendarFunction1 from "../../../features/calendar/CalendarFunction1";
import SingleEventView from "./SingleEventView";
import { ProfileModal } from "../../../features/functions/functionSlice";
import Greendome from "../../asset/greendome.jpg";
import Image from "next/image";
import moment from "moment";
import axios from "axios";

const AllEvent = () => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    addEvent: false,
    viewEvent: false,
  });
  const [event, setEvent] = useState([]);
  const { profileView, modalId } = useSelector((strore) => strore.functions);
  const dispatch = useDispatch();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [count, setCount] = useState();
  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(ProfileModal({ bool: false }));
  }, []);

  useEffect(() => {
    dispatch(ProfileModal({ bool: false }));
    try {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:8000/greendometech/ng/calendar/get-events",
          // setEvent(response.data),
          {
            withCredentials: true,
            credentials: "includes",
          }
        );
        const data = response.data;
        // console.log({ data: data.event, Count: data.count });
        setEvent(data.event);
        setCount(data.count);
      };
      fetch();
    } catch (error) {
      return;
    }
  }, [updateModalOpen]);

  // useEffect(() => {
  //   console.log(event);
  // }, [onEventAdded]);

  const EventList = event?.map((item) => {
    return {
      image: item.image,
      id: item._id,
      title: item.title,
      start: item.start,
      end: item.end,
      // uid: item.uid,
    };
  });
  // console.log(profileView);

  const columns = useMemo(() => [
    {
      field: "image",
      headerName: "Image",
      width: 220,
      renderCell: (params) =>
        params.row.image === "" || params.row.image === undefined ? (
          <Image width={200} height={200} src={Greendome} alt="image" />
        ) : (
          <Image width={100} height={100} src={params.row.image} alt="image" />
        ),
      sortable: false,
      filterable: false,
    },

    { field: "id", headerName: "Id", width: 300 },
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "start",
      headerName: "Start",
      width: 200,
      renderCell: (params) =>
        moment(params.row.start).format("YYYY-MM-DD HH:MM:SS"),
    },
    {
      field: "end",
      headerName: "End",
      width: 200,
      renderCell: (params) =>
        moment(params.row.end).format("YYYY-MM-DD HH:MM:SS"),
    },
    {
      field: "settings",
      headerName: "Settings",
      width: 220,
      renderCell: (params) => (
        <CalendarFunction1 isOpen={setModalOpen} {...{ params }} />
      ),
    },
  ]);
  // console.log(event);

  return (
    <section className=" flex justify-center flex-col">
      <div>Calendar</div>
      {profileView ? (
        <SingleEventView
          isOpen={modalOpen.viewEvent}
          onClosed={() => setModalOpen({ viewEvent: false })}
          events={event}
          id={modalId}
        />
      ) : null}
      <div className=" w-full h-fit">
        <h1>Event Schedule</h1>
        <div>
          <Box sx={{ height: 500, width: "100%", backgroundColor: "" }}>
            <div className=" flex justify-center gap-2 flex-row">
              <Typography
                variant="h5"
                component={"h5"}
                sx={{
                  textAlign: "center",
                  mt: 3,
                  mb: 3,
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  flexFlow: "row",
                }}
              >
                Events
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                sx={{
                  textAlign: "center",
                  mt: 3,
                  mb: 3,
                  marginLeft: 10,
                  display: "flex",
                  justifyContent: "space-around",
                  flexFlow: "row",
                }}
              ></Typography>
            </div>

            <DataGrid
              columns={columns}
              rows={EventList}
              getRowId={(row) => row.id}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 25]}
              getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5,
              })}
            />
          </Box>
        </div>
      </div>
      {profileView && (
        <div>
          <SingleEventView events={event} id={modalId} />
        </div>
      )}
    </section>
  );
};

export default AllEvent;

// const= () => {

//   return (
//     <section>
//       <div>All Attendees</div>
//       <Box
//         sx={{
//           height: 400,
//           width: "100%",
//         }}
//       >
//         <Typography
//           variant="h4"
//           component="h4"
//           sx={{ textAlign: "center", mt: 0, mb: 0 }}
//         >
//           view all attendees
//         </Typography>
//         {event?.length !== 0 ? (
//           <DataGrid
//             columns={columns}
//             rows={allEvent}
//             getRowId={(row) => row.id}
//             initialState={{
//               pagination: { paginationModel: { pageSize: 10 } },
//             }}
//             pageSizeOptions={[5, 10, 25]}
//             getRowSpacing={(params) => ({
//               top: params.isFirstVisible ? 0 : 5,
//               bottom: params.isLastVisible ? 0 : 5,
//             })}
//           />
//         ) : (
//           <h1>no event available</h1>
//         )}
//       </Box>

//       {profileView && (
//         <div>
//           <SingleEventView events={event} id={modalId} />
//         </div>
//       )}
//     </section>
//   );
// };

// export default AllEvent;
