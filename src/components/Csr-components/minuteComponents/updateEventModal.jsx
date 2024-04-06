import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import Image from "next/image";
import axios from "axios";
import TextARea from "../../TextArea";
import PageTitle from "../../typography/PageTitle";
import Loading from "../layout_constructs/loading";
import FormRow from "../../FormRow";
import _ from "lodash";

const UpdateEventModal = ({
  isOpen,
  onClosed,
  singleEvent,
  params,
  events,
  setEvent,
}) => {
  const etitle = singleEvent?.title;
  const estart = singleEvent?.start;
  const eEnd = singleEvent?.end;
  const eImage = singleEvent?.image;
  const eDescription = singleEvent?.description;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nuStart, setNustart] = useState(12);
  const [nuEnd, setNuend] = useState(23);
  const [file, setFile] = useState("");
  const [img, setImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const image = !eImage ? "" : eImage;
  //console.log(singleEvent);
  useEffect(() => {
    if (etitle === "undefined") {
      return;
    } else {
      setTitle(etitle);
      setNustart(new Date(estart));
      setNuend(new Date(eEnd));
      setFile(image);
      setDescription(eDescription);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleEvent]);
  // console.log(start);

  const customStyles = {
    content: {
      position: "relative",
      top: "25vh",
      left: "20%",
      maxWidth: "70%",
      padding: "3%",
      overflow: "auto",
      maxHeight: "90vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 50,
    },
  };

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      console.log(file[0]?.name);
    } else if (
      file[0]?.size > 1024 * 1024 &&
      file[0].type.startsWith("image/")
    ) {
      setImg(true);
    }
  };
  const setImageFiletoBase = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        if (reader.result !== "") {
          setImg(false);
          setFile(reader.result);
        }
      };
    } catch (error) {
      return;
    }

    // setFile(file[0].name);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const start = nuStart._d;
    const end = nuEnd._d;
    const image = file;
    setLoading(true);

    const resp = await axios.patch(
      `http://localhost:8000/greendometech/ng/calendar/update-events/${params}`,
      {
        title,
        start,
        end,
        image,
        description,
      },
      {
        withCredentials: true,
        credentials: "includes",
      }
    );
    const updatedEvent = await resp.data.event;
    const updatedId = updatedEvent._id;
    const refreshed = events.filter((item) => item._id !== updatedId);
    //console.log(resp);
    setEvent([...refreshed, updatedEvent]);
    if (resp.data.msg === "schedule successfully updated") {
      setLoading(false);
    }
    onClosed();
  };

  return (
    <Modal
      className="rounded-md flex justify-center items-center flex-col border-y-greenui overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 "
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      {loading && (
        <div className=" flex items-center w-full h-full -top-10 left-0 z-20 absolute">
          <Loading />
        </div>
      )}
      <PageTitle>Update Event</PageTitle>
      <button onClick={() => onClosed()}>Go Back</button>
      <form
        style={{
          position: "relative",
          top: "80%",
          left: "0%",
          maxWidth: "50vw",
        }}
        className=" flex gap-x-64 justify-around items-center flex-row"
        onSubmit={onSubmit}
      >
        <div className=" flex gap-y-10 justify-center items-start flex-col">
          <FormRow
            type="text"
            name="title"
            value={title || " "}
            handleChange={(e) => setTitle(e.target.value)}
            className="p-2"
          />
          <TextARea
            value={description || " "}
            type="text"
            name="description"
            handleChange={(e) => setDescription(e.target.value)}
            className="h-32 w-72 p-2"
          />
          {/* <input
          style={{ zIndex: 1000 }}
          placeholder="Title"
          //   value={title}
          //   onChange={(e) => setTitle(e.target.value)}
        /> */}
          <div className=" flex flex-row gap-x-6">
            <label className=" font-bold">start date</label>
            <Datetime
              value={nuStart || " "}
              onChange={(date) => setNustart(date)}
              className=" p-2"
            />
          </div>

          <div className=" flex flex-row gap-x-6">
            <label className=" font-bold">end date</label>
            <Datetime
              value={nuEnd || " "}
              onChange={(date) => setNuend(date)}
              className="p-2"
            />
          </div>
          <button className="btn z-50 hover:bg-greenGraded">
            update event
          </button>
        </div>

        <div className=" flex gap-y-10 justify-start items-start flex-col">
          <FormRow
            type="file"
            accept="image/*"
            name="profile-image"
            // value={url}
            handleChange={handleImageFile}
          />
          {img && (
            <small style={{ color: "red" }}>
              image exceeds 1mb, choose another inage
            </small>
          )}
          {file !== "" && (
            <Image width={200} height={200} src={file} alt="image" />
          )}
        </div>
      </form>
    </Modal>
  );
};

export default UpdateEventModal;
