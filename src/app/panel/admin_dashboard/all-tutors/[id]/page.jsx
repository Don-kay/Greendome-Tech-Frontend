import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Fetch } from "../../../../../utilities/axios";
import functionsSpace from "../../../../../features/functions/functions";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import _ from "lodash";
// import { useRouter } from "next/navigation";
// import { loadState } from "../../../../../utilities/localStorage2";

// const hut = loadState();

async function fetchCourse() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("myToken")?.value;
  // const fetch =
  //   process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;

  try {
    const course = await Fetch.get("/course/admin/view-all-course", {
      headers: {
        Cookie: "myToken=" + cookie,
      },
    });
    return { course: course.data };
  } catch (error) {
    return { msg: error.response.data };
  }

  //   console.log(cookie);
}
async function fetchProfiles() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("myToken")?.value;

  try {
    const profiles = await fetch.get("/auth/users", {
      headers: {
        Cookie: "myToken=" + cookie,
      },
    });
    return { profiles: profiles.data };
  } catch (error) {
    return { msg: error.response.data };
  }

  //   console.log(cookie);
}

const Editstudent = async (req) => {
  try {
    const SingleProf = await fetchProfiles();
    const SingleCourse = await fetchCourse();
    const params = req.params.id;
    const { user } = SingleProf.profiles;
    const { classes } = SingleCourse.course;
    const authorCourses = classes?.filter((item) => item.createdBy === params);
    const singleProfile = user?.filter((profile) => profile.id === params);
    const roles = singleProfile.map((i) => i.roles);
    const assinged = singleProfile.map((i) => i.classesId);
    const singleAss = assinged.flat(1);
    const paidCourses = classes.filter((i) => singleAss.includes(i._id));

    const contentDisplay = paidCourses?.map((item, id) => {
      return (
        <div key={id}>
          <h2 key={id}>title: {item.name}</h2>
          <small>id: {item._id}</small>
        </div>
      );
    });
    // console.log(singleProfile);
    const Roles = functionsSpace(roles);

    const headers = authorCourses.map((item, id) => {
      const {
        party_type,
        Serial_key,
        author,
        createdBy,
        fee,
        name,
        assigned_tutor,
      } = item;
      const parties = _.toString(functionsSpace(party_type));
      const stringifyTutors = _.toString(functionsSpace(assigned_tutor));
      const courseTutors = `${stringifyTutors} ${createdBy}`;

      return (
        <tbody key={id}>
          <tr key={id} className="">
            <td className=" text-center">{name}</td>
            <td className=" text-center ">{Serial_key}</td>
            <td className=" text-center ">{createdBy}</td>
            <td className=" text-center ">{courseTutors}</td>
            <td className=" text-center ">{fee}</td>
            <td className=" text-center ">{parties}</td>
            <td className=" text-center ">{author}</td>
          </tr>
        </tbody>
      );
    });
    // console.log(authorCourses);
    return (
      <section>
        {singleProfile?.map((item, idx) => {
          const {
            id,
            email,
            country,
            mobilenumber,
            certificate,
            firstname,
            lastname,
            username,
            biography,
            createdAt,
            updatedAt,
          } = item;
          const phoneNumber = `${country}-${mobilenumber}`;
          return (
            <div key={idx}>
              <p>{id}</p>
              <div>
                <h3>Username: </h3> <h2>{username}</h2>
              </div>
              <div>
                <h3>firstname: </h3> <h2>{firstname}</h2>
              </div>
              <div>
                <h3>Lastname: </h3> <h2>{lastname}</h2>
              </div>
              <div>
                <h3>email: </h3> <h2>{email}</h2>
              </div>
              <div>
                <h3>Mobile: </h3> <h2>{`+${phoneNumber}`}</h2>
              </div>
              <div>
                <h3>Role: </h3> <h2>{Roles}</h2>
              </div>
              <div>
                <h3>Active membership: </h3> <h2>{contentDisplay}</h2>
              </div>
              <div>
                <h3>Biography: </h3> <h2>{biography}</h2>
              </div>
              <div>
                <h3>Member since: </h3> <h2>{createdAt}</h2>
              </div>
              <div>
                <h3>Last Updated: </h3> <h2>{updatedAt}</h2>
              </div>
              <div>
                <h3>Certificate: </h3> <h2>{certificate}</h2>
              </div>
              <div>view single profile</div>
            </div>
          );
        })}
        <div>
          <div>
            <p>Edit</p>
            <Link href={`/panel/edit-profile/${params}`}>
              <AiFillSetting />
            </Link>
          </div>
          <div>
            <p>Delete</p>
            <AiFillDelete />
          </div>
        </div>
        <div>
          <table className=" max-w-thead p-responsive bg-purple border outline-zinc-400">
            <thead>
              <tr className="">
                <th className="  bg-dark w-80">name</th>
                <th className=" w-80">serial key</th>
                <th className=" w-80">no. of students</th>
                <th className=" w-80">instructors</th>
                <th className=" w-80">fee</th>
                <th className=" w-80">party-tpye</th>
                <th className=" w-80">author</th>
              </tr>
            </thead>
            {headers}
          </table>
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section>
        <h1> user details not available </h1>
        <p> refresh the page </p>
      </section>
    );
  }
};

export default Editstudent;
