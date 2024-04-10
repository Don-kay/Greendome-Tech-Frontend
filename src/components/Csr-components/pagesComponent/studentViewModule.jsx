"use client";
import React from "react";
import axios from "axios";
import _ from "lodash";
import Greendome from "../../asset/greendome.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModuleDetail from "./moduleDetails ";
import customFetch, {
  customFetchProduction,
} from "../../../utilities/axios.js";
import { Fetch } from "../../../utilities/axios";

const StudentViewModules = ({ studentCourses, modules, paramsId, setId }) => {
  const [trigger, setTrigger] = useState(false);
  const [question, setQuestion] = useState([]);
  const [selectedModule, setSelectedModule] = useState();
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;
  const [id, setId1] = useState("");
  // const url = "/panel/admin_dashboard/view-module";
  // const createurl = "/panel/admin_dashboard/create-module";
  //console.log(modules);
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const question = await Fetch.get(
          `/module/assessment/admin/all-questions/${paramsId}`,
          {
            withCredentials: true,
          }
        );
        const questionData = question.data.question;

        // const course = res.filter((i) => i._id === paramid);
        // console.log(questionData);
        setQuestion(questionData);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const Done = () => {
    setId("");
  };
  const viewModule = (_id) => {
    setId1(_id);
    const moduler = modules?.filter((i) => i._id === _id);
    setSelectedModule(moduler);
  };

  return (
    <main className=" max-h-72 relative top-0">
      {id === "" ? null : (
        <div className=" flex justify-center items-center relative top-0">
          <ModuleDetail module={selectedModule} setId={setId1} />
        </div>
      )}

      {id !== "" ? null : (
        <section className=" flex justify-center items-center  cursor-pointer  flex-col">
          <div className=" flex justify-center  gap-x-10 cursor-pointer  flex-row">
            <h2> start your study</h2>
            <button onClick={() => Done()}>back to course</button>
          </div>
          <div className=" flex relative justify-center items-center top-0 gap-y-10 flex-col">
            {studentCourses?.map((i, id) => {
              const { name, author, Serial_key, description, image } = i;
              return (
                <div key={id}>
                  <div className=" flex justify-around items-center gap-x-12 flex-row">
                    {image && (
                      <Image width={100} height={100} src={image} alt="image" />
                    )}
                    <h1> {name}</h1>
                  </div>
                  <div className=" relative top-10  left-36 flex justify-around items-center gap-x-28 flex-row ">
                    <div className=" flex justify-center items-start gap-7 flex-col">
                      <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                        <h3 className=" font-medium">Serial Key:</h3>
                        <h2 className=" text-17"> {Serial_key}</h2>
                      </div>
                      <div className=" flex justify-start  gap-x-5 cursor-pointer  flex-row">
                        <h3 className=" font-medium">Author:</h3>
                        <h2 className=" text-17"> {author}</h2>
                      </div>
                      <div className=" flex justify-start min-w-addCourse  gap-x-5 cursor-pointer  flex-row">
                        <h3 className=" font-medium">description:</h3>
                        <h2 className=" max-w-addCourse text-17">
                          {" "}
                          {description}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" relative top-28">
            {modules?.length === 0 ? (
              <div className=" flex justify-center items-center flex-col gap-y-6">
                <h1>no module created</h1>
                <button onClick={() => Done()}>back to course</button>
              </div>
            ) : (
              <div className=" flex justify-center px-8 items-center flex-wrap gap-y-6 flex-row">
                {modules?.map((item, id) => {
                  const { _id, title, code, image } = item;
                  const imageType =
                    image === undefined || image === "" ? "" : image;
                  // console.log(image);
                  return (
                    <div
                      className=" flex justify-center cursor-pointer bg-greenGradedHov p-12 rounded-md mx-10 items-center flex-col hover:bg-whiteGraded"
                      key={id}
                      onClick={() => viewModule(_id)}
                    >
                      {imageType !== "" ? (
                        <div className=" flex justify-center items-center m-3 overflow-hidden w-11/12 h-72 rounded-md">
                          <Image
                            className=" w-gallery h-full"
                            width={100}
                            height={200}
                            src={image}
                            alt="image"
                          />
                        </div>
                      ) : (
                        <div className=" flex justify-center items-center m-3 overflow-hidden w-11/12 h-72 rounded-md">
                          <Image
                            className=" w-gallery h-full"
                            width={100}
                            height={200}
                            src={Greendome}
                            alt="image"
                          />
                        </div>
                      )}

                      <div className=" flex justify-center items-center flex-col">
                        <h2 className=" font-medium">{title}</h2>
                        <h4>{code}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default StudentViewModules;
