"use client";
import React from "react";
import Loading from "../layout_constructs/loading";
import { setLoading } from "../../../features/user/userSlice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Link from "next/link";
import Greendome from "../../asset/greendome.jpg";
import Image from "next/image";
import customFetch, {
  customFetchProduction,
} from "../../../utilities/axios.js";
import { Fetch } from "../../../utilities/axios";
import { useEffect, useState } from "react";

// async function fetchCourse() {
//   const cookiesStore = cookies();
//   const cookie = cookiesStore.get("myToken")?.value;

//   try {
//     const res = await customFetch.get(
//       "/course/admin/view-all-course",
//       {
//         headers: {
//           Cookie: "myToken=" + cookie,
//         },
//       },
//       { withCredentials: true }
//     );
//     const resp = { data: res.data, stats: res.status };
//     return resp.data;
//   } catch (error) {
//     return { msg: error?.response.data };
//   }
// }

const ViewCourses = () => {
  const dispatch = useDispatch();
  const [Courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoading1 } = useSelector((strore) => strore.user);
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;
  //console.log(Courses);
  const url = "/panel/admin_dashboard/view-module";

  useEffect(() => {
    setLoading(true);
    const fetchCourse = async () => {
      try {
        const course = await Fetch.get("/course/admin/view-all-course", {
          withCredentials: true,
        });

        const courses = course.data.course;
        //console.log(course);
        setCourses(courses);
        if (course?.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        return { msg: error?.response.data };
      }

      //   console.log(cookie);
    };
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div>All course</div>
      {loading && (
        <div className=" flex items-center  min-w-innerlay3 h-96 top-52 left-20 z-20 absolute ">
          <Loading />
        </div>
      )}
      <section>
        <div className=" flex justify-center px-8 items-center flex-wrap gap-x-14 gap-y-14 flex-row">
          {Courses?.map((item, id) => {
            const { _id, name, Serial_key, image } = item;
            const imageType = image === "" || image === undefined ? "" : image;
            return (
              <div
                className=" flex justify-center cursor-pointer bg-greenGradedHov px-4 rounded-md items-center hover:bg-whiteGraded"
                key={id}
              >
                <Link key={id} href={`${url}/${name}/${_id}`}>
                  {imageType !== "" ? (
                    <div
                      key={id}
                      className=" flex justify-center items-center m-3 overflow-hiddenw-11/12 h-72 rounded-md"
                    >
                      <Image
                        className=" w-gallery h-full"
                        width={100}
                        height={200}
                        src={image}
                        alt="image"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center m-3 overflow-hidden  w-24 h-auto rounded-full">
                      <Image
                        width={100}
                        height={100}
                        src={Greendome}
                        alt="image"
                      />
                    </div>
                  )}

                  <div className=" flex justify-start  gap-y-3 cursor-pointer p-7  flex-col">
                    <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">name:</h3>
                      <h2 className=" text-17"> {item.name}</h2>
                    </div>
                    <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">serial key:</h3>
                      <h4 className=" text-15"> {item.Serial_key}</h4>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ViewCourses;
