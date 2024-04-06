"use client";
import React, { useEffect } from "react";
import "../styles/globals.css";
import Hero from "../components/Csr-components/homepageComponents/hero";
import Features from "../components/Csr-components/homepageComponents/features";
import Newsletter from "../components/Csr-components/homepageComponents/newsletter";
import Zigzag from "../components/Csr-components/homepageComponents/zigzag";
import Testimonials from "../components/Csr-components/homepageComponents/testimonials";
import Header from "../components/Csr-components/homepageComponents/header";
import Banner from "../components/Csr-components/homepageComponents/banner";
import {
  Company,
  Admin,
  AdminTutor,
  AdminStudent,
  AdminTutorStudent,
  TutorStudent,
  Tutor,
  Student,
} from "../components/ROLE_LISTS";
import { useSelector, useDispatch } from "react-redux";

export default function Page() {
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((strore) => strore.profiles);
  const loggedInUserId = user?.data.user.id;

  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

  const role = loggedInUser?.map((i) => {
    return i.roles;
  });
  const userRole = role[0];
  // useEffect(() => {
  //   // console.log(window);
  //   if (typeof window !== undefined) {
  //     window.location.reload();
  //   } else {
  //     return;
  //   }
  // }, []);
  //console.log(userRole);
  // console.log(loggedInUser);

  //const IsCompany = _.toString(userRole) === "true";

  const areEqual = (arr1, arr2) => {
    let N = arr1?.length;
    let M = arr2?.length;
    //console.log(N);
    // If lengths of array are not equal means
    // array are not equal
    if (N != M) {
      return false;
    }

    // Sort both arrays
    // if (arr1?.length === 0 || arr1?.length === undefined) {
    //   return;
    // } else {
    //   arr1?.sort();

    // }
    arr2?.sort();
    // Linearly compare elements
    for (let i = 0; i < N; i++)
      if (arr1[i] != arr2[i]) {
        // console.log(arr1[i]);
        // console.log(arr2[i]);
        return false;
      } else {
        // If all elements were same.
        return true;
      }
  };
  let isCompany = false;
  let isAdmin = false;
  let isTutor = false;
  let isStudent = false;

  if (areEqual(userRole, Company)) {
    isCompany = true;
  } else if (areEqual(userRole, Student)) {
    isStudent = true;
  } else if (areEqual(userRole, Admin)) {
    isAdmin = true;
  } else if (areEqual(userRole, AdminTutor)) {
    isAdmin = true;
  } else if (areEqual(userRole, AdminTutorStudent)) {
    isAdmin = true;
  } else if (areEqual(userRole, AdminStudent)) {
    isAdmin = true;
  } else if (areEqual(userRole, Tutor)) {
    isTutor = true;
  } else if (areEqual(userRole, TutorStudent)) {
    isTutor = true;
  }

  // console.log(isCompany);
  // console.log(isTutor);
  return (
    <div className=" bg-green">
      <Header isCompany={isCompany} isAdmin={isAdmin} />
      <Hero />
      <Features />
      <Zigzag />
      <Testimonials />
      <Newsletter />
      <Banner />
    </div>
  );
}
