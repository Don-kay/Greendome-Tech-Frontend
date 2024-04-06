"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import functionsSpace from "../../../features/functions/functions";
import axios from "axios";
import InfoCard2 from "../../Cards/InfoCard 2";
import Modal from "react-modal";
import Image from "next/image";
import Greendome from "../../asset/greendome.jpg";
import moment from "moment";

const SingleEventView = ({ events, id, isOpen, onClosed }) => {
  // const { modalId } = useSelector((strore) => strore.functions);
  const customStyles = {
    content: {
      position: "relative",
      top: "18vh",
      left: "35%",
      maxWidth: "40%",
      padding: "3%",
      overflow: "auto",
      maxHeight: "60vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 50,
    },
  };
  const singleEvent = events.filter((i) => i._id === id);
  // console.log(singleEvent);
  // console.log(events);
  // console.log("events");
  return (
    <Modal
      className=" rounded-md flex flex-col items-center border-y-greenui overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 "
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      {singleEvent.map((item, idx) => {
        const { _id, title, start, end, image, description } = item;
        const starter = moment(start).format("YYYY-MM-DD HH:MM:SS");
        const ended = moment(end).format("YYYY-MM-DD HH:MM:SS");
        const imageType = image === undefined || image === "" ? "" : image;
        return (
          <div className="" key={idx}>
            <InfoCard2
              imageType={imageType}
              title={title}
              value1={description}
              value2={starter}
              value3={ended}
              sub1="description:"
              sub2="commencement:"
              sub3="submission:"
            />
          </div>
        );
      })}
    </Modal>
  );
};

export default SingleEventView;
