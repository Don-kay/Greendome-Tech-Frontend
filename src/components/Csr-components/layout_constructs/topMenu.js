"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFillEnvelopeFill } from "react-icons/bs";
import Dennis from "../../asset/dennis.jpg";
import _ from "lodash";
import { toggleSideBar } from "../../../features/functions/functionSlice";
import { useSelector, useDispatch } from "react-redux";

const TopMenu = ({ isAdmin, IsStudent }) => {
  const dispatch = useDispatch();
  const { isSubmenuOpen, isSideBarOpen, triggers, triggers2 } = useSelector(
    (state) => state.functions
  );

  const isStudent = _.toString(IsStudent);

  const OpensideBar = () => {
    if (isSideBarOpen === false) {
      dispatch(toggleSideBar());
    } else if (isSideBarOpen !== false) {
      dispatch(toggleSideBar());
    }
  };

  return (
    <main
      className={
        isStudent
          ? "sidebar  relative bg-bubblegum h-screen flex justify-center items-center flex-col"
          : "sidebar  relative bg-whiteGraded p-containerpad flex justify-center  items-center flex-row w-percent90 max-w-pixel900 border-solid border-l-width1px border-black m-auto"
      }
    >
      <div className=" bg-slate-100 flex justify-between h-auto items-center flex-row w-percen90">
        <div>
          <Image width={70} height={70} src={Dennis} alt="image" />
        </div>
        <ul className="flex justify-center relative items-center flex-row list-none p-0 ">
          <li>toggle icon</li>
          <li>
            <BsFillEnvelopeFill className=" z-40 text-15  left-28 " />
          </li>
          <li>
            <RxHamburgerMenu
              className=" z-40 text-15  left-28 "
              onClick={OpensideBar}
            />
          </li>
          <li>
            <div>
              {isAdmin && (
                <Link href={"/panel/admin_dashboard"}>
                  <button className=" relative top-0 ">
                    back to admin Dashboard
                  </button>
                </Link>
              )}
            </div>
          </li>
        </ul>
      </div>
      {/* <section className="  bg-metal top-12 cursor-pointer overflow-scroll relative flex justify-center p-responsive items-center flex-col h-5/6 min-w-sidebarImg ">
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
                          ? "sub bg-tahiti overflow-hidden top-0 relative  inline-block  flex-col  transition-800 ease-linear duration-500 w-64"
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
                              <h3 className=" text-white text-17 ">{title}</h3>
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
                    <div className=" mr-6" onClick={() => openMenu()}>
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
                          ? "sub bg-tahiti overflow-hidden top-0 relative  inline-block  flex-col  transition-800 ease-linear duration-500 w-64"
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
                              <h3 className=" text-white text-17 ">{title}</h3>
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
          <div className="mr-6" onClick={() => openMenu()}>
            <BiCalendar />
          </div>
          <h3
            className={
              isSideBarOpen
                ? " text-white text-17 tracking-wider font-medium"
                : " text-white text-17 opacity-0 tracking-wider font-medium"
            }
          >
            Calender
          </h3>
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
          </div>{" "}
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
      </section> */}
    </main>
  );
};

export default TopMenu;

//  isSubmenuOpen === id
//    ? "sub bg-midnight left-3  -top-2  inline-block  justify-start transition-800 ease-linear duration-300 p-responsive  flex-col  h-64 w-64"
//    : "sub bg-midnight left-3 overflow-hidden -top-2  relative flex justify-start transition-500   flex-col  h-0 w-64";
