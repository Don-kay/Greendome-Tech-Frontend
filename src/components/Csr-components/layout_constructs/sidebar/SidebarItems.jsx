import Link from "next/link";
import { AiFillSetting } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { data } from "./data";
import { Collapse } from "./Collapse";

import { usePathname } from "next/navigation";

//this contains data and path
const style = {
  active:
    "font-normal mx-4 p-2 pl-3 border-l-2  border-x-greenui text-sm text-blue-600",
  inactive: "font-light mx-4 text-sm text-gray-900",
  link: "inline-flex items-center justify-start my-1 p-3 text-white tracking-wider group-hover:text-whiteHov",
};

export const SidebarItems = ({
  isStudent,
  isAdmin,
  studentViewData,
  params,
  viewData,
}) => {
  const pathname = usePathname();
  //console.log(pathname);
  return (
    <ul className="relative flex p gap-y-12 flex-col top-10 mt-6 md:pl-6">
      <li>
        {isStudent
          ? studentViewData.map(({ id, title, icon, pages, urls }) => {
              let param = "";
              let role = null;
              if (id === 3) {
                param = `/${params}`;
              }
              if (id === 8) {
                role = `/${urls}`;
              }
              const titled = title === "Role Types";
              return (
                <Collapse titled={titled} key={id}>
                  <div className="group transition-800 duration-1000 ">
                    <div className="flex relative group-hover:left-3  ">
                      <span>{icon}</span>
                      {titled ? (
                        <Link key={id} href={`${urls}/${param}`}>
                          <span className="pl-3 tracking-wider font-extrabold group-hover:text-whiteHov  text-white">
                            {title}
                          </span>
                        </Link>
                      ) : (
                        <span className="pl-3 tracking-wider group-hover:text-whiteHov  text-white">
                          {title}
                        </span>
                      )}
                    </div>
                  </div>

                  {pages?.map((item, idx) => {
                    const { title, id, urls } = item;
                    // let url = "";
                    // if (id === 0) {
                    //   url = "/thety";
                    // }

                    return (
                      <div className="pl-5" key={idx}>
                        <Link key={idx} href={`${urls}${param}`}>
                          <span className={style.link}>
                            <span
                              className={
                                urls === pathname
                                  ? style.active
                                  : style.inactive
                              }
                            >
                              {title}
                            </span>
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </Collapse>
              );
            })
          : viewData.map(({ id, title, icon, pages, urls }) => {
              let param = "";
              let role = null;
              if (id === 3) {
                param = `/${params}`;
              }
              if (id === 7) {
                role = `/${urls}`;
              }
              const titled = title === "Role Types";
              return (
                <Collapse titled={titled} key={id}>
                  <div className="group transition-800 duration-1000 ">
                    <div className=" flex relative group-hover:left-3 ">
                      <span>{icon}</span>
                      {titled ? (
                        <Link key={id} href={`${urls}`}>
                          <span className="pl-3 tracking-wider group-hover:text-whiteHov  text-white">
                            {title}
                          </span>
                        </Link>
                      ) : (
                        <span className="pl-3 tracking-wider group-hover:text-whiteHov  text-white">
                          {title}
                        </span>
                      )}
                    </div>
                  </div>
                  {pages?.map((item, idx) => {
                    const { title, id, urls } = item;
                    // let url = "";
                    // if (id === 0) {
                    //   url = "/thety";
                    // }

                    return (
                      <div
                        className="pl-5 group transition-800 duration-1000 "
                        key={idx}
                      >
                        <Link key={idx} href={`${urls}${param}`}>
                          <span className={style.link}>
                            <span
                              className={
                                urls === pathname
                                  ? style.active
                                  : style.inactive
                              }
                            >
                              {title}
                            </span>
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </Collapse>
              );
            })}
      </li>
      <li className="group transition-800 duration-1000 relative  left-5">
        <div className="flex relative group-hover:left-3  ">
          <span className=" text-white">
            <BiCalendar />
          </span>
          <Link
            href={
              isStudent
                ? `/panel/student_dashboard/calendar/${params}`
                : `/panel/admin_dashboard/calendarId/${params}`
            }
          >
            <span className="pl-3 tracking-wider group-hover:text-whiteHov  text-white">
              Calender
            </span>
          </Link>
        </div>
      </li>
      <li className=" group relative transition-800 duration-1000  left-5">
        <div className="flex relative group-hover:left-3 ">
          <span className=" text-white">
            <AiFillSetting />
          </span>
          <Link href={`/panel/settings/${params}`}>
            <span className="pl-3 tracking-wider group-hover:text-whiteHov  text-white">
              settings
            </span>
          </Link>
        </div>
      </li>
    </ul>
  );
};
