"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { setLoading } from "../../../../features/user/userSlice";
import customFetch from "../../../../utilities/axios";
import { AiFillSetting } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import EditProfile from "../../pagesComponent/editProfile";
import { GetAllUsers } from "../../../../features/profile/profileSlice";
import {
  toggleSubmenu,
  ToggleTrigger2,
} from "../../../../features/functions/functionSlice";
import { toggleSideBar } from "../../../../features/functions/functionSlice";
import { SidebarEl, studentSidebarEl } from "../../../data/elements";
import Dennis from "../../../asset/dennis.jpg";
import { useSelector, useDispatch } from "react-redux";
import css from "../../../../app/panel/style.module.css";
import { SidebarItems } from "./SidebarItems";
import { SidebarHeader } from "./SidebarHeader";
import { useDashboardContext } from "../../../../app/panel/Provider";

// interface SidebarProps {
//   mobileOrientation: "start" | "end";
// }

const style = {
  mobileOrientation: {
    start: "left-0 ",
    end: "right-0 lg:left-0",
  },
  close: "hidden",
  container: " relative top-14 pb-32 lg:pb-6",
  open: "absolute w-8/12 z-40 sm:w-5/12",
  default:
    "bg-green shadow h-screen overflow-y-auto top-0 lg:block lg:relative lg:w-64 lg:z-auto",
  default1:
    "bg-pink shadow h-screen overflow-y-auto top-0 lg:block lg:relative lg:w-64 lg:z-auto",
};

export const Sidebar = ({ mobileOrientation, IsAdmin, IsStudent }) => {
  const dispatch = useDispatch();
  const { isSubmenuOpen, isSideBarOpen, triggers, triggers2 } = useSelector(
    (state) => state.functions
  );
  const { user } = useSelector((strore) => strore.user);
  const { users } = useSelector((strore) => strore.profiles);
  const [modalOpen, setModalOpen] = useState(false);
  const [photo, setPhoto] = useState();
  const [trigger, setTrigger] = useState(false);
  const [Params, setParams] = useState();
  const { sidebarOpen } = useDashboardContext();

  //console.log(triggers);

  useEffect(() => {
    //console.log(user);
    setTrigger(true);
    //console.log(users);
    dispatch(GetAllUsers());
    const loggedInUserId = user?.data.user.id;
    try {
      const loggedInUser = users?.filter((i) => i.id === loggedInUserId);
      // const userProfiles = user.data.user;
      // const Params = userProfiles.id;
      const Params = loggedInUserId;
      const User = loggedInUser[0];
      if (users !== undefined) {
        setPhoto(User.image);
        setTrigger(false);
        setParams(Params);
      }
    } catch (error) {
      return error.msg;
    }

    //console.log(User.image);

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
        //console.log(users);
        if (triggers) {
          setPhoto(profilePhoto);
        }

        if (profilePhoto !== "") {
          dispatch(ToggleTrigger2());
          dispatch(setLoading(false));
          setTrigger(false);
          //console.log("triggered");
        }
      } catch (error) {
        return { msg: error?.response };
      }
    };

    // fetchUsers();
  }, [triggers]);

  const isStudent = _.toString(IsStudent);
  const isAdmin = _.toString(IsAdmin);
  return (
    <aside
      className={
        IsStudent
          ? `${style.default1} 
        ${style.mobileOrientation[mobileOrientation]} 
        ${sidebarOpen ? style.open : style.close} ${css.scrollbar}`
          : `${style.default} 
        ${style.mobileOrientation[mobileOrientation]} 
        ${sidebarOpen ? style.open : style.close} ${css.scrollbar}`
      }
    >
      <EditProfile onClosed={() => setModalOpen(false)} isOpen={modalOpen} />
      <div className={style.container}>
        <SidebarHeader trigger={trigger} profileImg={photo} />
        <SidebarItems
          studentViewData={studentSidebarEl}
          viewData={SidebarEl}
          isStudent={isStudent}
          isAdmin={isAdmin}
          params={Params}
        />
      </div>
    </aside>
  );
};
