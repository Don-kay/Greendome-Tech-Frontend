"use client";
import React from "react";

const ConfirmationModal = ({ deleteModule, retainModule, moduleid }) => {
  const customStyles = {
    content: {
      position: "relative",
      top: "4vh",
      left: "18.5%",
      maxWidth: "80%",
      padding: "8%",
      overflow: "auto",
      maxHeight: "90vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 0,
    },
  };
  return (
    <div
      className={
        " flex items-center p-10 z-20 w-5/12 absolute bg-greenGraded1 left-96 top-60 flex-col"
      }
    >
      <h4 className=" text-white ">are you sure?</h4>
      <div className=" relative top-0 flex justify-around items-center gap-10 flex-row ">
        <button className=" text-white " onClick={() => deleteModule(moduleid)}>
          yes
        </button>
        <button className=" text-white " onClick={() => retainModule()}>
          no
        </button>
      </div>
    </div>
  );
};
export const CourseconfirmationModal = ({
  deleteModule,
  retainModule,
  courseid,
}) => {
  return (
    <div
      className={" flex justify-center items-center flex-col"}
      style={{
        position: "absolute",
        top: "34vh",
        left: "40%",
        maxWidth: "100%",
        padding: "8%",
        overflow: "auto",
        maxHeight: "90vh",
        backgroundColor: "#0d4704",
        //   transform: "translate(-50%, -50%)",
        zIndex: 20,
      }}
    >
      <h4 className=" text-white ">are you sure to delete course?</h4>
      <div className=" relative top-0 flex justify-around items-center gap-10 flex-row ">
        <button className=" text-white " onClick={() => deleteModule(courseid)}>
          yes
        </button>
        <button className=" text-white " onClick={() => retainModule()}>
          no
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
