"use client";

import { toggleSideBar } from "../../../features/functions/functionSlice";
import { useSelector, useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import Green from "../../../components/asset/greendome.jpg";
import { useEffect } from "react";
import Image from "next/image";
import { DashboardProvider } from "../Provider";
import { TopBar } from "../../../components/Csr-components/layout_constructs/TopBar";
import { Overlay } from "../Overlay";
import Header1 from "../../../components/Csr-components/homepageComponents/header1";
import Banner from "../../../components/Csr-components/homepageComponents/banner";
import { Sidebar } from "../../../components/Csr-components/layout_constructs/sidebar/Sidebar";

const style = {
  container: "bg-gray-100 h-screen overflow-hidden relative",
  mainContainer:
    "flex flex-col h-screen pl-0 w-full lg:space-y-0 lg:w-[calc(100%-16rem)]",

  main: "h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 md:px-8 lg:pt-0",
};

const StudentDashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.profiles);

  const loggedInUserId = user?.data.user.id;

  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

  const IsStudent = loggedInUser?.map((i) => {
    return i.roles.includes("student");
  });

  const IsAdmin = loggedInUser?.map((i) => {
    return i.roles.includes("Admin");
  });

  return (
    <DashboardProvider>
      <div className={style.container}>
        <div className="flex items-start">
          <Overlay />
          <Sidebar IsStudent={IsStudent} mobileOrientation="end" />
          <div className={style.mainContainer}>
            <div className="">
              <Header1 />
              <TopBar isAdmin={IsAdmin} />{" "}
            </div>
            <Image
              style={{ top: "0vh" }}
              className=" opacity-10 -z-20 absolute h-full w-11/12"
              width={200}
              height={200}
              src={Green}
              alt="image"
            />
            <main className={style.main}>{children}</main>
          </div>
        </div>
      </div>
      <Banner />
    </DashboardProvider>
  );
};
export default StudentDashboardLayout;

// const StudentLayout = ({ children }) => {
//   const { isSideBarOpen, isSubmenuOpen } = useSelector(
//     (state) => state.functions
//   );
//   const { user } = useSelector((state) => state.user);
//   const { users } = useSelector((state) => state.profiles);

//   const loggedInUserId = user?.data.user.id;

//   const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

//   const IsStudent = loggedInUser?.map((i) => {
//     return i.roles.includes("student");
//   });
//   const username = loggedInUser?.map((i) => {
//     return i.username;
//   });
//   const IsAdmin = loggedInUser?.map((i) => {
//     return i.roles.includes("Admin");
//   });

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (location.reload && isSideBarOpen !== false) {
//       dispatch(toggleSideBar());
//     }
//   }, []);

//   // const OpensideBar = () => {
//   //   if (isSideBarOpen === false) {
//   //     dispatch(toggleSideBar());
//   //   } else if (isSideBarOpen !== false) {
//   //     dispatch(toggleSideBar());
//   //   }
//   // };

//   return (
//     <main>
//       <TopBar isAdmin={IsAdmin} />
//       <div className="flex justify-center item-center  ">
//         <section
//           className={
//             isSideBarOpen
//               ? " overflow-hidden inline-block items-stretch  transition-800 duration-700 min-w-mino bg-pink relative h-screen"
//               : " overflow-hidden inline-block items-stretch  transition-800 duration-500 min-w-minc bg-pink relative h-screen "
//           }
//           id=""
//         >
//           <Sidebar isAdmin={IsAdmin} IsStudent={IsStudent} />
//         </section>
//         <section
//           className={
//             isSideBarOpen
//               ? "h-screen flex justify-around items-center flex-col bg-greenGradedHov z-0 overflow-y-scroll transition-800 duration-700 min-w-maxo"
//               : "h-screen flex justify-around items-center flex-col bg-greenGradedHov z-0 overflow-y-scroll transition-800 duration-700 min-w-maxc"
//           }
//         >
//           <Image
//             style={{ top: "6.4vh" }}
//             className={
//               isSideBarOpen
//                 ? " opacity-10 absolute h-full w-10/12"
//                 : "opacity-10 absolute h-full w-11/12"
//             }
//             width={200}
//             height={200}
//             src={Green}
//             alt="image"
//           />
//           {/* <div className=" relative flex w-10/12 justify-around items-center flex-row"> */}
//           {/* <RxHamburgerMenu
//             className="text-15 top-0 relative left-0 "
//             onClick={OpensideBar}
//           /> */}
//           <div className=" relative top-0 flex justify-center items-center flex-col p-responsive3 ">
//             {children}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default StudentLayout;
// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanentt: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }
