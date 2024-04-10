import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import axios from "axios";
import { Textarea } from "@roketid/windmill-react-ui";
import { Fetch } from "../../../utilities/axios";
import TextARea from "../../TextArea";
import FormRow from "../../FormRow";
import Image from "next/image";
import _ from "lodash";

const AddEventModal = ({ isOpen, onClosed, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [nuStart, setNustart] = useState(new Date());
  const [nuEnd, setNuend] = useState(new Date());
  const [file, setFile] = useState();
  const [img, setImg] = useState(false);
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;
  // console.log(start);
  // console.log(end);

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

    // const schedule = { title, start, end };
    // console.log(schedule);
    // console.log(typeof start);
    try {
      const resp = await Fetch.post(
        "/calendar/create-event",
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
      // console.log(resp.data);
      const createdEvent = await resp.data.event;
      onEventAdded(createdEvent);
      onClosed();
      setTitle("");
      setDescription("");
      setNustart("");
      setNuend("");
      setFile("");
    } catch (error) {
      setError(error?.response.data);
      setTrigger(true);
    }
  };

  return (
    <Modal
      className="rounded-md flex justify-center items-center flex-col border-y-greenui overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 "
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      <button onClick={() => onClosed()}>Go Back</button>

      {trigger && <h2>{`input ${error}`}</h2>}
      <form
        style={{
          position: "relative",
          top: "80%",
          left: "0%",
          maxWidth: "50vw",
          // backgroundColor: "cornflowerblue",
        }}
        className=" flex gap-x-64 justify-around items-center flex-row"
        onSubmit={onSubmit}
      >
        <div className=" flex gap-y-10 justify-start items-start flex-col">
          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
            className="p-2"
          />
          <TextARea
            value={description || " "}
            type="text"
            name="description"
            handleChange={(e) => setDescription(e.target.value)}
            className=" relative p-2 "
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
              value={nuStart}
              onChange={(date) => setNustart(date)}
              className="p-2"
            />
          </div>

          <div className=" flex flex-row gap-x-6">
            <label className=" font-bold">end date</label>
            <Datetime
              value={nuEnd}
              className="p-2"
              onChange={(date) => setNuend(date)}
            />
          </div>

          <button className="btn z-50 hover:bg-greenGraded">Add event</button>
        </div>

        <div className=" flex gap-y-10 justify-start items-start flex-col">
          <FormRow
            type="file"
            accept="image/*"
            name="profile-image"
            // value={values.password}
            handleChange={handleImageFile}
          />
          {img && (
            <small style={{ color: "red" }}>
              image exceeds 1mb, choose another inage
            </small>
          )}
          {file === "" || file === undefined ? (
            ""
          ) : (
            <Image width={200} height={200} src={file} alt="image" />
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AddEventModal;
