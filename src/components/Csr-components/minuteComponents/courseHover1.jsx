"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";
import Greendome from "../../asset/greendome.jpg";
import Modal from "react-modal";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ViewProfile from "../../../features/profile/viewProfile";
import { ProfileModal } from "../../../features/functions/functionSlice";
import SingleProfileView from "./SingleProfileView";

const CourseHover1 = ({
  studentCourse,
  isOpen,
  onClosed,
  container,
  setModalOpen1,
  location,
}) => {
  const customStyles = {
    content: {
      position: "relative",
      top: "40%",
      left: "0%",
      maxWidth: "50vw",
      maxHeight: "50vh",
      backgroundColor: "red",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };
  // console.log(studentCourse);
  // useEffect(() => {
  //   const hover = container.current;
  //   const { center, bottom } = location;
  //   hover.style.left = `${center + 200}px`;
  //   hover.style.top = `${bottom - 180}px`;
  // }, [location]);

  return (
    <main ref={container} className=" bg-whiteGraded">
      <div onMouseLeave={onClosed}>
        {studentCourse?.map((item, id) => {
          const {
            image,
            _id,
            name,
            Serial_key,
            description,
            author,
            fee,
            updatedAt,
            createdAt,
            Party_Type,
          } = item;
          const imageType = image === undefined || image === "" ? "" : image;
          return (
            <div
              className=" flex justify-center bg-whiteGraded items-center gap-y-2 cursor-pointer p-7  flex-col"
              key={id}
            >
              {imageType !== "" ? (
                <div className=" flex justify-center items-center m-3 overflow-hidden  w-24 h-auto rounded-full">
                  <Image
                    className=" h-24"
                    width={100}
                    height={140}
                    src={imageType}
                    alt="image"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center m-3 overflow-hidden  w-24 h-auto rounded-full">
                  <Image width={100} height={100} src={Greendome} alt="image" />
                </div>
              )}
              <div className=" flex justify-start  gap-y-5 cursor-pointer p-10  flex-col">
                <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                  <h3 className=" font-medium">serial key:</h3>
                  <h4> {Serial_key}</h4>
                </div>
                <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                  <h3 className=" font-medium">name:</h3>
                  <h2> {name}</h2>
                </div>
                <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                  <h3 className=" font-medium">description:</h3>
                  <h4 className=" max-w-hov"> {description}</h4>
                </div>
                <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                  <h3 className=" font-medium">author:</h3>
                  <h4> {author}</h4>
                </div>
                <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                  <h3 className=" font-medium">fee:</h3>
                  <h4> {fee}</h4>
                </div>
                <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                  <h3 className=" font-medium">party:</h3>
                  <h4> {Party_Type}</h4>
                </div>
                <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                  <h3 className=" font-medium">last updated:</h3>
                  <h4>{moment(updatedAt).format("YYYY-MM-DD HH:MM:SS")}</h4>
                </div>
                <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                  <h3 className=" font-medium">creeated:</h3>
                  <h4>{moment(createdAt).format("YYYY-MM-DD HH:MM:SS")}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default CourseHover1;
