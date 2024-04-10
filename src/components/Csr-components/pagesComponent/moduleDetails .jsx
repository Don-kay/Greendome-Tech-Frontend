"use client";

import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { CourseconfirmationModal } from "../minuteComponents/confirmationModal";
import CreateModule from "./createModule";
import EditCourse from "./editCourse";
import _ from "lodash";
import customFetch, { customFetchProduction } from "@/utilities/axios";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import { HoverModal } from "../../../features/functions/functionSlice";
import { resetModule } from "../../../features/course/module/moduleSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Greendome from "../../asset/greendome.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

const ModuleDetail = ({ module, setId }) => {
  const [trigger, setTrigger] = useState(false);
  const [question, setQuestion] = useState([]);
  const fetch =
    process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;
  // const url = "/panel/admin_dashboard/view-module";
  // const createurl = "/panel/admin_dashboard/create-module";
  //console.log(module);
  const Done = () => {
    setId("");
  };

  return (
    <main className=" max-h-72 relative">
      <section className=" flex justify-center items-center  cursor-pointer  flex-col">
        <div className=" flex justify-center  cursor-pointer ">
          <button onClick={() => Done()}>back to modules</button>
        </div>
        <div className=" flex relative justify-center items-center top-10 gap-y-10 flex-col">
          {module?.map((i, id) => {
            const {
              title,
              level,
              createdAt,
              updatedAt,
              code,
              description,
              content,
              image,
            } = i;
            return (
              <section key={id}>
                <div className=" flex justify-around items-center gap-x-12 flex-row">
                  {image && (
                    <Image width={100} height={100} src={image} alt="image" />
                  )}
                  <h1> {title}</h1>
                </div>
                <div className=" relative top-10  left-36 flex justify-around items-center gap-x-28 flex-row ">
                  <div className=" flex justify-center items-start gap-7 flex-col">
                    <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">code:</h3>
                      <h2 className=" text-17"> {code}</h2>
                    </div>
                    <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">level:</h3>
                      <h2 className=" text-17"> {level}</h2>
                    </div>
                  </div>
                  <div className=" flex justify-center items-start gap-7 flex-col">
                    <div className=" flex justify-start min-w-addCourse  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">description:</h3>
                      <h2 className=" max-w-addCourse text-17">
                        {description}
                      </h2>
                    </div>
                    <div className=" flex justify-start min-w-addCourse  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">This module was created:</h3>
                      <h2 className=" max-w-addCourse text-17"> {createdAt}</h2>
                    </div>
                    <div className=" flex justify-start min-w-addCourse  gap-x-5 cursor-pointer  flex-row">
                      <h3 className=" font-medium">
                        This module was last updated:
                      </h3>
                      <h2 className=" max-w-addCourse text-17"> {updatedAt}</h2>
                    </div>
                  </div>
                </div>

                <div className=" relative top-20 flex justify-center items-center flex-col">
                  <h2 className=" font-medium">{content}</h2>
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ModuleDetail;
