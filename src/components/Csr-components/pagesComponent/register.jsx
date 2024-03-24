"use client";
import React from "react";
import FormRow from "../../FormRow";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/user/userSlice";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Greendome from "../../asset/greendome.jpg";
import { useRouter } from "next/navigation";
import { Label, Input, Button } from "@roketid/windmill-react-ui";
import Link from "next/link";
import _ from "lodash";
import Image from "next/image";
import { FaGithubAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  mobilenumber: "",
  password: "",
  isMember: true,
  biography: "",
};
const Registerpage = () => {
  const router = useRouter();
  const [values, setValues] = useState(initialState);
  const [file, setFile] = useState();
  const [certCont, setCertCont] = useState();
  const [countryZip, setCountryZip] = useState([]);
  const [err, setError] = useState("");
  const [isTutor, setisTutor] = useState(false);
  const [img, setImg] = useState(false);
  const { userAuth, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const roles = isTutor ? "tutor" : "student";

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
  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      ///console.log(file[0]?.name);
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
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleSelectedCert = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    setCertCont(label);
  };
  const handleSelectedCountry = (selectedOptions) => {
    const label = selectedOptions.label;
    setCountryZip(_.toString(label));
    // console.log(_.toString(label));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      username,
      mobilenumber,
      password,
      biography,
    } = values;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !username ||
      !mobilenumber ||
      !password ||
      countryZip === undefined
    ) {
      toast.error("please fill out all details");
      return;
    }

    console.log(countryZip);

    const user1 = await axios
      .post(
        "http://localhost:8000/greendometech/ng/auth/register",
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          username: username,
          mobilenumber: mobilenumber,
          password: password,
          image: file,
          biography: biography,
          country: _.toString(countryZip),
          certificate: certCont,
          roles: roles,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err.response);
        setError(err.response);
      });
    dispatch(
      registerUser({
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        mobilenumber: mobilenumber,
        password: password,
        image: file,
        biography: biography,
        country: _.toString(countryZip),
        certificate: certCont,
        roles: roles,
      })
    );

    const token = user1?.data.token;
    const status = user1?.status;
    // console.log(token);
    // console.log(status);
    if (
      (token !== undefined && status === 201) ||
      (token !== "" && status === 201)
    ) {
      router.push("/dome/login");
    }

    // console.log(file);
    // console.log(_.toString(countryZip));
    // console.log(certCont);
    // console.log(roles);
  };
  return (
    <main className=" bg-whiteOpaque">
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden  bg-greenGraded1 rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="sticky h-32 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="object-cover w-full h-full"
                src={Greendome}
                alt="Office"
                layout="fill"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full h-thirtyFive overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10">
                <h1 className="mb-4 text-xl font-semibold text-white dark:text-gray-200">
                  Create account
                </h1>
                <section className="flex justify-around mb-9 items-center flex-row">
                  <button
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => setisTutor(false)}
                  >
                    Register as a Student
                  </button>
                  <button
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => setisTutor(true)}
                  >
                    Register as a Tutor
                  </button>
                </section>
                {err?.status === 404 || err?.status === 400 ? (
                  <h1> {err.data}</h1>
                ) : null}
                {isTutor ? (
                  <form
                    action=""
                    className=" flex gap-y-4 flex-col form w-full"
                    onSubmit={handleSubmit}
                  >
                    <h2 className=" text-white font-medium">
                      Register as a Tutor
                    </h2>
                    <Label>
                      <span className=" text-white">firstname</span>
                      <FormRow
                        type="text"
                        name="firstname"
                        value={values.firstname}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">lastname</span>
                      <FormRow
                        type="text"
                        name="lastname"
                        value={values.lastname}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">email</span>
                      <FormRow
                        type="email"
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">username</span>
                      <FormRow
                        type="text"
                        name="username"
                        value={values.username}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">mobilenumber</span>
                      <FormRow
                        type="text"
                        name="mobilenumber"
                        pattern="[1-9]{1}[0-9]{9}"
                        maxLength="10"
                        value={values.mobilenumber}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>

                    {/* password field */}
                    <Label>
                      <span className=" text-white">password</span>
                      <FormRow
                        type="password"
                        name="password"
                        value={values.password}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">biography</span>
                      <FormRow
                        type="text"
                        name="biography"
                        value={values.biography}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>

                    <div>
                      <h4 className=" text-white">
                        (*) only accept image that is below 1mb, up to 3 images
                      </h4>
                    </div>
                    <FormRow
                      type="file"
                      accept="image/*"
                      name="profile-image"
                      // value={values.password}
                      handleChange={handleImageFile}
                    />
                    <Label>
                      <span className=" text-white">area</span>
                      <Select
                        className=" w-96"
                        components={makeAnimated()}
                        name="country"
                        options={countryOptions}
                        id="country"
                        onChange={handleSelectedCountry}
                        // isMulti={true}
                        // isSearchable
                        // noOptionsMessage={() => "certificate does not exist yet"}
                        placeholder="code"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">certification</span>
                      <Select
                        className=" w-96"
                        components={makeAnimated()}
                        name="certificate"
                        options={certifiedOptions}
                        id="certificate"
                        onChange={handleSelectedCert}
                        isMulti={true}
                        // isSearchable
                        // noOptionsMessage={() => "certificate does not exist yet"}
                        placeholder="certificate"
                      />
                    </Label>
                    <div>
                      {file === "" || file === undefined ? (
                        <Image
                          width={200}
                          height={200}
                          src={Greendome}
                          alt="image"
                        />
                      ) : (
                        <Image
                          width={200}
                          height={200}
                          src={file}
                          alt="image"
                        />
                      )}
                    </div>
                    <Button type="submit" block className="mt-4  text-white">
                      Create account
                    </Button>
                  </form>
                ) : (
                  <form
                    action=""
                    className=" flex gap-y-4 flex-col form w-full"
                    onSubmit={handleSubmit}
                  >
                    <h2 className=" text-white font-medium">
                      Register as a student
                    </h2>
                    <Label>
                      <span className=" text-white">firstname</span>
                      <FormRow
                        type="text"
                        name="firstname"
                        value={values.firstname}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">lastname</span>
                      <FormRow
                        type="text"
                        name="lastname"
                        value={values.lastname}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">email</span>
                      <FormRow
                        type="email"
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">username</span>
                      <FormRow
                        type="text"
                        name="username"
                        value={values.username}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">mobilenumber</span>
                      <FormRow
                        type="text"
                        name="mobilenumber"
                        pattern="[1-9]{1}[0-9]{9}"
                        maxLength="10"
                        value={values.mobilenumber}
                        handleChange={handleChange}
                      />
                    </Label>

                    {/* password field */}
                    <Label>
                      <span className=" text-white">password</span>
                      <FormRow
                        type="password"
                        name="password"
                        value={values.password}
                        handleChange={handleChange}
                        className=" rounded-sm pl-3 p-1 w-60"
                      />
                    </Label>
                    <Label>
                      <span className=" text-white">biography</span>
                      <FormRow
                        type="text"
                        name="biography"
                        value={values.biography}
                        handleChange={handleChange}
                      />
                    </Label>

                    <div>
                      <h4 className=" text-white">
                        (*) only accept image that is below 1mb, up to 3 images
                      </h4>
                    </div>
                    <FormRow
                      type="file"
                      accept="image/*"
                      name="profile-image"
                      // value={values.password}
                      handleChange={handleImageFile}
                    />
                    <div>
                      {file === "" || file === undefined ? (
                        ""
                      ) : (
                        <Image
                          width={200}
                          height={200}
                          src={file}
                          alt="image"
                        />
                      )}
                    </div>
                    <Label>
                      <span className=" text-white">area</span>
                      <Select
                        components={makeAnimated()}
                        name="country"
                        options={countryOptions}
                        id="country"
                        onChange={handleSelectedCountry}
                        // isMulti={true}
                        // isSearchable
                        // noOptionsMessage={() => "certificate does not exist yet"}
                        placeholder="code"
                      />
                    </Label>
                    {/* <Label>
                      <span className=" text-white">certification</span>
                      <Select
                        components={makeAnimated()}
                        name="certificate"
                        options={certifiedOptions}
                        id="certificate"
                        onChange={handleSelectedCert}
                        isMulti={true}
                        // isSearchable
                        // noOptionsMessage={() => "certificate does not exist yet"}
                        placeholder="certificate"
                      />
                    </Label> */}

                    <Button type="submit" block className="mt-4  text-white">
                      Create account
                    </Button>
                  </form>
                )}

                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2 text-white">
                    I agree to the{" "}
                    <span className="underline">privacy policy</span>
                  </span>
                </Label>

                <hr className="my-8" />

                <Button className="mt-4 text-white" block layout="outline">
                  <FaGithubAlt
                    className="w-4 h-4  text-white mr-2"
                    aria-hidden="true"
                  />
                  Github
                </Button>
                <Button className="mt-4 text-white" block layout="outline">
                  <BsTwitterX
                    className="w-4  text-white h-4 mr-2"
                    aria-hidden="true"
                  />
                  Twitter
                </Button>

                <h3 className="mt-4">
                  <Link href="/dome/login">
                    <p className="text-sm font-medium  text-white dark:text-purple-400 hover:underline">
                      Already have an account? Login
                    </p>
                  </Link>
                </h3>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Registerpage;
