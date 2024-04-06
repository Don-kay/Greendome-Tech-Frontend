"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateModule from "./createModule";
import { useSelector, useDispatch } from "react-redux";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import { HoverModal } from "../../../features/functions/functionSlice";
import _ from "lodash";
import Link from "next/link";

const ModuleDisp = ({ paramid }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [course, setCourse] = useState({ id: "", name: "" });
  const { ishover } = useSelector((strore) => strore.functions);

  const url = "/panel/admin_dashboard/create-module";

  const onModuleAdded = (moduleProp) => {
    setData([...data, moduleProp]);
    setCount(data.length + 1);
  };
  const paramID = course.id;
  const paramName = course.name;
  console.log(paramid);
  // console.log(paramID);
  // console.log(paramName);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8000/greendometech/ng/module/view-all-module",
          {
            withCredentials: true,
          }
        );

        const res = resp.data.modules;
        const moduler = res.filter((i) => i.classId === paramid);
        console.log(moduler);
        setData(module);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    const fetchCourse = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8000/greendometech/ng/course/admin/${paramid}`,
          {
            withCredentials: true,
          }
        );

        const res = resp.data.course;
        // const course = res.filter((i) => i._id === paramid);
        // console.log(res);
        setCourse({ id: res._id, name: res.name });
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    dispatch(HoverModal(false));
    fetchCourse();
    fetchModule();
  });

  const toggleMenu = ({ ...item }) => {
    // const param = { ...item };
    // console.log(param);
    // setId(param);
    dispatch(HoverModal(true));
  };
  return (
    <main>
      <div>All Modules belonging to {paramName}</div>
      <section>
        <button onClick={(e) => setModalOpen(true)}>create module</button>
        {/* <Link href={`${url}/${paramName}/${paramID}`}>
          <button>create module</button>
        </Link> */}
        <CreateModule
          onModuleAdded={(moduleProp) => onModuleAdded(moduleProp)}
          onClosed={() => setModalOpen(false)}
          isOpen={modalOpen}
          courseid={paramid}
          paramsName={paramName}
        />
        {data?.length === 0 ? (
          <div>
            <h1>no module created </h1>
          </div>
        ) : (
          <div>
            {data?.map((item, id) => {
              const { _id, title, code } = item;
              return (
                <section key={id}>
                  <div
                    key={id}
                    className=" flex justify-center cursor-pointer items-center flex-row"
                    onClick={() => toggleMenu({ _id, title })}
                  >
                    <h2>{title}</h2>
                    <h4>{item.code}</h4>
                  </div>

                  {ishover && (
                    <div>
                      <UpdateDropDown id={_id} />
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default ModuleDisp;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
