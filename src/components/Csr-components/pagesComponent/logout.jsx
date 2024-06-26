"use client";
import React from "react";
import FormRow from "../../FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setRole } from "../../../features/user/userSlice";
import { ROlE_LIST, STUDENT_LIST } from "../../ROLE_LISTS";
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
import Loading from "../layout_constructs/loading";
import customFetch, { customFetchProduction } from "@/utilities/axios";
import { Fetch } from "../../../utilities/axios";
import cookieCutter from "cookie-cutter";
import { setLoading } from "../../../features/user/userSlice";

const Logout = () => {
  const router = useRouter();
  const [err, setError] = useState("");
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { users } = useSelector((strore) => strore.profiles);
  const { user, isLoading } = useSelector((strore) => strore.user);
  const loggedInUserId = user.data.user.id;
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;

  const abort = () => {
    router.back();
  };

  // const logOutgoogleAuth = () => {
  //   window.open(`${process.env.NEXT_APP_API_URL}/auth/logout/`, "_self");

  //   // console.log(user);
  // };
  const logout = async () => {
    setLoading(true);

    try {
      const user1 = await Fetch.post(`/auth/logout/${loggedInUserId}`, {
        withCredentials: true,
      });
      const status = user1?.status;
      const data = user1?.data.data.msg;
      const userToken = user1?.data.data?.token;

      //console.log(user1);

      cookieCutter.set("myToken", userToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        maxAge: 0,
        path: "/",
      });
      // console.log(status);
      // console.log(data);
      if (data === "succesfully logged out" && status === 200) {
        router.push("/dome/login");
        setLoading(false);
      } else {
        return;
      }
    } catch (error) {
      setError(err.response);
    }
  };
  // useEffect(() => {
  //   handleSubmit();
  // }, []);
  return (
    <main className=" bg-whiteOpaque">
      {isloading && (
        <div className=" flex items-center w-screen h-full -top-10 left-20 z-20 absolute">
          <Loading />
        </div>
      )}
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
            <main className="flex items-center justify-center  gap-y-4 flex-col w-full p-6 sm:p-12 md:w-1/2">
              <h1 className="mb-4 text-xl relative top-7 font-semibold text-white dark:text-gray-200">
                confirm logout
              </h1>

              <div className=" flex items-center">
                <Button
                  onClick={() => abort()}
                  type="submit"
                  className="mt-4  text-white"
                  block
                >
                  No
                </Button>
                <Button
                  onClick={() => logout()}
                  type="submit"
                  className="mt-4  text-white"
                  block
                >
                  Yes
                </Button>
              </div>
              {/* <Button
                onClick={logOutgoogleAuth}
                type="submit"
                className="mt-4  text-white"
                block
              >
                logout with google
              </Button> */}
              <hr className="my-8 text-white" />
            </main>
          </div>
        </div>
      </div>

      {err?.status === 404 || err?.status === 400 ? <h1> {err.data}</h1> : null}
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
export default Logout;
