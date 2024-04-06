"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import functionsSpace from "../../../features/functions/functions";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import InfoCard2 from "../../Cards/InfoCard 2";
import PageTitle from "../../typography/PageTitle";
import Image from "next/image";
import Greendome from "../../asset/greendome.jpg";
import moment from "moment";

const SingleProfileView = ({ courses, users, id }) => {
  const dispatch = useDispatch();
  const { modalId } = useSelector((strore) => strore.functions);
  // const { users } = useSelector((strore) => strore.profiles);

  // useEffect(() => {
  //   //  const fetchUsers = async () => {
  //   //    try {
  //   //      const res = await customFetch.get(`/auth/users/${modalId}`, {
  //   //        withCredentials: true,
  //   //        credentials: "includes",
  //   //      });
  //   //      //console.log(res);
  //   //      const resp = { data: res.data.user, stats: res.status };
  //   //      setUsers(resp.data);
  //   //    } catch (error) {
  //   //      return { msg: error };
  //   //    }
  //   //  };
  //   //  fetchUsers();

  //   dispatch(ProfileModal({ bool: false }));
  // }, []);
  try {
    const singleProfile = users?.filter((i) => i.id === id);
    return (
      <section className="">
        {singleProfile?.map((item, idx) => {
          const {
            id,
            email,
            roles,
            image,
            country,
            mobilenumber,
            certificate,
            firstname,
            lastname,
            username,
            biography,
            classesId,
            createdAt,
            updatedAt,
          } = item;

          const paidCourses = courses?.filter((i) => classesId.includes(i._id));
          //console.log(paidCourses);
          const phoneNumber = `${country}-${mobilenumber}`;
          const Roles = functionsSpace(roles);
          const Certificate = functionsSpace(certificate);
          const created = moment(createdAt).format("YYYY-MM-DD HH:MM:SS");
          const updated = moment(updatedAt).format("YYYY-MM-DD HH:MM:SS");
          const imageType = image === undefined || image === "" ? "" : image;
          return (
            <div
              className="flex relative top-10 justify-center cursor-pointer overflow-x-hidden bg-greenGradedHov p-12 rounded-md mx-10 items-center flex-col hover:bg-whiteGraded"
              key={id}
            >
              <InfoCard2
                imageType={imageType}
                title={id}
                value1={username}
                value2={firstname}
                value3={lastname}
                value4={email}
                value5={`+${phoneNumber}`}
                value6={Roles}
                value7={biography}
                value8={created}
                value9={updated}
                value10={Certificate}
                sub1="username:"
                sub2="firstname:"
                sub3="lastname:"
                sub4="email:"
                sub5="mobile:"
                sub6="roles:"
                sub7="biography:"
                sub8="joined:"
                sub9="updated:"
                sub10="certificate:"
              />
              {paidCourses?.length === 0 ? (
                <div className=" flex justify-center items-center relative">
                  <PageTitle>no course</PageTitle>
                </div>
              ) : (
                <div className=" relative grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3 cursor-pointer">
                  {paidCourses?.map((item, id) => {
                    const { _id, name, Serial_key, author, fee, image } = item;
                    const imageType =
                      image === "" || image === undefined ? "" : image;

                    return (
                      <section key={id}>
                        <div
                          key={id}
                          className=" flex justify-center cursor-pointer bg-greenGradedHov px-8 w-11/12 rounded-md mx-10 items-center flex-col hover:bg-whiteGraded"
                          onClick={() => toggleMenu(_id)}
                        >
                          <div>
                            {imageType !== "" ? (
                              <div className=" flex justify-center items-center m-3 overflow-hidden w-11/12 h-72 rounded-md">
                                <Image
                                  className=" w-gallery h-full"
                                  width={100}
                                  height={100}
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
                          </div>

                          <div className=" flex justify-start  gap-y-3 cursor-pointer p-7  flex-col">
                            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                              <h3 className=" font-medium">name:</h3>
                              <h2 className=" text-17 text-greenGraded1 ">
                                {" "}
                                {name}
                              </h2>
                            </div>
                            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                              <h3 className=" font-medium">serial key:</h3>
                              <h4 className=" text-15 text-greenGraded1 ">
                                {Serial_key}
                              </h4>
                            </div>
                            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                              <h3 className=" font-medium">author:</h3>
                              <h4 className=" text-greenGraded1 "> {author}</h4>
                            </div>
                            <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                              <h3 className=" font-medium">fee:</h3>
                              <h4 className=" text-greenGraded1 "> {fee}</h4>
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </section>
    );
  } catch (error) {
    return (
      <div>
        <h1>no profile to display</h1>
      </div>
    );
  }
};

export default SingleProfileView;
