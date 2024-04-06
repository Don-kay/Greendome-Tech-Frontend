import { useDashboardContext } from "../../../app/panel/Provider";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFillEnvelopeFill } from "react-icons/bs";
import Image from "next/image";
import Dennis from "../../asset/dennis.jpg";
import Link from "next/link";

export const TopBar = ({ isAdmin, IsStudent }) => {
  const { openSidebar } = useDashboardContext();

  //console.log(isAdmin);
  const isStudent = _.toString(IsStudent);
  const IsAdmin = _.toString(isAdmin);
  return (
    <header className="relative z-10 h-16 items-center bg-white shadow md:h-20">
      <div className="relative z-10 mx-auto flex h-full flex-col justify-center px-3">
        <div className="relative flex w-full justify-around items-center pl-1 sm:ml-0 sm:pr-2">
          <div className="relative block">
            <Image
              className="h-10  w-10 rounded-full object-cover"
              width={70}
              height={70}
              src={Dennis}
              alt="image"
            />
          </div>

          <div className="relative ml-5 mr-0 flex w-full items-center justify-end p-1 sm:right-auto sm:mr-0">
            <a href="#" className="block pr-5">
              <BsFillEnvelopeFill className=" text-greenGraded1 text-15  " />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg> */}
            </a>{" "}
            <div className="group relative flex h-full w-12 items-center">
              <RxHamburgerMenu className=" text-greenGraded1 text-15  " />
            </div>
            <div>
              {IsAdmin === "true" && (
                <Link href={"/panel/admin_dashboard"}>
                  <button className="block pr-5 relative top-0 ">
                    back to admin Dashboard
                  </button>
                </Link>
              )}
            </div>
            <a href="#" className="relative block pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
