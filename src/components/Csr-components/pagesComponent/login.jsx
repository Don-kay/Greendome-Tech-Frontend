"use client";
import React from "react";
import FormRow from "../../FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../layout_constructs/loading";
import { setLoading } from "../../../features/user/userSlice";
import { getPercentage } from "@/features/course/percentage/percentageSlice";
import { GetAllUsers } from "@/features/profile/profileSlice";
import customFetch, { customFetchProduction } from "../../../utilities/axios";
import { Fetch } from "../../../utilities/axios";
import {
  loginUserEmail,
  loginUsername,
  setRole,
} from "../../../features/user/userSlice";
import {
  Company,
  Admin,
  AdminTutor,
  AdminStudent,
  AdminTutorStudent,
  TutorStudent,
  Tutor,
  Student,
} from "../../ROLE_LISTS";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Label, Input, Button } from "@roketid/windmill-react-ui";
import { FaGithubAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Greendome from "../../asset/greendome.jpg";
import PageTitle from "../../typography/PageTitle";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  mobilenumber: "",
  password: "",
  isMember: true,
};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Loginpage = (session) => {
  const router = useRouter();
  const [values, setValues] = useState(initialState);
  const [data, setData] = useState({});
  const [err, setError] = useState("");
  const [displayerr, setdisplayError] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [isEmail, setisEmail] = useState(false);
  const dispatch = useDispatch();
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;
  const { user, isLoading, role } = useSelector((strore) => strore.user);
  // const token = user?.token;
  // const roles = userRole?.roles;
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  // const arr1 = [1, 2, 4, 6, 3, 10, 8]
  // const arr2 = [ 4, 6, 3, 10, ]

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
  useEffect(() => {
    // console.log(window);
    if (typeof window !== undefined) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
      };
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    const state = setTimeout(() => {
      setdisplayError(false);
      // setStatus(null);
    }, 3000);
    return () => clearTimeout(state);

    // if (userID === "") {
    //   setModalOpen1(false);
    // } else if (userID !== "") {

    // }
  }, [err]);
  // Driver Code
  // let arr1 = [3, 5, 2, 5, 2];
  // let arr2 = [2, 3, 5, 5, 2];

  // useEffect(() => {
  //   handleSubmit();
  // }, []);

  const handleSubmitUsername = async (e) => {
    e.preventDefault();
    const { password, username } = values;
    if (!password || !username) {
      toast.error("please fill out all details");
      setLoading(false);
    }
    setError("");
    setLoading(true);
    const user1 = await Fetch.post(
      "/auth/login/username",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    ).catch((err) => {
      setdisplayError(true);
      setError(err.response);
    });
    dispatch(getPercentage());
    dispatch(GetAllUsers());
    // setData(user1);

    //console.log(user1);
    const userRole = user1?.data.user?.roles;
    const stats = user1?.status;
    // if (stats !== 200) {
    //   dispatch(setLoading(true));
    // } else {
    //   dispatch(setLoading(false));
    // }
    const error = data.data;

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
    // console.log(isStudent);
    // console.log(isAdmin);
    // console.log(isCompany);
    // console.log(isTutor);
    // console.log(userRole);
    // console.log(error);
    if (
      (user1?.status === 200 && isAdmin) ||
      (user1?.status === 200 && isCompany)
    ) {
      router.push("/panel/admin_dashboard");
    }
    if (user1?.status === 200 && isStudent) {
      router.push("/panel/student_dashboard");
    }
    // router.reload;
    // dispatch(setRole(userRole));

    dispatch(
      loginUsername({
        username: username,
        password: password,
      })
    );
    // console.log(user);
  };
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("please fill out all details");
    }
    setError("");
    setLoading(true);
    const user1 = await Fetch.post(
      "/auth/login/email",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    ).catch((err) => {
      setdisplayError(true);
      setError(err.response);
    });
    dispatch(getPercentage());
    // setData(user1);

    //console.log(user1);
    const userRole = user1?.data.user?.roles;
    const error = data.data;

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

    if (
      (user1?.status === 200 && isAdmin) ||
      (user1?.status === 200 && isCompany)
    ) {
      router.push("/panel/admin_dashboard");
    }
    if (user1?.status === 200 && isStudent) {
      router.push("/panel/student_dashboard");
    }

    dispatch(
      loginUserEmail({
        email: email,
        password: password,
      })
    );
    // console.log(user);
  };
  // const getUser = async () => {
  //   // const user = await axios.get("/api/user");
  //   const user = await axios.get("/api/login");
  //   console.log(user);
  // };
  return (
    <main className="  bg-whiteOpaque">
      {isloading && (
        <div className=" w-full h-full z-20 absolute">
          <Loading />
        </div>
      )}

      <Link href={"/"}>
        <h3 className=" relative top-10 text-xl text-center ">Home</h3>
      </Link>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-greenGraded1 rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="relative h-32 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="  object-cover w-full h-full"
                src={Greendome}
                alt="Office"
                layout="fill"
              />
            </div>
            <main className="flex items-center flex-col justify-center p-6 sm:p-12 md:w-1/2">
              <section className="flex justify-around gap-x-10 mb-9 items-center flex-row">
                <button
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => setisEmail(true)}
                >
                  sign in with email
                </button>
                <button
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => setisEmail(false)}
                >
                  sign in with username
                </button>
              </section>
              <form
                action=""
                className=" flex gap-y-4 flex-col form w-full"
                onSubmit={isEmail ? handleSubmitEmail : handleSubmitUsername}
              >
                <h1 className="mb-4 text-xl font-semibold text-white dark:text-gray-200">
                  Login in to greendometech
                </h1>
                {(err?.status === 404 && displayerr) ||
                (err?.status === 404 && displayerr) ? (
                  <h3 className=" text-red">
                    {isEmail
                      ? ` sign in with your email, else ${err.data}`
                      : ` sign in with your username, else ${err.data}`}
                  </h3>
                ) : null}
                {isEmail ? (
                  <Label className=" flex flex-col ">
                    <span className=" text-white">Email</span>
                    <FormRow
                      type="email"
                      name="email"
                      value={values.email}
                      handleChange={handleChange}
                      className=" rounded-sm pl-3 p-1 w-60"
                    />
                    {/* <Input
                    className=" mt-4 pl-5 p-1"
                    type="email"
                    placeholder="john@doe.com"
                  /> */}
                  </Label>
                ) : (
                  <Label className=" flex flex-col ">
                    <span className=" text-white">username</span>
                    <FormRow
                      type="username"
                      name="username"
                      value={values.username}
                      handleChange={handleChange}
                      className=" rounded-sm pl-3 p-1 w-60"
                    />
                    {/* <Input
                    className=" mt-4 pl-5 p-1"
                    type="email"
                    placeholder="john@doe.com"
                  /> */}
                  </Label>
                )}

                <Label className=" flex flex-col">
                  <span className=" text-white">Password</span>
                  <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                    className=" rounded-sm pl-3 p-1 w-60"
                  />

                  {/* <Input
                    className="mt-4 pl-5 p-1"
                    type="password"
                    placeholder="***************"
                  /> */}
                </Label>

                <Button type="submit" className="mt-4  text-white" block>
                  Log in
                </Button>

                <hr className="my-8 text-white" />

                <Button className="mt-4 text-white" block layout="outline">
                  <FaGithubAlt className="w-4 h-4 mr-2" aria-hidden="true" />
                  Github
                </Button>
                <Button className="mt-4 text-white" block layout="outline">
                  <BsTwitterX className="w-4 h-4 mr-2" aria-hidden="true" />
                  Twitter
                </Button>

                <p className="mt-4 text-white">Forgot your password?</p>
                <p className="mt-1 text-white">
                  <Link href="/dome/register">Create account</Link>
                </p>
              </form>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
};
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
// export async function getServerSideProps(context) {
//   try {
//     const session = context.req.cookies.myToken;
//     if (session) {
//       return {
//         props: { session },
//       };
//     } else {
//       return {
//         props: {},
//       };
//     }
//   } catch (error) {
//     throw new Error("no session in use");
//   }
// }
export default Loginpage;
