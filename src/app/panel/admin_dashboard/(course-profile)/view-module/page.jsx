import React from "react";
import ViewCourses from "../../../../../components/Csr-components/pagesComponent/viewCourses";
// import axios from "axios";
// import { cookies } from "next/headers";
// import Image from "next/image";
// import Greendome from "../../../../../components/asset/greendome.jpg";
// import Link from "next/link";
// import _ from "lodash";

// async function fetchCourses() {
//   const cookiesStore = cookies();
//   const cookie = cookiesStore.get("myToken")?.value;

//   try {
//     const resp = await axios.get(
//       "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
//       {
//         headers: {
//           Cookie: "myToken=" + cookie,
//         },
//       },
//       { withCredentials: true }
//     );

//     const Courses = resp.data;
//     return Courses;
//   } catch (error) {
//     return { msg: error.response.data };
//   }
// }

const AllCourseDisp = () => {
  return (
    <div>
      <ViewCourses />
    </div>
  );
};

export default AllCourseDisp;
