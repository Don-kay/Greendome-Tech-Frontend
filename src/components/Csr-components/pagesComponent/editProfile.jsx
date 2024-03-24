"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

import { adminUpdateUsers } from "../../../features/profile/profileSlice";
import makeAnimated from "react-select/animated";
import _ from "lodash";
import Loading from "../layout_constructs/loading";
import { GetAllUsers } from "../../../features/profile/profileSlice";
import { useRouter } from "next/navigation";
import customFetch from "../../../utilities/axios";
import Image from "next/image";
import Modal from "react-modal";
import { ToggleTrigger } from "../../../features/functions/functionSlice";
import { setLoading } from "../../../features/user/userSlice";
import Greendome from "../../asset/greendome.jpg";
import functionsSpace from "../../../features/functions/functions";
import FormRow from "../../FormRow";
import TextARea from "../../TextArea";
import { setActiveParams } from "../../../features/profile/profileSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function EditProfile({
  params,
  studentid,
  IsCompany,
  isOpen,
  onClosed,
  setUser,
}) {
  // const router = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const { triggers2 } = useSelector((state) => state.functions);
  const { isLoading } = useSelector((strore) => strore.user);
  const {
    profileParams,
    users,
    updatedProfiles,
    updatedStatus,
    isUpdated,
    updated,
  } = useSelector((strore) => strore.profiles);
  //console.log(isLoading);
  // const [users, setUsers] = useState("");

  useEffect(() => {
    // try {
    //   const fetch = async () => {
    //     const profiles = await axios.get(
    //       "http://localhost:8000/greendometech/ng/auth/users",
    //       {
    //         withCredentials: true,
    //         credentials: "includes",
    //       }
    //     );
    //     const resp = { data: profiles.data, stats: profiles.status };
    //     setUsers(resp);
    //   };
    //   fetch();
    // } catch (error) {
    //   return { msg: error.response.data };
    // }

    dispatch(GetAllUsers());
  }, []);

  // const paramsId = params;
  // const user = users.data?.user;
  // const user = data?.user;
  const singlProfile = users?.filter((item) => item.id === studentid);
  // console.log(singlProfile);
  // const newArray = singlProfile.map((a) => ({ ...a }));
  const id = _.toString(singlProfile?.map((i) => i.id));
  const firstname = _.toString(singlProfile?.map((i) => i.firstname));
  const image = _.toString(singlProfile?.map((i) => i.image));
  const lastname = _.toString(singlProfile?.map((i) => i.lastname));
  const country = _.toString(singlProfile?.map((i) => i.country));
  const mobilenumber = _.toString(singlProfile?.map((i) => i.mobilenumber));
  const biography = _.toString(singlProfile?.map((i) => i.biography));
  const certificate = singlProfile?.map((i) => i.certificate);
  const roles = singlProfile?.map((i) => i.roles);
  const username = _.toString(singlProfile?.map((i) => i.username));

  const flattenCert = certificate?.flat(1);
  const flattenRoles = roles?.flat(1);
  // console.log(flattenRoles);
  const imgs = image === "undefined" || image === "" ? "" : image;

  const [roleCont, setRoleCont] = useState(flattenRoles?.sort());
  const [file, setFile] = useState(imgs);
  const [certCont, setCertCont] = useState();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(false);
  const [countryZip, setCountryZip] = useState([]);
  const roleOptions = [
    { value: "1", label: "student" },
    { value: "2", label: "tutor" },
    { value: "3", label: "company" },
    { value: "4", label: "Admin" },
  ];
  const certifiedOptions = [
    { value: "1", label: "none" },
    { value: "2", label: "AWS Developer" },
    { value: "3", label: "Software Engineer" },
    { value: "4", label: "Web Developer" },
    { value: "5", label: "Data Analyst" },
    { value: "6", label: "IT Engineer" },
  ];
  const countryOptions = [
    { value: "1", label: "234" },
    { value: "2", label: "141" },
    { value: "3", label: "199" },
    { value: "4", label: "444" },
    { value: "5", label: "205" },
    { value: "6", label: "363" },
  ];
  useEffect(() => {
    setRoleCont(flattenRoles?.sort());
    setCountryZip(country);
    setCertCont(flattenCert);

    onClosed();
  }, [triggers2]);

  const customStyles = {
    content: {
      position: "relative",
      top: "20vh",
      left: "17%",
      maxWidth: "80%",
      overflow: "auto",
      maxHeight: "100vh",
      backgroundColor: isLoading ? "#cbffcb" : "#edf0ec",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };

  const roleDisplay = functionsSpace(roles);
  const certDisplay = functionsSpace(certificate);
  const byt = "123";
  const [updatedUser, setUpdatedUser] = useState({
    firstname: firstname,
    lastname: lastname,
    country: country,
    mobilenumber: mobilenumber,
    biography: biography,
  });

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      // console.log(file[0]?.name);
    } else if (
      file[0]?.size > 1024 * 1024 &&
      file[0].type.startsWith("image/")
    ) {
      setImg(true);
    }
  };
  const setImageFiletoBase = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // console.log(reader.result);
        if (reader.result !== "") {
          setImg(false);
          setFile(reader.result);
        }
      };
    } catch (error) {
      return;
    }

    // setFile(file[0].name);
  };
  const zip = ` + ${updatedUser.country}`;
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  // console.log(certificate);
  // const handleOnFocus = (id) => {
  //   console.log("item in focus");
  //   console.log(id);
  //   setIsEditing(true);
  // };
  // const handleOnBlur = () => {
  //   console.log("item out of focus");
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };
  const handleSelected = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    setRoleCont(label.sort());
  };
  const handleSelectedCert = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    setCertCont(label);
  };
  const handleSelectedCountry = (selectedOptions) => {
    const label = selectedOptions.label;
    setCountryZip(_.toString(label));
  };

  useEffect(() => {
    dispatch(setActiveParams(studentid));
  }, []);
  // console.log(typeof roles);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      certificate,
      country,
      mobilenumber,
      biography,
    } = updatedUser;

    if (
      !firstname ||
      !lastname ||
      !certificate ||
      !country ||
      !mobilenumber ||
      !biography ||
      !file
    ) {
      toast.error("please fill all details");
    }

    setLoading(true);

    // console.log(`items in container ${roleCont} ${profileParams} ${id}`);
    // console.log(roleDisplay);
    const imageType = file === undefined || file === "" ? "" : file;
    if (IsCompany) {
      const res = await axios.put(
        `http://localhost:8000/greendometech/ng/auth/users/update/${id}`,
        {
          firstname: firstname,
          lastname: lastname,
          biography: biography,
          certificate: certCont,
          mobilenumber: mobilenumber,
          country: _.toString(countryZip),
          roles: roleCont,
          image: imageType,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      const user = res.data.user;
      // console.log(res);

      if (user.id !== "" || user.id !== undefined) {
        setUser({
          id: user.id,
          email: user.email,
          country: user.country,
          mobilenumber: user.mobilenumber,
          image: user.image,
          roles: user.roles,
          certificate: user.certificate,
          classesId: user.classesId,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          biography: user.biography,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
        // setTrigg();
        dispatch(GetAllUsers());
        dispatch(ToggleTrigger());
        setLoading(false);
        if (res.status === 200) {
          onClosed();
        } else {
          null;
        }
        //setPhoto(user.image);
        // window.location.reload();
      } else {
        setLoading(true);
      }
    } else {
      const res = await axios.patch(
        `http://localhost:8000/greendometech/ng/auth/users/update/${id}`,
        {
          firstname: firstname,
          lastname: lastname,
          biography: biography,
          certificate: certCont,
          mobilenumber: mobilenumber,
          country: _.toString(countryZip),
          roles: roleCont,
          image: imageType,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      const user = res.data.user;
      //console.log(res);

      if (user.id !== "" || user.id !== undefined) {
        setUser({
          id: user.id,
          email: user.email,
          country: user.country,
          mobilenumber: user.mobilenumber,
          image: user.image,
          roles: user.roles,
          certificate: user.certificate,
          classesId: user.classesId,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          biography: user.biography,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
        // setTrigg();
        // updatePhoto(user.image);
        dispatch(GetAllUsers());
        dispatch(ToggleTrigger());
        setLoading(false);

        if (res.status === 200) {
          onClosed();
        } else {
          null;
        }
        //setPhoto(user.image);
        // window.location.reload();
      } else {
        setLoading(true);
      }
    }

    // dispatch(
    //   adminUpdateUsers({
    //     params: profileParams,
    //     firstname: firstname,
    //     lastname: lastname,
    //     certificate: certCont,
    //     mobilenumber: mobilenumber,
    //     biography: biography,
    //     roles: roleCont,
    //     country: _.toString(countryZip),
    //   })
    // );
  };

  return (
    <>
      {loading && (
        <div className=" flex items-center w-screen h-full -top-10 left-20 z-20 absolute">
          <Loading />
        </div>
      )}
      <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
        <div>
          <button onClick={() => onClosed()}>back</button>
          <form onSubmit={handleSubmit}>
            <h1>Update {`${username}`} profile</h1>

            <div className=" flex item-center border-width1px border-grey my-16 px-52 justify-between w-full flex-row ">
              <div className=" relative top-7">
                <FormRow
                  type="file"
                  accept="image/*"
                  name="profile-image"
                  // value={url}
                  handleChange={handleImageFile}
                />
              </div>

              <div>
                {img && (
                  <small style={{ color: "red" }}>
                    image exceeds 1mb, choose another inage
                  </small>
                )}
                {file !== "" && (
                  <div className="imgCont flex justify-center items-stretch m-3 overflow-hidden max-w-md h-28 rounded-full">
                    <Image
                      className=" h-28"
                      width={200}
                      height={100}
                      src={file}
                      alt="image"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className=" flex justify-start gap-5 items-center flex-row ">
              <div className=" flex justify-start items-center flex-col gap-y-10 px-32 border-grey border-r-2">
                <FormRow
                  className={" w-64 h-auto p-3 mx-5"}
                  type="text"
                  name="firstname"
                  value={updatedUser.firstname}
                  handleChange={handleChange}
                  // handleOnFocus={() => handleOnFocus()}
                  // handleOnBlur={handleOnBlur}
                />

                <FormRow
                  className={" w-64 h-auto p-3"}
                  type="number"
                  name="mobilenumber"
                  value={updatedUser.mobilenumber}
                  handleChange={handleChange}
                />

                <div className=" flex justify-around items-center flex-row ">
                  <h5 className=" px-5 font-medium">country</h5>
                  <Select
                    className={" w-64 h-auto p-3n mx-5"}
                    components={makeAnimated()}
                    name="country"
                    options={countryOptions}
                    id="certificate"
                    onChange={handleSelectedCountry}
                    // isMulti={true}
                    isSearchable
                    noOptionsMessage={() => "certificate does not exist yet"}
                    placeholder={country}
                  />
                </div>
                <div className=" flex justify-around items-center flex-row ">
                  <h5 className=" px-5 font-medium">roles</h5>
                  <Select
                    className={" w-64 h-auto p-3 mx-5"}
                    components={makeAnimated()}
                    name="roles"
                    // value={roles}
                    options={roleOptions}
                    id="roles"
                    onChange={handleSelected}
                    isMulti={true}
                    isSearchable
                    noOptionsMessage={() => "role does not exist yet"}
                    placeholder={_.toString(roleDisplay)}
                  />
                </div>
              </div>
              <div className=" flex justify-start items-center flex-col gap-y-5">
                <FormRow
                  className={" w-64 h-auto p-3"}
                  type="text"
                  name="lastname"
                  value={updatedUser.lastname}
                  handleChange={handleChange}
                  // handleOnFocus={handleOnFocus}
                  // handleOnBlur={handleOnBlur}
                />
                <TextARea
                  className={" w-96 h-56 p-3 break-all break-words"}
                  type="text"
                  name="biography"
                  value={updatedUser.biography}
                  handleChange={handleChange}
                />
                <div className=" flex justify-around items-center flex-row ">
                  <h5 className=" px-5 font-medium">certificate</h5>
                  <Select
                    className={" w-64 h-auto p-3"}
                    components={makeAnimated()}
                    name="certificate"
                    options={certifiedOptions}
                    id="certificate"
                    onChange={handleSelectedCert}
                    isMulti={true}
                    isSearchable
                    noOptionsMessage={() => "certificate does not exist yet"}
                    placeholder={_.toString(certDisplay)}
                  />
                </div>
              </div>
            </div>

            <button className=" border-width1px border-grey bg-greenGradedHov">
              submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default EditProfile;
