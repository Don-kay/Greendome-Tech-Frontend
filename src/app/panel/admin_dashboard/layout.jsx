"use client";
//import Sidebar from "@/components/Csr-components/layout_constructs/sidebar";
// import TopMenu from "@/components/Csr-components/layout_constructs/topMenu";
// import { toggleSideBar } from "@/features/functions/functionSlice";
// import { RxHamburgerMenu } from "react-icons/rx";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { useEffect } from "react";
import Green from "../../../components/asset/greendome.jpg";
import { DashboardProvider } from "../Provider";
import { TopBar } from "../../../components/Csr-components/layout_constructs/TopBar";
import { Overlay } from "../Overlay";
import { Sidebar } from "../../../components/Csr-components/layout_constructs/sidebar/Sidebar";
import Header1 from "../../../components/Csr-components/homepageComponents/header1";
import Banner from "../../../components/Csr-components/homepageComponents/banner";

const style = {
  container: "bg-gray-100 h-screen overflow-hidden relative",
  mainContainer:
    "flex flex-col h-screen pl-0 w-full lg:space-y-0 lg:w-[calc(100%-16rem)]",
  main: "h-screen overflow-auto pb-8 pt-8 px-2 md:pb-8 md:pt-4 md:px-8 lg:pt-0",
};

const DashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.profiles);
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    try {
      const loggedInUserId = user?.data.user.id;
      const User = users?.filter((i) => i.id === loggedInUserId);
      setLoggedInUser(User);
    } catch (error) {
      return error;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const IsAdmin = loggedInUser?.map((i) => {
    return i.roles.includes("Admin");
  });
  // console.log(IsAdmin);
  return (
    <DashboardProvider>
      <div className={style.container}>
        <div className="flex items-start">
          <Overlay />
          <Sidebar IsAdmin={IsAdmin} mobileOrientation="end" />
          <div className={style.mainContainer}>
            <Header1 />
            <TopBar />

            <Image
              style={{ top: "0vh" }}
              className={"opacity-10 -z-20 absolute h-full w-11/12"}
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
export default DashboardLayout;

// const AdminLayout = ({ children }) => {
//   const { isSideBarOpen, isSubmenuOpen } = useSelector(
//     (state) => state.functions
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (location.reload && isSideBarOpen !== false) {
//       dispatch(toggleSideBar());
//     }
//   }, []);

//   return (
//     <main className="">
//       <TopMenu />
//       <div className="flex justify-center item-center  ">
//         <section
//           className={
//             isSideBarOpen
//               ? " overflow-hidden inline-block items-stretch  transition-800 duration-700 min-w-mino bg-metal relative h-screen"
//               : " overflow-hidden inline-block items-stretch  transition-800 duration-500 min-w-minc bg-metal relative h-screen "
//           }
//           id=""
//         >
//           <Sidebar />
//         </section>
//         <section
//           className={
//             isSideBarOpen
//               ? "h-screen flex justify-around items-center flex-col bg-greenGradedHov z-0 overflow-y-scroll transition-800 duration-700 min-w-maxo"
//               : "h-screen flex justify-around items-center flex-col bg-greenGradedHov z-0 overflow-y-scroll transition-800 duration-700 min-w-maxc"
//           }
//         >
//           <Image
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
//           <div className=" absolute flex justify-center items-center flex-col p-responsive3 ">
//             {children}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default AdminLayout;
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
