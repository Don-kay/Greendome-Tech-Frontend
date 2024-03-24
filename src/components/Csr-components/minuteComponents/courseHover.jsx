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

const CourseHover = ({
  studentCourse,
  studentCourses,
  isOpen,
  onClosed,
  modalOpen,
  RemoveCourse,
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
  // console.log(studentCourses);
  return (
    <main
      className={
        modalOpen
          ? " relative -left-20 min-w-addCourse max-w-addCourse"
          : " opacity-0"
      }
    >
      {!studentCourses.length <= 0 ? (
        <div onMouseOut={onClosed}>
          {studentCourse?.map((item, idx) => {
            const {
              id,
              image,
              name,
              Serial_key,
              description,
              author,
              fee,
              updatedAt,
              createdAt,
              Party_Type,
            } = item;
            //console.log(id);
            const imageType = image === undefined || image === "" ? "" : image;
            return (
              <div
                className=" flex justify-center bg-greenGraded items-center gap-y-2 cursor-pointer p-7  flex-col"
                key={idx}
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
                    <Image
                      width={100}
                      height={100}
                      src={Greendome}
                      alt="image"
                    />
                  </div>
                )}
                <div className=" flex justify-start  gap-y-5 cursor-pointer p-10  flex-col">
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className="  font-medium text-white">serial key:</h3>
                    <h4 className=" text-white"> {Serial_key}</h4>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className="  text-white font-medium">name:</h3>
                    <h2 className=" text-white"> {name}</h2>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className="  text-white font-medium">description:</h3>
                    <h4 className="  text-white max-w-innerlay">
                      {" "}
                      {description}
                    </h4>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className="  text-white font-medium">author:</h3>
                    <h4 className=" text-white"> {author}</h4>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className="  text-white font-medium">fee:</h3>
                    <h4 className=" text-white"> {fee}</h4>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className="  text-white font-medium">party:</h3>
                    <h4 className=" text-white"> {Party_Type}</h4>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className="  text-white font-medium">last updated:</h3>
                    <h4 className=" text-white">
                      {moment(updatedAt).format("YYYY-MM-DD HH:MM:SS")}
                    </h4>
                  </div>
                  <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                    <h3 className=" font-medium  text-white">creeated:</h3>
                    <h4 className=" text-white">
                      {moment(createdAt).format("YYYY-MM-DD HH:MM:SS")}
                    </h4>
                  </div>
                </div>
                <button
                  className="border-width1px text-white border-grey p-3 rounded-md bg-greenGraded1 hover:text-whiteHov"
                  onClick={() => RemoveCourse(id)}
                >
                  remove course
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </main>
  );
};

export default CourseHover;
