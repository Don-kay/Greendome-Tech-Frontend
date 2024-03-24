"use client";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";

const Login = () => {
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.profiles);
  const loggedInUserId = user?.data.user.id;

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

  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);
  const username = loggedInUser?.map((i) => {
    return i.username;
  });

  return (
    <main className=" relative flex justify-center items-center flex-col">
      <div className=" relative left-72  flex justify-center items-center flex-row gap-x-5 text-17 font-medium">
        <h2>welcome back</h2>
        <h2 className="relative -top-1 text-2xl text-greenGraded1">
          {username}
        </h2>
      </div>
      <div className="relative top-56 flex w-full justify-center items-center flex-col gap-y-8  ">
        <h1 className=" font-medium">GREENDOME TECHNOLOGIES</h1>
        <h1>Student Dashboard</h1>
      </div>
    </main>
  );
};

export default Login;
