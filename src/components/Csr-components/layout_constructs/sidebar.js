"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import customFetch from "@/utilities/axios";
import { AiFillSetting } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import EditProfile from "../pagesComponent/editProfile";
import { GetAllUsers } from "@/features/profile/profileSlice";
import {
  toggleSubmenu,
  ToggleTrigger2,
} from "@/features/functions/functionSlice";
import { toggleSideBar } from "@/features/functions/functionSlice";
import { SidebarEl, studentSidebarEl } from "../../data/elements";
import Dennis from "../../asset/dennis.jpg";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = ({ IsAdmin, IsStudent }) => {
  const dispatch = useDispatch();
  const [showLinks, setShowLinks] = useState(false);
  const { isSubmenuOpen, isSideBarOpen, triggers, triggers2 } = useSelector(
    (state) => state.functions
  );
  // const { users } = useSelector((strore) => strore.profiles);
  const { user } = useSelector((strore) => strore.user);
  const [modalOpen, setModalOpen] = useState(false);

  // const image = users.image;

  const [photo, setPhoto] = useState();
  const [Params, setParams] = useState();
  // const [photo, setPhoto] = useState(image);

  useEffect(() => {
    const userProfiles = user.data.user;
    const Params = userProfiles.id;
    setParams(Params);
    const fetchUsers = async () => {
      try {
        const res = await customFetch.get("/auth/users", {
          withCredentials: true,
          credentials: "include",
        });
        const resp = { data: res.data, stats: res.status };
        // console.log(res);
        const users = resp.data.user;
        const profile = users.filter((i) => i.id === Params);
        const profilePhoto = _.toString(profile.map((i) => i.image));
        setPhoto(profilePhoto);
        if (profilePhoto !== "") {
          dispatch(ToggleTrigger2());
        }
      } catch (error) {
        return { msg: error?.response };
      }
    };

    fetchUsers();
  }, [triggers]);

  const isStudent = _.toString(IsStudent);
  const isAdmin = _.toString(IsAdmin);

  const linkContainerRef = useRef(null);
  const linksRef = useRef(null);
  const openSubmenu = (id) => {
    if (isSubmenuOpen === id) {
      dispatch(toggleSubmenu(null));
      // console.log(isSubmenuOpen);
      // console.log("i was clicked before, so i am closing");
    } else {
      dispatch(toggleSubmenu(id));
      // console.log("you clibked me");
    }
  };
  const openMenu = (id) => {
    if (isSubmenuOpen === id) {
      dispatch(toggleSideBar(null));
    } else {
      dispatch(toggleSideBar(true));
    }
  };

  useEffect(() => {
    const linkHeight = linksRef.current.getBoundingClientRect().height;
    linkContainerRef.current.style.height = `${linkHeight}`;
  }, [isSubmenuOpen]);

  // const [isSubmenuOpen, setisSubMenuOpen] = useState(0);

  // const toggleSubmenu = (id) => {
  //   if (isSubmenuOpen === id) {
  //     setisSubMenuOpen(null);
  //     console.log(isSubmenuOpen);
  //   } else {
  //     setisSubMenuOpen(id);
  //     console.log(isSubmenuOpen);
  //     console.log("i was clibked");
  //   }
  // };

  return (
    <main
      className={
        isStudent
          ? "sidebar  relative bg-bubblegum    h-screen flex justify-center items-center flex-col"
          : "sidebar  relative bg-green   h-screen flex justify-center items-center flex-col"
      }
    >
      <section
        className={
          isSideBarOpen
            ? " z-10  flex justify-center relative items-center flex-row  top-12 min-w-sidebarImg "
            : " z-10 flex justify-center relative items-center flex-row  top-10  w-96 "
        }
      >
        <div className="imgCont flex justify-center items-center m-3 overflow-hidden max-w-md1 h-any rounded-full">
          {photo !== "" || photo !== undefined ? (
            <Image
              className=" h-28"
              width={200}
              height={200}
              src={photo}
              alt="image"
            />
          ) : (
            <Image width={200} height={200} src={Dennis} alt="image" />
          )}
        </div>
      </section>
      <EditProfile
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        setPhoto={setPhoto}
      />
      <section className=" top-12 cursor-pointer overflow-scroll relative flex justify-center p-responsive items-center flex-col h-5/6 min-w-sidebarImg ">
        {isStudent
          ? studentSidebarEl.map((item, id) => {
              const { title, icon, pages, urls } = item;
              let param = `/${Params}`;
              let role = null;
              // if (id === 1) {
              //   param = `/${studentParams}`;
              // }
              if (id === 8) {
                role = `/${urls}`;
              }
              const titled = title === "Role Types";

              return (
                <section
                  key={id}
                  className={
                    isSideBarOpen
                      ? "sec relative -top-14 "
                      : "sec relative -top-16 left-28 "
                  }
                >
                  <div
                    key={id}
                    className={
                      isSideBarOpen
                        ? "elements m-4 flex flex-row items-center"
                        : "elements m-4 relative flex flex-row items-center"
                    }
                    onClick={() => openSubmenu(id)}
                  >
                    <div className=" mr-6" onClick={() => openMenu()}>
                      {icon}
                    </div>
                    {titled ? (
                      <Link key={id} href={`${urls}`}>
                        <h3
                          className={
                            isSideBarOpen
                              ? " text-pureWhite text-17 tracking-wider font-medium "
                              : " text-pureWhite text-17 opacity-0 tracking-wider font-medium "
                          }
                        >
                          {title}
                        </h3>
                      </Link>
                    ) : (
                      <h3
                        className={
                          isSideBarOpen
                            ? " text-pureWhite text-17 tracking-wider font-medium "
                            : " text-pureWhite text-17 opacity-0 tracking-wider font-medium "
                        }
                      >
                        {title}
                      </h3>
                    )}
                  </div>
                  <div
                    ref={linkContainerRef}
                    className={
                      isSubmenuOpen === id
                        ? "sub left-5 overflow-hidden top-0 relative flex  h-unimport justify-start  duration-700  w-64"
                        : "sub left-5 overflow-hidden top-0  relative flex justify-start transition-500 duration-700  flex-col  h-0 w-64"
                    }
                  >
                    <ul
                      ref={linksRef}
                      className={
                        isSubmenuOpen === id && isSideBarOpen
                          ? "sub overflow-hidden top-0 relative  inline-block  flex-col  transition-800 ease-linear duration-500 w-64"
                          : "sub overflow-hidden  -top-28 transition-500 duration-700 inline-block  flex-col h-0 w-64"
                      }
                    >
                      {pages?.map((item, idx) => {
                        const { title, id, urls } = item;
                        // let url = "";
                        // if (id === 0) {
                        //   url = "/thety";
                        // }
                        return (
                          <Link key={idx} href={`${urls}${param}`}>
                            <li className="subcont  m-5 ">
                              <h3 className=" text-pureWhite text-17 ">
                                {title}
                              </h3>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </section>
              );
            })
          : SidebarEl.map((item, id) => {
              const { title, icon, pages, urls } = item;
              let param = "";
              let role = null;
              if (id === 2) {
                param = `/${Params}`;
              }
              if (id === 8) {
                role = `/${urls}`;
              }
              const titled = title === "Role Types";

              return (
                <section
                  key={id}
                  className={
                    isSideBarOpen
                      ? "sec relative -top-14 "
                      : "sec relative -top-16 left-28 "
                  }
                >
                  <div
                    key={id}
                    className={
                      isSideBarOpen
                        ? "elements m-4 flex flex-row items-center"
                        : "elements m-4 relative flex flex-row items-center"
                    }
                    onClick={() => openSubmenu(id)}
                  >
                    <div className=" bg-white mr-6" onClick={() => openMenu()}>
                      {icon}
                    </div>
                    {titled ? (
                      <Link key={id} href={`${urls}`}>
                        <h3
                          className={
                            isSideBarOpen
                              ? " text-white text-17 tracking-wider font-medium "
                              : " text-white text-17 opacity-0 tracking-wider font-medium "
                          }
                        >
                          {title}
                        </h3>
                      </Link>
                    ) : (
                      <h3
                        className={
                          isSideBarOpen
                            ? " text-white text-17 tracking-wider font-medium "
                            : " text-white text-17 opacity-0 tracking-wider font-medium "
                        }
                      >
                        {title}
                      </h3>
                    )}
                  </div>
                  <div
                    ref={linkContainerRef}
                    className={
                      isSubmenuOpen === id
                        ? "sub left-5 overflow-hidden top-0 relative flex  h-unimport justify-start  duration-700  w-64"
                        : "sub bg-midnight left-5 overflow-hidden top-0  relative flex justify-start transition-500 duration-700  flex-col  h-0 w-64"
                    }
                  >
                    <ul
                      ref={linksRef}
                      className={
                        isSubmenuOpen === id && isSideBarOpen
                          ? "sub border-y-2 border-metal overflow-hidden top-0 relative  inline-block  flex-col  transition-800 ease-linear duration-500 w-48"
                          : "sub border-y-2  border-metal overflow-hidden  -top-28 transition-500 duration-700 inline-block  flex-col h-0 w-48"
                      }
                    >
                      {pages?.map((item, idx) => {
                        const { title, id, urls } = item;
                        // let url = "";
                        // if (id === 0) {
                        //   url = "/thety";
                        // }
                        return (
                          <Link key={idx} href={`${urls}${param}`}>
                            <li className="group  transition-800 duration-900 rounded-sm flex justify-start p-responsive4 m-1 ">
                              <h3 className=" text-white text-15 tracking-wider relative group-hover:left-1 group-hover:transition-800 group-hover:duration-1000 group-hover:text-whiteHov ">
                                {title}
                              </h3>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </section>
              );
            })}
        <div
          className={
            isSideBarOpen
              ? "elements -left-14  relative  top-8 flex flex-row items-center"
              : "elements left-14  relative top-8 flex flex-row items-center"
          }
        >
          <div className="mr-6">
            <BiCalendar />
          </div>
          <Link href={`/panel/calendar/${Params}`}>
            <h3
              className={
                isSideBarOpen
                  ? " text-white text-17 tracking-wider font-medium"
                  : " text-white text-17 opacity-0 tracking-wider font-medium"
              }
            >
              Calender
            </h3>
          </Link>
        </div>

        <div
          className={
            isSideBarOpen
              ? "elements my-1 -left-14  relative  top-14 flex flex-row items-center"
              : "elements my-1 left-14  relative  top-14 flex flex-row items-center"
          }
        >
          <div className="mr-6">
            <AiFillSetting />
          </div>
          <Link href={`/panel/settings/${Params}`}>
            <h3
              className={
                isSideBarOpen
                  ? " text-white text-17 tracking-wider font-medium"
                  : " text-white opacity-0 text-17 tracking-wider font-medium"
              }
            >
              Settings
            </h3>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Sidebar;

//  isSubmenuOpen === id
//    ? "sub bg-midnight left-3  -top-2  inline-block  justify-start transition-800 ease-linear duration-300 p-responsive  flex-col  h-64 w-64"
//    : "sub bg-midnight left-3 overflow-hidden -top-2  relative flex justify-start transition-500   flex-col  h-0 w-64";
