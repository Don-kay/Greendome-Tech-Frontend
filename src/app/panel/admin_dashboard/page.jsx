"use client";
import react, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/Csr-components/layout_constructs/loading";
import { setLoading } from "../../../features/user/userSlice";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import { getPercentage } from "../../../features/course/percentage/percentageSlice";
import Localbase from "localbase";

const Login = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.profiles);
  const loggedInUserId = user?.data.user.id;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);
  const username = loggedInUser?.map((i) => {
    return i.username;
  });
  let db = new Localbase("db");
  //console.log(users);
  useEffect(() => {
    // console.log(window);
    // db.collection("cookie")
    //   .get()
    //   .then((document) => {
    //     console.log(document);
    //   });
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
    dispatch(getPercentage());
    dispatch(GetAllUsers());
    if (loggedInUser !== "" || loggedInUser !== undefined) {
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {isLoading ? (
        <div className=" flex items-center  min-w-innerlay3 h-96 top-56 left-20 z-20 absolute ">
          <Loading />
        </div>
      ) : (
        <section className=" relative h-full flex justify-center items-center flex-col">
          <div className=" relative left-72  flex justify-center items-center flex-row gap-x-5 text-17 font-medium">
            <h2>welcome back</h2>
            <h2 className=" relative -top-1 text-2xl text-greenGraded1">
              {username}
            </h2>
          </div>
          <div className=" relative top-56 flex w-full justify-center items-center flex-col gap-y-8  ">
            <h1 className=" font-medium">GREENDOME TECHNOLOGIES</h1>
            <h1>Admin Dashboard</h1>
          </div>
        </section>
      )}
    </main>
  );
};

export default Login;
