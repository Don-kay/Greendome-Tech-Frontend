import { useSelector, useDispatch } from "react-redux";
import { MdDashboardCustomize, MdBookmarkAdd } from "react-icons/md";
import { FaBookReader, FaUsersCog, FaHouseUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoGraph } from "react-icons/go";
import { BsCalendar3 } from "react-icons/bs";

export const AdminParam = () => {
  const { user } = useSelector((strore) => strore.profiles);
  const params = user.id;
  return params;
};
const url = "/panel/admin_dashboard/admin";

// async function

export const SidebarEl = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboardCustomize />,
    pages: [
      {
        id: 1,
        title: "Panel Overview",
        urls: "/panel/admin_dashboard/overview",
      },
      {
        id: 2,
        title: "Students",
        urls: "/panel/admin_dashboard/all-students",
      },
      {
        id: 3,
        title: "Tutor",
        urls: "/panel/admin_dashboard/all-tutors",
      },
      {
        id: 4,
        title: "Finance",
        urls: "/panel/admin_dashboard/finance",
      },
      // {
      //   id: 5,
      //   title: "",
      //   urls: "/panel/admin_dashboard/all-students",
      // },
    ],
  },
  {
    id: 2,
    title: "Curriculum vital",
    icon: <FaBookReader />,
    pages: [
      {
        id: 1,
        title: "View all Courses",
        urls: "/panel/admin_dashboard/courses",
      },
      {
        id: 2,
        title: "View all Test",
        urls: "/panel/admin_dashboard/",
      },
      {
        id: 3,
        title: "Extension",
      },
      {
        id: 4,
        title: "Reports",
      },
    ],
  },
  {
    id: 3,
    title: "Admin Profile",
    icon: <CgProfile />,
    pages: [
      {
        id: 1,
        title: "Profile",
        urls: `${url}`,
      },
      {
        id: 2,
        title: "Calender",
        urls: "/panel/admin_dashboard/calendar",
      },
      {
        id: 3,
        title: "Mails",
      },
      {
        id: 4,
        title: "Meetings",
      },
    ],
  },
  {
    id: 4,
    title: "Course Profile",
    icon: <MdBookmarkAdd />,
    pages: [
      {
        id: 1,
        title: "Create Course",
        urls: "/panel/admin_dashboard/create-course",
      },
      // {
      //   id: 2,
      //   title: "Create Modules",
      //   urls: "/panel/admin_dashboard/create-module=",
      // },
      {
        id: 2,
        title: "Manage Course",
        urls: "/panel/admin_dashboard/view-module",
      },
    ],
  },
  {
    id: 5,
    title: "Role View",
    icon: <FaHouseUser />,
    pages: [
      {
        id: 1,
        title: "Student Dashboard",
        urls: "/panel/student_dashboard",
      },
      {
        id: 2,
        title: "Tutor Dashboard",
      },
    ],
  },
  {
    id: 6,
    title: "Demography",
    icon: <GoGraph />,
    pages: [
      {
        id: 1,
        title: "All Attendees",
        urls: "/panel/admin_dashboard/demography/all-attendees",
      },
      {
        id: 2,
        title: "Our Staffs",
        urls: "/panel/admin_dashboard/demography/all-staff",
      },
      {
        id: 3,
        title: "Total Students",
        urls: "/panel/admin_dashboard/demography/all-students",
      },
      {
        id: 4,
        title: "All Event",
        urls: "/panel/admin_dashboard/demography/all-event",
      },
      {
        id: 5,
        title: "Upcoming event",
      },
      {
        id: 6,
        title: "Toatal Expenses",
      },
      {
        id: 7,
        title: "Total Revenue",
      },
    ],
  },
  // {
  //   id: 7,
  //   title: "Settings",
  //   icon: <BsCalendar3 />,
  // },
  {
    id: 7,
    title: "Role Types",
    icon: <FaUsersCog />,
    urls: "/panel/admin_dashboard/roleview",
  },
];
export const studentSidebarEl = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboardCustomize />,
    pages: [
      {
        id: 1,
        title: "Panel Overview",
        urls: "/panel/student_dashboard/overview",
      },
      {
        id: 2,
        title: "Lecture",
        urls: "/panel/student_dashboard/lectures",
      },
      {
        id: 3,
        title: "Finance",
        // urls: "/panel/student_dashboard/all-students",
      },
    ],
  },
  {
    id: 2,
    title: "Curriculum vital",
    icon: <FaBookReader />,
    pages: [
      {
        id: 1,
        title: "View all Courses",
        urls: "/panel/student_dashboard/courses",
      },
      {
        id: 2,
        title: "Registered Courses",
        urls: "/panel/student_dashboard/courses/registered-courses",
      },
      {
        id: 3,
        title: "Reports",
        // urls: "/panel/student_dashboard/report",
      },
    ],
  },
  {
    id: 3,
    title: "Student Profile",
    icon: <CgProfile />,
    pages: [
      {
        id: 1,
        title: "Profile",
        urls: "/panel/student_dashboard/profile",
      },
      {
        id: 2,
        title: "Calender",
        urls: "/panel/student_dashboard/calendar",
      },
      {
        id: 3,
        title: "Mails",
      },
      {
        id: 4,
        title: "Meetings",
      },
    ],
  },
  {
    id: 4,
    title: "Demography",
    icon: <GoGraph />,
    pages: [
      {
        id: 1,
        title: "All Event",
        urls: "/panel/student_dashboard/demography/all-event",
      },
      {
        id: 2,
        title: "Our staff",
        urls: "/panel/student_dashboard/demography/staff",
      },
      {
        id: 2,
        title: "all students",
        urls: "/panel/student_dashboard/demography/all-students",
      },
      {
        id: 3,
        title: "Upcoming event",
      },
      {
        id: 4,
        title: "Total Expenses",
        urls: "/panel/student_dashboard/expenses",
      },
    ],
  },
];
