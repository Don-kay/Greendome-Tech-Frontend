"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import ConfirmationModal from "../minuteComponents/confirmationModal";
import functionsSpace from "../../../features/functions/functions";
import EditProfile from "./editProfile";
import ViewUsers from "./viewUsers";
import moment from "moment";
import _ from "lodash";
import Image from "next/image";
import EditQuestion from "./editQuestion2";
import CreateQuestion from "./createQuestion";
import EditModule from "./editModule";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import Greendome from "../../asset/greendome.jpg";
import { HoverModal } from "../../../features/functions/functionSlice";
import InfoCard2 from "../../Cards/InfoCard 2";
import Link from "next/link";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

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
const UserView = ({ userid }) => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [user, setUser] = useState(initialState);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [role, setRole] = useState();
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    editProfile: false,
    viewUsers: false,
  });
  const { ishover } = useSelector((strore) => strore.functions);
  const { users } = useSelector((state) => state.profiles);

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
          `http://localhost:8000/greendometech/ng/auth/users/${userid}`,
          {
            withCredentials: true,
          }
        );

        const users = profiles.data.user;
        const {
          id,
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
        setUser({
          id: id,
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
  }, []);

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
  } = user;

  const authorCourses = courses?.filter((item) => item.createdBy === userid);
  const assinged = classesId;
  // const singleAss = assinged.flat(1);
  const paidCourses = courses.filter((i) => assinged.includes(i._id));

  const contentDisplay = paidCourses?.map((item, idx) => {
    const { image, _id, name } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    return (
      <div className="" key={idx}>
        <InfoCard2
          imageType={imageType}
          value1={name}
          sub1="title:"
          value2={_id}
          sub2="id:"
        />
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
      _id,
    } = item;
    const parties = _.toString(functionsSpace(party_type));
    const stringifyTutors = _.toString(functionsSpace(assigned_tutor));
    const AssignedTutor = users?.filter((i) => assigned_tutor.includes(i.id));
    const AssignedStudent = users?.filter((i) => i.classesId.includes(_id));
    const AssignStudentDisplay = AssignedStudent?.map((item, idx) => {
      const { username, id, image } = item;
      const imageType = image === "" || image === undefined ? "" : image;
      return (
        <div key={idx}>
          <label title={username}>{username}</label>
          {imageType !== "" ? (
            <Image width={100} height={100} src={image} alt="image" />
          ) : (
            <Image width={100} height={100} src={Greendome} alt="image" />
          )}
        </div>
      );
    });
    const AssignTutorDisplay = AssignedTutor?.map((item, idx) => {
      const { username, id, image } = item;
      const imageType = image === "" || image === undefined ? "" : image;
      return (
        <div key={idx}>
          <label title={username}>{username}</label>
          {imageType !== "" ? (
            <Image width={100} height={100} src={image} alt="image" />
          ) : (
            <Image width={100} height={100} src={Greendome} alt="image" />
          )}
        </div>
      );
    });
    const toggleHover = (role) => {
      setSelectedGroup(AssignedTutor);
      setRole(role);
      setModalOpen({ viewUsers: true });
    };
    const toggleHover1 = (role) => {
      setSelectedGroup(AssignedStudent);
      setRole(role);
      setModalOpen({ viewUsers: true });
    };
    // console.log(AssignedTutor);
    // console.log(AssignedStudent);
    const courseTutors = `${stringifyTutors}`;

    return (
      <tbody key={id}>
        <tr key={id} className="">
          <td className=" py-5 border-width1px border-grey text-center">
            {name}
          </td>
          <td className=" py-5 border-width1px border-grey text-center ">
            {Serial_key}
          </td>
          <td
            onClick={() => toggleHover1({ role: "student" })}
            className=" hover:bg-greenGradedHov border-width1px border-grey text-center "
          >
            {AssignedStudent?.length}
          </td>
          <td
            onClick={() => toggleHover({ role: "tutor" })}
            className=" hover:bg-greenGradedHov border-width1px border-grey text-center "
          >
            {AssignedTutor?.length}
          </td>
          <td className=" border-width1px border-grey text-center ">${fee}</td>
          <td className=" border-width1px border-grey text-center ">
            {parties}
          </td>
          <td className=" border-width1px border-grey text-center ">
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
  const nullBool =
    selectedGroup?.length === 0 ? undefined : modalOpen.viewUsers;
  return (
    <main>
      <EditProfile
        onClosed={() => setModalOpen({ editProfile: false })}
        isOpen={modalOpen.editProfile}
        studentid={userid}
        setUser={setUser}
      />
      <ViewUsers
        onClosed={() => setModalOpen({ viewUsers: false })}
        isOpen={nullBool}
        assigned={selectedGroup}
        role={role}
      />

      <button onClick={() => onClosed()}>back</button>
      <div className="overflow-hidden flex flex-col gap-y-5 rounded-sm bg-whiteOpaque shadow-default dark:border-strokedark dark:bg-boxdark">
        <h2 className=" text-greenGraded1 text-2xl ">{`welcome  ${username}, please view your profile`}</h2>
        <div className="relative z-20 h-35 md:h-65">
          {imageType !== "" ? (
            <div>
              <Image
                src={image}
                alt="profile cover"
                className=" h-fortyFive w-full scale-95 rounded-tl-sm rounded-tr-sm object-cover object-center"
                width={770}
                height={660}
              />
            </div>
          ) : (
            <Image
              src={Greendome}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
            />
          )}
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative mx-auto h-30 w-full max-w-30 rounded-full bg-greenGradedHov p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative flex flex-row  justify-around item-center drop-shadow-2">
              <p className=" relative font-bold top-14 ">{id}</p>
              {imageType !== "" ? (
                <div>
                  <Image
                    src={image}
                    className=" h-36 scale-95rounded-tl-sm rounded-tr-sm object-cover object-center"
                    alt="profile cover"
                    width={160}
                    height={160}
                  />
                </div>
              ) : (
                <Image
                  src={Greendome}
                  alt="profile cover"
                  className=" rounded-tl-sm rounded-tr-sm object-cover object-center"
                  width={160}
                  height={160}
                />
              )}
            </div>
          </div>
          <div className=" flex flex-col gap-y-7 relative ">
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-2 rounded-md  py-2.5 shadow-1 dark:border-strokedark dark:">
              {/* <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"></div> */}
              <div className=" relative top-5 flex justify-around items-center p-14 gap-y-3 flex-col">
                <div className=" relative top-5 flex justify-center max-w-addCourse items-start gap-y-3 flex-col">
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">Username:</h4> {username}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">firstname:</h4> {firstname}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">lastname:</h4> {lastname}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">email:</h4> {email}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">Mobile:</h4> {`+${phoneNumber}`}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">role:</h4> {Roles}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">member since:</h4> {created}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">Last Updated:</h4> {updated}
                  </div>
                  <div className=" flex flex-row gap-x-2">
                    <h4 className=" font-bold">Certificate:</h4> {Certificate}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center relative top-44 gap-y-5 h-3/5 overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className=" font-bold">Active membership:</span>
                {contentDisplay}
              </div>
            </div>
            <div className="mx-auto max-w-addCourse relative ">
              <h4 className="font-semibold text-greenGraded1 dark:">
                About Me
              </h4>
              {/* <div className=" flex flex-row justify-start gap-x-2">
                <h4 className=" font-bold">biography:</h4> 
              </div> */}
              <p className="mt-4.5 ">{biography}</p>
            </div>
            <div className="mx-auto flex justify-center items-center mt-4.5 mb-5.5 max-w-94 rounded-md py-2.5 shadow-1 dark:border-strokedark dark:">
              <table className=" z-0 max-w-thead p-responsive bg-purple border outline-zinc-400">
                <thead>
                  <tr className="">
                    <th className="  bg-dark w-80">name</th>
                    <th className=" w-80">serial key</th>
                    <th className=" w-80">no. of students</th>
                    <th className=" w-80">instructors</th>
                    <th className=" w-80">fee</th>
                    <th className=" w-80">party-tpye</th>
                    <th className=" w-80">author</th>
                  </tr>
                </thead>
                {headers}
              </table>
            </div>
            <div className=" relative top-0">
              <p>Edit Profile</p>
              <button onClick={() => setModalOpen({ editProfile: true })}>
                <AiFillSetting />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserView;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
