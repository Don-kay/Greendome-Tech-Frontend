import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import functionsSpace from "../../../features/functions/functions";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import _ from "lodash";

async function fetchCourses() {
  const cookiesStore = cookies();
  const cookie = cookiesStore.get("myToken")?.value;

  try {
    const resp = await axios.get(
      "http://localhost:8000/greendometech/ng/classes/admin/view-all-classes",
      {
        headers: {
          Cookie: "myToken=" + cookie,
        },
      }
    );

    const Courses = resp.data;
    return Courses;
  } catch (error) {
    return { msg: error.response.data };
  }
}

const allCourses = async () => {
  const Courses = await fetchCourses();

  const courseProp = { data: Courses.classes, count: Courses.count };
  const { data, count } = courseProp;
  function selectProps(...props) {
    return function Object(prop) {
      const newObject = {};
      props.forEach((item) => {
        newObject[item] = prop[item];
      });
      return newObject;
    };
  }
  const visibleData = data.map(
    selectProps(
      "content4",
      "content5",
      "content6",
      "content7",
      "content8",
      "content9",
      "content10"
    )
  );
  // console.log(visibleData);
  // const addedContent = visibleData.map((item, id) => {
  //   const cleanContent = Object.entries(item)
  //     .filter(([key, value]) => value !== undefined)
  //     .reduce((obj, [key, value]) => {
  //       obj[key] = value;
  //       return obj;
  //     }, {});

  //   return JSON.stringify(cleanContent);

  //   // const keys = Object.keys(item);
  //   // console.log(keys);

  //   // for (let key in keys) {
  //   //   if (keys[key] === undefined) {
  //   //     delete keys[key];
  //   //   }
  //   // }
  //   // keys.forEach((key, id) => {
  //   //   console.log(`${key}: ${item[key]}`);
  //   // });
  //   // if (item.content4 === undefined) {
  //   //   console.log("null");
  //   // }
  //   // console.log("approved");
  // });
  // console.log(addedContent);

  return (
    <main>
      <div>AllCourses</div>
      <section>
        <div>
          {data.map((item, id) => {
            const {
              content4,
              content5,
              content6,
              content7,
              content8,
              content9,
              content2,
            } = item;
            const cont = [
              content4,
              content5,
              content6,
              content7,
              content8,
              content9,
              content2,
            ];
            const newCont = Object.entries(cont)
              .filter(([key, value]) => value !== undefined)
              .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
              }, {});
            console.log(newCont);
            return (
              <div key={id}>
                <div
                  key={id}
                  className=" flex justify-center items-center flex-row"
                >
                  <h2>{item.name}</h2>
                  <h4>{item.Serial_key}</h4>
                  <h4>{item.author}</h4>
                  <h4>{item.fee}</h4>
                </div>
                <h3>Id: {item._id}</h3>
                <h3>Party_Type: {item.party_type}</h3>
                <h3>Description: {item.description}</h3>
                <h3>Content: {item.content}</h3>
                <h3>Content: {item.content1}</h3>
                <h3>Content: {item.content2}</h3>
                <h3>Content: {item.content3}</h3>
                <h3>Content: {item.content4}</h3>
                {cont}
                <h3>Content: {item.createdAt}</h3>
                <h3>Content: {item.updatedAt}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default allCourses;
