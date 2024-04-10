import React, {
  useState,
  useRef,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import PageTitle from "../../typography/PageTitle";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "../minuteComponents/addEventModal";
import UpdateEventModal from "../minuteComponents/updateEventModal";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import ProfileActions from "../../../features/profile/profileActions";
import CalendarFunction from "../../../features/calendar/CalendarFunction";
import SingleEventView from "../minuteComponents/SingleEventView";
import { ProfileModal } from "../../../features/functions/functionSlice";
import Greendome from "../../asset/greendome.jpg";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import customFetch, { customFetchProduction } from "@/utilities/axios";
import { Fetch } from "../../../utilities/axios";

const Calendar = ({ isStudent, isAdmin }) => {
  const [modalOpen, setModalOpen] = useState({
    addEvent: false,
    viewEvent: false,
  });
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [singleEvent, setSingleEvent] = useState("");
  const [singleEvent1, setSingleEvent1] = useState("");
  const [deletedEvent, setDeletedEvent] = useState("");
  const [params, setParams] = useState("");
  const [eventView, setEventview] = useState(false);
  const { profileView, modalId } = useSelector((strore) => strore.functions);
  const dispatch = useDispatch();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [event, setEvent] = useState([]);
  const [count, setCount] = useState();
  const { user } = useSelector((strore) => strore.user);
  const { users } = useSelector((state) => state.profiles);
  // const { course } = useSelector((state) => state.course);
  const loggedInUserId = user.data.user.id;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;

  const Student = loggedInUser?.map((i) => {
    return i.roles.includes("student");
  });
  const Admin = loggedInUser?.map((i) => {
    return i.roles.includes("Admin");
  });
  //console.log(event);
  const IsStudent = _.toString(Student);
  const IsAdmin = _.toString(Admin);

  const onEventAdded = (event1) => {
    setEvent([...event, event1]);
    setCount(event.length + 1);
  };
  // console.log(singleEvent1);
  //console.log(event);
  useEffect(() => {
    dispatch(ProfileModal({ bool: false }));
    try {
      const fetcher = async () => {
        const response = await Fetch.get(
          `/calendar/get-events`,
          // setEvent(response.data),
          {
            withCredentials: true,
            credentials: "includes",
          }
        );
        const data = response.data;
        // console.log(data);
        const EventList = data?.event.map((item) => {
          return {
            image: item.image,
            id: item._id,
            title: item.title,
            start: item.start,
            end: item.end,
            description: item.description,
            // uid: item.uid,
          };
        });
        setSingleEvent1(EventList);
        setEvent(data.event);
        setCount(data.count);
      };
      fetcher();
    } catch (error) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateModalOpen]);

  const updateEventHandler = (prop) => {
    const singleEvent = event?.filter((item) => item._id === prop);
    setSingleEvent(singleEvent[0]);
    setUpdateModalOpen(true);
    setParams(prop);
  };

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
      description: item.description,
      // uid: item.uid,
    };
  });
  //console.log(EventList);

  const deleteEventHandler = async (prop) => {
    // const singleEvent = EventList.filter((item) => item.id !== prop);
    const deltd = await Fetch.delete(`/calendar/delete-events/${prop}`, {
      withCredentials: true,
      credentials: "includes",
    });
    const resp = deltd.data.event;
    const allEvents = deltd.data.events;
    const deletedId = resp._id;
    // console.log(deletedId);
    setCount(allEvents.length);
    setDeletedEvent(deletedId);
    setEvent(allEvents);
  };

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 220,
        renderCell: (params) =>
          params.row.image === "" || params.row.image === undefined ? (
            <Image width={200} height={200} src={Greendome} alt="image" />
          ) : (
            <Image
              width={100}
              height={100}
              src={params.row.image}
              alt="image"
            />
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
          <CalendarFunction
            {...{ params }}
            isStudent={IsStudent}
            isAdmin={IsAdmin}
            setEventview={setEventview}
            isOpen={setModalOpen}
            updateEventHandler={(prop) => updateEventHandler(prop)}
            ondelete={(prop) => deleteEventHandler(prop)}
          />
        ),
      },
    ], // eslint-disable-next-line react-hooks/exhaustive-deps
    [Admin]
  );
  // console.log(event);

  return (
    <section className=" flex justify-center flex-col">
      <div className=" flex justify-around items-center flex-row">
        {/* <div>Calendar</div> */}
        {IsAdmin ? (
          <button
            className="btn z-50 hover:bg-greenGraded"
            onClick={() => setModalOpen({ addEvent: true })}
          >
            Add Event
          </button>
        ) : null}
      </div>
      <AddEventModal
        isOpen={modalOpen.addEvent}
        onClosed={() => setModalOpen({ addEvent: false })}
        onEventAdded={(event1) => onEventAdded(event1)}
      />
      <UpdateEventModal
        isOpen={updateModalOpen}
        onClosed={() => setUpdateModalOpen(false)}
        singleEvent={singleEvent}
        params={params}
        // update={forceUpdate}
        events={event}
        setEvent={setEvent}
        // onEventAdded={(event1) => onEventAdded(event1)}
      />
      <div className=" z-20">
        <FullCalendar
          // ref={calendarRef}
          height={"80vh"}
          dayMinWidth={"80%"}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={event}
          // weekends={false}
        />
      </div>
      {profileView ? (
        <SingleEventView
          isOpen={modalOpen.viewEvent}
          onClosed={() => setModalOpen({ viewEvent: false })}
          onEventAdded={(event1) => onEventAdded(event1)}
          events={event}
          id={modalId}
        />
      ) : null}
      <div className=" relative top-16 w-full h-fit">
        <div className=" text-center">
          <PageTitle>Event Schedule</PageTitle>
        </div>
        <div className=" relative top-28">
          <Box
            sx={{
              height: 700,
              width: "100%",
              backgroundColor: "hsl(0, 14%, 97%)",
              padding: "1.5rem",
              zIndex: "0",
            }}
          >
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
              >
                {`${count} events in Queue`}
              </Typography>
            </div>

            <DataGrid
              columns={columns}
              rows={EventList}
              getRowId={(row) => row.id}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
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
    </section>
  );
};

export default Calendar;
