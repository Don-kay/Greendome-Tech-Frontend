"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import makeAnimated from "react-select/animated";
import StudentsSlice from "../minuteComponents/slicedRolecomp.jsx";
import functionsSpace from "../../../features/functions/functions.jsx";
import customFetch from "../../../utilities/axios.js";
import Select from "react-select";
import Image from "next/image";
import { useRouter } from "next/navigation.js";
import PageTitle from "../../typography/PageTitle";
import InfoCard2 from "../../Cards/InfoCard 2";
import TotalStudentPops, {
  TotalTutorsProps,
  TotalAdminProps,
} from "../minuteComponents/sudentPops.jsx";
import { adminUpdateUsers } from "../../../features/profile/profileSlice";
import _ from "lodash";
import Loading from "../layout_constructs/loading";
import { setLoading } from "../../../features/user/userSlice";

const RoleView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { users } = useSelector((strore) => strore.profiles);
  const [roleCont, setRoleCont] = useState();
  const [users, setUsers] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [user, setUser] = useState();
  const [loadmini, setLoadmini] = useState(false);
  const [isId, setisId] = useState(null);
  const { isLoading } = useSelector((strore) => strore.user);

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchUsers = async () => {
      try {
        const res = await customFetch.get("/auth/users", {
          withCredentials: true,
          credentials: "includes",
        });
        //console.log(res);
        const resp = { data: res.data.user, stats: res.status };
        setUsers(resp.data);
        dispatch(setLoading(false));
      } catch (error) {
        return { msg: error };
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  const roleOptions = [
    { value: "1", label: "student" },
    { value: "2", label: "tutor" },
    { value: "3", label: "company" },
    { value: "4", label: "Admin" },
  ];
  //console.log(users);
  const handleSelected = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    //console.log(label.sort());
    setRoleCont(label.sort());
  };

  const confirmId = (id) => {
    setisId(id);
  };

  const handleId = (id) => {
    setRowId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (rowId === isId) {
      try {
        const res = await customFetch.put(
          `/auth/users/update/${rowId}`,
          { roles: roleCont },

          {
            withCredentials: true,
            credentials: "includes",
          }
        );
        //console.log(res.data.user);
        if (res.status === 200) {
          setUser(res.data.user);
          //console.log(res.status);
          setTrigger(!trigger);
          setLoading(false);
        }
      } catch (error) {
        return { msg: error };
      }

      // dispatch(
      //   adminUpdateUsers({
      //     params: rowId,
      //     roles: roleCont,
      //   })
      // );

      // router.refresh("panel/admin_dashboard/roleview");
    } else {
      return;
    }
  };

  return (
    <section className="panel relative flex items-center gap-y-9 flex-col  top-10   h-screen bg-purple">
      <PageTitle>all users</PageTitle>
      <div className="grid grid-cols-3 gap-x-20 gap-y-14 relative top-0 border-b-width1px pb-16 border-grey">
        {isLoading && (
          <div className=" w-full h-full z-20 absolute">
            <Loading />
          </div>
        )}
        {users?.map((item, ids) => {
          const { firstname, lastname, username, roles, image } = item;
          const { id } = item;
          const Role = functionsSpace(roles);
          const imageType = image === undefined || image === "" ? "" : image;

          return (
            <section
              // className=" flex justify-center item-center flex-col"
              key={ids}
            >
              <InfoCard2
                imageType={imageType}
                value1={ids}
                value2={firstname}
                value3={lastname}
                value4={username}
                value5={id}
                value6={Role}
                sub1="no."
                sub2="firstname"
                sub3="lastname"
                sub4="username"
                sub5="id"
                sub6="role"
              />
              <form onSubmit={handleSubmit}>
                <PageTitle>Assign roles</PageTitle>
                <div onClick={() => confirmId(id)}>
                  <Select
                    key={ids}
                    components={makeAnimated()}
                    name="roles"
                    isClearable={true}
                    options={roleOptions}
                    className=" w-96"
                    id="roles"
                    onChange={handleSelected}
                    isMulti={true}
                    isSearchable
                    noOptionsMessage={() => "role does not exist yet"}
                    placeholder={_.toString(Role)}
                  />
                </div>

                <button onClick={() => handleId(id)}>submit</button>
              </form>
            </section>
          );
        })}
      </div>
      <StudentsSlice updateduser={user} trigger={trigger} />
      {/* <div className="relative">
        <div className="absolute">
          <TotalStudentPops />
        </div>
        <div className="absolute">
          <TotalAdminProps />
        </div>
        <div className="absolute">/
          <TotalTutorsProps />
        </div>
      </div> */}
    </section>
  );
};

export default RoleView;
