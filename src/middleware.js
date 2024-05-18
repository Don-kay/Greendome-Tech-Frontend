import { NextResponse, NextRequest } from "next/server";
import jwtDecode from "jwt-decode";
import {
  Company,
  Admin,
  AdminTutor,
  AdminStudent,
  AdminTutorStudent,
  TutorStudent,
  Tutor,
  Student,
} from "./components/ROLE_LISTS";
// import Localbase from "localbase";

import moment from "moment";
// import { jwtVerify } from "jose";

// let db = new Localbase("db");

const isProfileRoute = (pathname) => {
  return pathname.includes("/view_profile");
};
const isUserRoute = (pathname) => {
  return pathname.startsWith("/panel");
};
const isLoginRoute = (pathname) => {
  return pathname.startsWith("/dome");
};
const isNotLoginRoute = (pathname) => {
  return !pathname.startsWith("/dome");
};
const isStudenDashboard = (pathname) => {
  return pathname === "/panel/student_dashboard";
};
const PanelRoute = (pathname) => {
  return pathname.startsWith("/panel/admin_dashboard");
};

const areEqual = (arr1, arr2) => {
  let N = arr1?.length;
  let M = arr2?.length;

  // If lengths of array are not equal means
  // array are not equal
  if (N != M) {
    return false;
  }

  // Sort both arrays
  arr1?.sort();
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

let jwtoken = false;

const array = {};

export default function middleware(req, res) {
  const { cookies } = req;
  //console.log(req);
  // localStorage.getItem("user");
  // const userTok = getToken ? JSON.parse(getToken) : null;
  // console.log(userTok);
  // db.collection("cookie")
  //   .get()
  //   .then((document) => {
  //     console.log(document);
  //   });
  const jwt = cookies.get("myToken")?.value;
  const { pathname } = req.nextUrl;
  const { referer } = req.headers;
  let decodedToken = "";
  if (jwt !== undefined) {
    decodedToken = jwtDecode(jwt);
  }
  let currentDate = new Date();
  let isStudent = false;
  let isPanel = false;
  let isTutor = false;

  const env = process.env.NODE_ENV;

  if (
    (jwt === undefined && isNotLoginRoute(pathname)) ||
    (decodedToken.exp * 1000 < currentDate.getTime() &&
      isNotLoginRoute(pathname))
  ) {
    return NextResponse.redirect(
      env === "development"
        ? "http://localhost:3000/dome/login"
        : "https://greendometech.netlify.app/dome/login"
    );
  }

  const user = decodedToken.roles;
  // console.log(isPanel);
  if (areEqual(user, Company)) {
    isPanel = true;
  } else if (areEqual(user, Student)) {
    isStudent = true;
  } else if (areEqual(user, Admin)) {
    isPanel = true;
  } else if (areEqual(user, AdminTutor)) {
    isPanel = true;
  } else if (areEqual(user, AdminTutorStudent)) {
    isPanel = true;
  } else if (areEqual(user, AdminStudent)) {
    isPanel = true;
  } else if (areEqual(user, Tutor)) {
    isTutor = true;
  } else if (areEqual(user, TutorStudent)) {
    isTutor = true;
  }

  // console.log();

  if (
    decodedToken.exp * 1000 > currentDate.getTime() &&
    isLoginRoute(pathname) &&
    isPanel
  ) {
    return NextResponse.redirect(
      env === "development"
        ? "http://localhost:3000/panel/admin_dashboard"
        : "https://greendometech.netlify.app/panel/admin_dashboard"
    );
  }
  if (
    decodedToken.exp * 1000 > currentDate.getTime() &&
    isLoginRoute(pathname) &&
    isStudent
  ) {
    return NextResponse.redirect(
      env === "development"
        ? "http://localhost:3000/panel/student_dashboard"
        : "https://greendometech.netlify.app/panel/student_dashboard"
    );
  }

  // if (isUserRoute(pathname) && !isStudent) {
  //   return NextResponse.redirect("http://localhost:3000/dome/login", req.url);
  // }
  if (PanelRoute(pathname) && !isPanel) {
    return NextResponse.redirect(
      env === "development"
        ? "http://localhost:3000/panel/admin_dashboard"
        : "https://greendometech.netlify.app/panel/admin_dashboard"
    );
  }
  if (PanelRoute(pathname) && isTutor) {
    return NextResponse.redirect(
      env === "development"
        ? "http://localhost:3000/panel/tutor_dashboard"
        : "https://greendometech.netlify.app/panel/tutor_dashboard"
    );
  }
  if (isProfileRoute(pathname) && isPanel) {
    return console.log(jwt);
  }

  return NextResponse.next();
  // console.log(jwt);
  // if (url.includes("/greendometech")) {
  //   if (!jwt) {
  //     return NextResponse.redirect("http://localhost:3000/userauth/login");
  //   }
  // }

  // // throw new Error(error);

  // // const { origin } = req.nexturl;
  // return NextResponse.next();
}
export const config = {
  matcher: ["/dome/:path*", "/panel/:path*", "/panel/admin_dashboard/:path*"],
};
