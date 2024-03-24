"use client";
import React from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import StudentView1 from "./studentView1";
import { CourseconfirmationModal } from "../minuteComponents/confirmationModal";
import CreateModule from "./createModule";
import EditCourse from "./editCourse";
import _ from "lodash";
import Modal from "react-modal";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import { HoverModal } from "../../../features/functions/functionSlice";
import { resetModule } from "../../../features/course/module/moduleSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Greendome from "../../asset/greendome.jpg";
import PageTitle from "../../typography/PageTitle";
import InfoCard2 from "../../Cards/InfoCard 2";
import functionsSpace from "../../../features/functions/functions";
import Image from "next/image";
import { useEffect, useState } from "react";

// async function fetchCourse() {
//   const cookiesStore = cookies();
//   const cookie = cookiesStore.get("myToken")?.value;

//   try {
//     const res = await customFetch.get(
//       "/course/admin/view-all-course",
//       {
//         headers: {
//           Cookie: "myToken=" + cookie,
//         },
//       },
//       { withCredentials: true }
//     );
//     const resp = { data: res.data, stats: res.status };
//     return resp.data;
//   } catch (error) {
//     return { msg: error?.response.data };
//   }
// }

//

const ViewUsers = ({ isOpen, onClosed, assigned, role }) => {
  const dispatch = useDispatch();
  const [modalOpen1, setModalOpen1] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [authCourses, setAuthCourses] = useState([]);

  const Done = () => {};

  const customStyles = {
    content: {
      position: "relative",
      top: "19vh",
      left: "35%",
      maxWidth: "50%",
      padding: "1%",
      overflow: "auto",
      maxHeight: "60vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 60,
    },
  };
  const isStudent = role?.role === "student";
  // console.log();
  const toggleHover = (id) => {
    setModalOpen1(true);
    setTrigger(true);
  };

  const users = assigned?.map((item, idx) => {
    const { image, id, firstname, username, roles, email } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    const role = functionsSpace(roles);

    return (
      <div className=" w-80 " key={idx}>
        <InfoCard2
          imageType={imageType}
          title={isStudent ? "student" : "tutor"}
          value1={id}
          value2={username}
          value3={firstname}
          value4={email}
          value5={role}
          sub1="id:"
          sub2="username:"
          sub3="firstname:"
          sub4="email:"
          sub5="role"
        />
      </div>
    );
  });

  return (
    <Modal
      className="rounded-md flex flex-col items-center border-y-greenui overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 "
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      <PageTitle className=" my-6 text-xl">
        {isStudent ? "assigned students" : "assigned tutors"}
      </PageTitle>
      <div className="grid gap-x-5 mb-8 sm:grid-cols-1 md:grid-cols-2">
        {assigned?.length === 0 ? (
          <h2 className=" relative top-40 text-greenGraded1 text-2xl">
            none assigned
          </h2>
        ) : (
          users
        )}
      </div>
    </Modal>
  );
};

export default ViewUsers;
