"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import ConfirmationModal from "../minuteComponents/confirmationModal";
import functionsSpace from "../../../features/functions/functions";
import EditProfile from "./editProfile";
import moment from "moment";
import _ from "lodash";
import Image from "next/image";
import Modal from "react-modal";
import EditQuestion from "./editQuestion2";
import CreateQuestion from "./createQuestion";
import EditModule from "./editModule";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import Greendome from "../../asset/greendome.jpg";
import { HoverModal } from "../../../features/functions/functionSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState = {
  id: "",
  email: "",
  country: "",
  mobilenumber: "",
  image: "",
  roles: "",
  certificate: "",
  classesId: "",
  firstname: "",
  lastname: "",
  username: "",
  biography: "",
  createdAt: "",
  updatedAt: "",
};
const StudentView = ({ studentid, isOpen, onClosed, userID }) => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [users, setUsers] = useState(initialState);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { ishover } = useSelector((strore) => strore.functions);

  //console.log(studentid);
  const customStyles = {
    content: {
      position: "relative",
      top: "10vh",
      left: "18%",
      overflowY: "auto",
      padding: "2.5rem",
      maxWidth: "80%",
      maxHeight: "80vh",
      backgroundColor: "#edf0ec",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };

  useEffect(() => {
    dispatch(HoverModal(false));
    const fetchCourse = async () => {
      try {
        const course = await axios.get(
          "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
          {
            withCredentials: true,
          }
        );

        const courses = course.data.course;
        setCourses(courses);
      } catch (error) {
        return { msg: error?.response.data };
      }

      //   console.log(cookie);
    };
    const fetchProfiles = async () => {
      try {
        const profiles = await axios.get(
          `http://localhost:8000/greendometech/ng/auth/users/${studentid}`,
          {
            withCredentials: true,
          }
        );

        const users = profiles.data.user;
        const {
          _id,
          email,
          country,
          mobilenumber,
          image,
          roles,
          certificate,
          classesId,
          firstname,
          lastname,
          username,
          biography,
          createdAt,
          updatedAt,
        } = users;
        const img = image === undefined || image === "" ? "" : image;
        //console.log(users);
        setUsers({
          id: _id,
          email,
          country,
          mobilenumber,
          image: img,
          roles,
          certificate,
          classesId,
          firstname,
          lastname,
          username,
          biography,
          createdAt,
          updatedAt,
        });
      } catch (error) {
        return { msg: error?.response };
      }

      //   console.log(cookie);
    };

    // setDeleteHover(false);
    fetchCourse();
    fetchProfiles();
  }, [studentid]);

  const {
    id,
    email,
    country,
    mobilenumber,
    certificate,
    roles,
    firstname,
    lastname,
    username,
    image,
    classesId,
    biography,
    createdAt,
    updatedAt,
  } = users;

  const authorCourses = courses?.filter((item) => item.createdBy === studentid);
  const assinged = classesId;
  // const singleAss = assinged.flat(1);
  const paidCourses = courses.filter((i) => assinged.includes(i._id));

  const contentDisplay = paidCourses?.map((item, id) => {
    const { image } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    return (
      <div key={id}>
        {imageType !== "" ? (
          <div className="imgCont inline-block items-stretch m-3 overflow-hidden max-w-md h-20 ">
            <Image width={100} height={100} src={image} alt="image" />
          </div>
        ) : (
          <div className="imgCont inline-block items-stretch m-3 overflow-hidden max-w-md">
            <Image width={100} height={100} src={Greendome} alt="image" />
          </div>
        )}
        <h2 key={id}>title: {item.name}</h2>
        <small>id: {item._id}</small>
      </div>
    );
  });

  const phoneNumber = `${country}-${mobilenumber}`;
  const Roles = functionsSpace(roles);
  const Certificate = functionsSpace(certificate);
  const created = moment(createdAt).format("YYYY-MM-DD HH:MM:SS");
  const updated = moment(updatedAt).format("YYYY-MM-DD HH:MM:SS");

  const headers = authorCourses.map((item, id) => {
    const {
      party_type,
      Serial_key,
      author,
      createdBy,
      fee,
      name,
      assigned_tutor,
    } = item;
    const parties = _.toString(functionsSpace(party_type));
    const stringifyTutors = _.toString(functionsSpace(assigned_tutor));
    const courseTutors = `${stringifyTutors} ${createdBy}`;

    return (
      <tbody key={id}>
        <tr key={id} className="">
          <td className="  border-width1px border-grey  text-center font-medium">
            {name}
          </td>
          <td className="  border-width1px border-grey text-center ">
            {Serial_key}
          </td>
          <td className="  border-width1px border-grey text-center ">
            {createdBy}
          </td>
          <td className="  border-width1px border-grey text-center ">
            {courseTutors}
          </td>
          <td className="  border-width1px border-grey text-center ">{fee}</td>
          <td className="  border-width1px border-grey text-center ">
            {parties}
          </td>
          <td className="  border-width1px border-grey text-center ">
            {author}
          </td>
        </tr>
      </tbody>
    );
  });

  const toggleMenu = () => {
    dispatch(HoverModal(true));
  };
  const imageType = image === undefined || image === "" ? "" : image;

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <EditProfile
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        studentid={studentid}
        setUser={setUsers}
      />

      <button onClick={() => onClosed()}>back</button>
      <section className=" flex justify-center items-center flex-col ">
        <div>{`questions set to ${username}`}</div>

        <div className="">
          <div>
            <div className=" flex item-center px-16 justify-between w-full bg-greenGraded flex-row ">
              <p className=" relative top-10 text-white">{id}</p>
              {imageType !== "" ? (
                <div className=" flex justify-center items-center m-3 overflow-hidden  max-w-maxc h-24 rounded-full">
                  <Image
                    className=" h-24"
                    width={100}
                    height={140}
                    src={image}
                    alt="image"
                  />
                </div>
              ) : (
                <div className="imgCont inline-block items-stretch m-3 overflow-hidden max-w-md h-14 rounded-full">
                  <Image width={100} height={100} src={Greendome} alt="image" />
                </div>
              )}
            </div>
            <div className=" flex justify-around items-center flex-row ">
              <div>
                <div className="  flex justify-start px-5 m-1 border-width1px border-grey items-center flex-row ">
                  <h3 className=" font-medium">Username: </h3>{" "}
                  <h2 className=" mx-7">{username}</h2>
                </div>
                <div className="  flex justify-start px-5 m-1 border-width1px  border-grey items-center flex-row">
                  <h3 className=" font-medium">Lastname: </h3>{" "}
                  <h2 className=" mx-7">{lastname}</h2>
                </div>
                <div className="  flex justify-start px-5 m-1 border-width1px  border-grey items-center flex-row ">
                  <h3 className=" font-medium">Mobile: </h3>{" "}
                  <h2 className=" mx-7">{`+${phoneNumber}`}</h2>
                </div>
                <div className="  flex justify-start px-5 p-5 m-1 border-width1px  border-grey items-center flex-col ">
                  <h3 className=" font-medium">Active membership: </h3>{" "}
                  <h2>{contentDisplay}</h2>
                </div>
                <div className="  flex justify-start px-5 m-1 border-width1px  border-grey items-center flex-row ">
                  <h3 className=" font-medium">Member since: </h3>{" "}
                  <h2 className=" mx-7">{created}</h2>
                </div>
              </div>

              <div>
                <div className="  flex justify-start p-5 m-1 border-width1px border-grey items-center flex-row ">
                  <h3 className=" font-medium">firstname: </h3>{" "}
                  <h2 className=" mx-7">{firstname}</h2>
                </div>

                <div className="  flex justify-start p-5 m-1 border-width1px border-grey items-center flex-row ">
                  <h3 className=" font-medium">email: </h3>{" "}
                  <h2 className=" mx-7">{email}</h2>
                </div>

                <div className="  flex justify-start p-5 m-1 border-width1px border-grey items-center flex-row ">
                  <h3 className=" font-medium">Role: </h3>{" "}
                  <h2 className=" mx-7">{Roles}</h2>
                </div>

                <div className="  flex justify-start p-5 m-1 border-width1px border-grey items-center flex-row ">
                  <h3 className=" font-medium">Biography: </h3>{" "}
                  <h2 className=" mx-7">{biography}</h2>
                </div>

                <div className="  flex justify-start p-5 m-1 border-width1px border-grey items-center flex-row ">
                  <h3 className=" font-medium">Last Updated: </h3>{" "}
                  <h2 className=" mx-7">{updated}</h2>
                </div>
                <div className="  flex justify-start p-5 m-1 border-width1px border-grey items-center flex-row ">
                  <h3 className=" font-medium">Certificate: </h3>{" "}
                  <h2 className=" mx-7">{Certificate}</h2>
                </div>
              </div>
            </div>
          </div>
          <button
            className=" border-width1px border-grey bg-greenGradedHov"
            onClick={() => toggleMenu()}
          >
            update user
          </button>
          {ishover && (
            <div>
              {/* <button onClick={() => setDeleteHover(true)}>delete</button> */}
              <button onClick={() => setModalOpen(true)}>update</button>
            </div>
          )}
        </div>
        <div className=" my-10">
          <table className=" max-w-thead p-responsive bg-purple border outline-zinc-400">
            <thead>
              <tr className="">
                <th className=" bg-greenGraded1 text-white w-80">name</th>
                <th className="  bg-greenGraded1 text-white w-80">
                  serial key
                </th>
                <th className="  bg-greenGraded1 text-white w-80">
                  no. of students
                </th>
                <th className="  bg-greenGraded1 text-white w-80">
                  instructors
                </th>
                <th className="  bg-greenGraded1 text-white w-80">fee</th>
                <th className="  bg-greenGraded1 text-white w-80">
                  party-tpye
                </th>
                <th className="  bg-greenGraded1 text-white w-80">author</th>
              </tr>
            </thead>
            {headers}
          </table>
        </div>
      </section>
    </Modal>
  );
};

export default StudentView;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
