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
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from "@roketid/windmill-react-ui";
import EditQuestion from "./editQuestion2";
import CreateQuestion from "./createQuestion";
import EditModule from "./editModule";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import Greendome from "../../asset/greendome.jpg";
import { HoverModal } from "../../../features/functions/functionSlice";
import PageTitle from "../../typography/PageTitle";
import InfoCard2 from "../../Cards/InfoCard 2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const StudentView1 = ({
  data,
  setData,
  paidCourses,
  singleUser,
  studentid,
  setSingleuser,
  isOpen,
  onClosed,
}) => {
  const dispatch = useDispatch();

  const [Course, setCourse] = useState([]);
  const [singleAss, setSingleAss] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const { ishover } = useSelector((strore) => strore.functions);
  const { user } = useSelector((strore) => strore.user);
  const { users } = useSelector((strore) => strore.profiles);
  const loggedInUserId = user.data.user.id;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

  const Admin = loggedInUser?.map((i) => {
    return i.roles.includes("Admin");
  });
  const Company = loggedInUser?.map((i) => {
    return i.roles.includes("company");
  });

  const IsAdmin = _.toString(Admin) === "true";
  const IsCompany = _.toString(Company) === "true";

  const [page, setPage] = useState(1);
  // pagination setup
  const resultsPerPage = 5;
  const totalResults = data?.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    dispatch(HoverModal(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

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
  } = singleUser;

  const contentDisplay = paidCourses?.map((item, id) => {
    const { image, name, _id } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    return (
      <div className=" my-3" key={id}>
        <InfoCard2
          imageType={imageType}
          title="courses"
          value1={name}
          value2={_id}
          sub1="Title:"
          sub2="Course-id:"
        />
      </div>
    );
  });

  const phoneNumber = `${country}-${mobilenumber}`;
  const Roles = functionsSpace(roles);
  const Certificate = functionsSpace(certificate);
  const created = moment(createdAt).format("YYYY-MM-DD HH:MM:SS");
  const updated = moment(updatedAt).format("YYYY-MM-DD HH:MM:SS");

  const headers = data.map((item, id) => {
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
      // <tbody key={id}>
      //   <tr key={id} className="">
      //     <td className="  border-width1px border-grey  text-center font-medium">
      //       {name}
      //     </td>
      //     <td className="  border-width1px border-grey text-center ">
      //       {Serial_key}
      //     </td>
      //     <td className="  border-width1px border-grey text-center ">
      //       {createdBy}
      //     </td>
      //     <td className="  border-width1px border-grey text-center ">
      //       {courseTutors}
      //     </td>
      //     <td className="  border-width1px border-grey text-center ">{fee}</td>
      //     <td className="  border-width1px border-grey text-center ">
      //       {parties}
      //     </td>
      //     <td className="  border-width1px border-grey text-center ">
      //       {author}
      //     </td>
      //   </tr>

      // </tbody>
      <TableBody className=" border-grey border-width1px " key={id}>
        <TableRow key={id}>
          <TableCell>
            {/* <Avatar
                          className="hidden mr-3 md:block"
                          src={user.avatar}
                          alt="User image"
                        /> */}
            <div>
              <p className="font-semibold">{name}</p>
            </div>
          </TableCell>
          <TableCell>
            <span className="text-sm"> {Serial_key}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm"> {createdBy}</span>
          </TableCell>
          <TableCell>
            <span>{assigned_tutor?.length + 1}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">${fee}</span>
          </TableCell>
          {IsAdmin || loggedInUserId === id ? (
            <TableCell>
              <span className="text-sm">{parties}</span>
            </TableCell>
          ) : null}

          <TableCell>
            <span className="text-sm">{author}</span>
          </TableCell>
        </TableRow>
      </TableBody>
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
        isCompany={IsCompany}
        setUser={setSingleuser}
      />

      <button onClick={() => onClosed()}>back</button>
      <section className=" flex justify-center items-center flex-col ">
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
            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <div>
                <div className="  flex justify-start px-5 m-1 bg-white  items-center flex-row ">
                  <h3 className=" font-medium">Username: </h3>{" "}
                  <h2 className=" mx-7 dark:text-gray-200">{username}</h2>
                </div>
                <div className="  flex justify-start p-5 m-1  bg-white items-center flex-row ">
                  <h3 className=" font-medium">firstname: </h3>{" "}
                  <h2 className=" mx-7">{firstname}</h2>
                </div>
                <div className="  flex justify-start px-5 m-1  bg-white  items-center flex-row">
                  <h3 className=" font-medium">Lastname: </h3>{" "}
                  <h2 className=" mx-7">{lastname}</h2>
                </div>
                <div className="  flex justify-start px-5 m-1  bg-white  items-center flex-row ">
                  <h3 className=" font-medium">Mobile: </h3>{" "}
                  <h2 className=" mx-7">{`+${phoneNumber}`}</h2>
                </div>
                <div className="  flex justify-start p-5 m-1  bg-white  items-center flex-row ">
                  <h3 className=" font-medium">email: </h3>{" "}
                  <h2 className=" mx-7">{email}</h2>
                </div>{" "}
                {IsAdmin || loggedInUserId === id ? (
                  <div className="  flex justify-start p-5 m-1  bg-white  items-center flex-row ">
                    <h3 className=" font-medium">Role: </h3>{" "}
                    <h2 className=" mx-7">{Roles}</h2>
                  </div>
                ) : null}
                <div className="  flex justify-start p-5 m-1  bg-white  items-center flex-row ">
                  <h3 className=" font-medium">Biography: </h3>{" "}
                  <h2 className=" mx-7">{biography}</h2>
                </div>
                <div className="  flex justify-start p-5 m-1  bg-white  items-center flex-row ">
                  <h3 className=" font-medium">Certificate: </h3>{" "}
                  <h2 className=" mx-7">{Certificate}</h2>
                </div>
                <div className="  flex justify-start px-5 m-1  bg-white  items-center flex-row ">
                  <h3 className=" font-medium">Member since: </h3>{" "}
                  <h2 className=" mx-7">{created}</h2>
                </div>
                <div className="  flex justify-start p-5 m-1  bg-white  items-center flex-row ">
                  <h3 className=" font-medium">Last Updated: </h3>{" "}
                  <h2 className=" mx-7">{updated}</h2>
                </div>
              </div>

              <div>
                <div className=" flex items-center flex-col h-card  bg-greenGradedHov rounded-md shadow-md shadow-gradedBack overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 ">
                  <PageTitle> Courses applied </PageTitle>
                  {paidCourses?.length === 0 ? (
                    <h2 className=" relative top-40 text-greenGraded1 text-2xl">
                      user dormant, yet to apply for a course
                    </h2>
                  ) : (
                    contentDisplay
                  )}
                  <h2>{}</h2>
                </div>
              </div>
            </div>
          </div>
          {IsCompany || loggedInUserId === id ? (
            <button
              className=" border-width1px border-grey bg-greenGradedHov"
              onClick={() => toggleMenu()}
            >
              update user
            </button>
          ) : null}

          {(ishover && IsCompany) || (ishover && loggedInUserId === id) ? (
            <div>
              {/* <button onClick={() => setDeleteHover(true)}>delete</button> */}
              <button onClick={() => setModalOpen(true)}>update</button>
            </div>
          ) : null}
        </div>
        <div className=" my-10">
          {/* <table className=" max-w-thead p-responsive bg-purple border outline-zinc-400">
            <thead>
              <tr className="">
                <th className=" bg-greenGraded1 text-white w-80"></th>
                <th className="  bg-greenGraded1 text-white w-80"></th>
                <th className="  bg-greenGraded1 text-white w-80"></th>
                <th className="  bg-greenGraded1 text-white w-80"></th>
                <th className="  bg-greenGraded1 text-white w-80">fee</th>
                <th className="  bg-greenGraded1 text-white w-80"></th>
                <th className="  bg-greenGraded1 text-white w-80"></th>
              </tr>
            </thead>
            {headers}
          </table> */}
          <TableContainer className=" bg-whiteGraded p-4">
            <Table className=" bg-whiteOpaque">
              <TableHeader>
                <tr>
                  <TableCell className=" text-lg font-medium text-greenGraded1">
                    name
                  </TableCell>
                  <TableCell className=" text-lg font-medium text-greenGraded1">
                    serial key
                  </TableCell>
                  <TableCell className=" text-lg font-medium text-greenGraded1">
                    no. of students
                  </TableCell>
                  <TableCell className=" text-lg font-medium text-greenGraded1">
                    instructors
                  </TableCell>
                  <TableCell className=" text-lg font-medium text-greenGraded1">
                    fee
                  </TableCell>
                  {IsAdmin || loggedInUserId === id ? (
                    <TableCell className=" text-lg font-medium text-greenGraded1">
                      party-tpye
                    </TableCell>
                  ) : null}

                  <TableCell className=" text-lg font-medium text-greenGraded1">
                    author
                  </TableCell>
                </tr>
              </TableHeader>
              {headers}
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
              />
            </TableFooter>
          </TableContainer>
        </div>
      </section>
    </Modal>
  );
};

export default StudentView1;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
