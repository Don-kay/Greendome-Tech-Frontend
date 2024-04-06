"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Input, HelperText, Label, Textarea } from "@roketid/windmill-react-ui";
import makeAnimated from "react-select/animated";
import Image from "next/image";
import Modal from "react-modal";
import _, { stubString } from "lodash";
import { GetAllUsers } from "../../../features/profile/profileSlice";

import Greendome from "../../asset/greendome.jpg";
import { useRouter } from "next/navigation";
import FormRow from "../../FormRow";
import TextARea from "../../TextArea";
import PageTitle from "../../typography/PageTitle";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function EditModule({
  setTrigger,
  isOpen,
  onClosed,
  module,
  setModule,
  courseId,
  moduleRetrieved,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { users } = useSelector((strore) => strore.profiles);

  // console.log(moduleParam);
  // console.log(moduleName);
  // console.log(courseName);
  const url = "/panel/admin_dashboard/view-module";
  const initialState = {
    title: "",
    content: "",
    description: "",
    featured: "",
    id: "",
    code: "",
    level: "",
    status: "",
    image: "",
  };

  const [course, setCourse] = useState();
  const [updatedModule, setUpdatedModule] = useState(initialState);
  const [statusCont, setStatusCont] = useState();
  const [FeatCont, setFeatCont] = useState();
  const [levelCont, setLevelCont] = useState();
  const [trigger1, setTrigger1] = useState(false);
  const [img, setImg] = useState(false);
  const [file, setFile] = useState();
  const [checked, setChecked] = useState(false);

  const statusOptions = [
    { value: "1", label: "visible" },
    { value: "2", label: "not visible" },
  ];

  const levelOptions = [
    { value: "1", label: "beginner" },
    { value: "2", label: "intermediate" },
    { value: "3", label: "advanced" },
  ];
  const featuredOptions = [
    { value: "1", label: "true" },
    { value: "2", label: "false" },
  ];
  //console.log(updatedModule);

  useEffect(() => {
    const image = module?.image;
    //console.log(module?.featured);
    const img = image === undefined || image === "" ? "" : image;

    setUpdatedModule({
      title: module?.title,
      content: module?.content,
      description: module?.description,
      id: module?.id,
      featured: module?.featured,
      status: module?.status,
      code: module?.code,
      level: module?.level,
      status: module?.status,
    });
    setFile(img);
    // dispatch(GetAllUsers());
    try {
      const fetch = async () => {
        // const modresp = await axios.get(
        //   `http://localhost:8000/greendometech/ng/module/view-module/${moduleParam}`,
        //   { withCredentials: true }
        // );
        // const module = modresp.data.modules;
        // const courseId = module.classId;

        // const image = module.image;

        // // console.log(image);
        // const img = image === undefined ? undefined : image;

        // setUpdatedModule({
        //   title: module.title,
        //   content: module.content,
        //   description: module.description,
        //   id: module._id,
        //   featured: module.featured,
        //   status: module.status,
        //   code: module.code,
        //   level: module.level,
        //   status: module.status,
        // });
        // setFile(img);
        //console.log(module);
        //  setModules(CourseModules);

        const course = await axios.get(
          `http://localhost:8000/greendometech/ng/course/admin/${courseId}`,
          {
            withCredentials: true,
            credentials: "includes",
          }
        );
        const resp = { data: course.data.course };
        // console.log(resp.data);
        if (resp.data !== undefined) {
          setTrigger1(true);
        }
        setCourse(resp.data);
      };

      fetch();
    } catch (error) {
      return { msg: error.response.data };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(module);
  // console.log(updatedModule);
  useEffect(() => {
    setLevelCont(_.toString(updatedModule.level));
    setFeatCont(_.toString(updatedModule.featured));
    setStatusCont(_.toString(updatedModule.status));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customStyles = {
    content: {
      position: "relative",
      top: "80px",
      left: "18.5%",
      maxWidth: "80%",
      padding: "3%",
      overflow: "auto",
      maxHeight: "90vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 0,
    },
  };

  const handleSelectedStatus = (selectedOptions) => {
    const label = selectedOptions.label;
    setStatusCont(label);
  };
  const handleSelectedFeat = (selectedOptions) => {
    const label = selectedOptions.label;
    setFeatCont(label);
  };

  const handleSelectedLevel = (selectedOptions) => {
    const label = selectedOptions.label;
    setLevelCont(label);
  };

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

  // const handleChecked = (e) => {
  //   const value = e.target.value;
  //   const checked = e.target.checked;
  //   if (checked === true) {
  //     setTutor([...tutor, value]);
  //   } else {
  //     setTutor((prevstate) => prevstate?.filter((i) => i !== value));
  //   }
  //   // console.log(checked);
  //   // console.log(TutorObj);
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatedModule({ ...updatedModule, [name]: value });
  };

  // const contentValue = contentArr.filter((i) => i.content !== "");
  // const AssignTutorDisplay = AssignedTutor?.map((item, idx) => {
  //   const { username, id } = item;
  //   return (
  //     <div key={idx}>
  //       <label title={username}>{username}</label>
  //       <button onClick={() => handleUnassign(id)}>unassign</button>
  //     </div>
  //   );
  // });
  // const contentDisplay = contentArr?.map((item, id) => {
  //   return (
  //     <div key={id}>
  //       <FormRow
  //         type="text"
  //         name={`${item.id}`}
  //         value={item.content}
  //         handleChange={handleChange}
  //       />
  //     </div>
  //   );
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, content, featured, id } = updatedModule;

    const fileType = file === undefined || file === "" ? "" : file;

    // const myCode = parseFloat(code);
    const res = await axios.patch(
      `http://localhost:8000/greendometech/ng/module/admin-update-module/${id}`,
      {
        title: title,
        description: description,
        content: content,
        level: levelCont,
        status: statusCont,
        featured: FeatCont,
        image: fileType,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );

    const resp = res.data;
    //console.log(res);
    // console.log(resp.data);
    setTrigger(true);
    setModule({
      title: resp.title,
      id: resp._id,
      status: resp.status,
      party_type: resp.party_type,
      level: resp.level,
      completed: resp.completed,
      featured: resp.featured,
      description: resp.description,
      image: resp.image,
      code: resp.code,
      content: resp.content,
      createdAt: resp.createdAt,
      createdBy: resp.createdBy,
      updatedAt: resp.updatedAt,
    });

    if (resp._id !== "" || resp._id !== "") {
      onClosed();
    }
    //console.log(resp._id);
    // console.log(author[0]);
    // router.back();
    // router.push(`${url}/${courseName}/${moduleName}/${moduleParam}`)
  };
  return (
    <Modal
      className={" flex items-center gap-y-10 flex-col"}
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      <div className=" grid grid-cols-3 gap-x-20 gap-y-14 relative top-0">
        <PageTitle>edit Module {updatedModule.title}</PageTitle>
        <button onClick={() => onClosed()}>Go Back</button>
        <button onClick={(e) => setModalOpen({ setQuestion: true })}>
          set question
        </button>
      </div>
      <section>
        <div className="overflow-hidden flex flex-col gap-y-5 rounded-sm p-5 bg-whiteOpaque shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* <h2 className=" text-greenGraded1 text-2xl ">{`welcome  ${username}, please view your profile`}</h2> */}
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative mx-auto h-30 w-full max-w-30 rounded-full bg-greenGradedHov p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative flex flex-row top-10 justify-around item-center drop-shadow-2">
                <div className=" flex items-center justify-center overflow-hidden h-28 w-32">
                  {trigger1 ? (
                    <Image
                      src={trigger1 && course?.image}
                      width={100}
                      height={100}
                      alt="image"
                    />
                  ) : (
                    <Image
                      src={Greendome}
                      width={100}
                      height={100}
                      alt="image"
                    />
                  )}
                </div>
                <PageTitle>{course?.name}</PageTitle>
                <button onClick={(e) => setModalOpen({ setQuestion: true })}>
                  set question
                </button>
              </div>
            </div>
            <div className=" relative ">
              <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-2 rounded-md  py-2.5 shadow-1 dark:border-strokedark dark:">
                {/* <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"></div> */}
                <div className=" relative top-5 flex justify-around items-center p-14 gap-y-3 flex-col">
                  <div className=" relative top-5 flex justify-center max-w-addCourse items-start gap-y-3 flex-col">
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">serial key:</h4>
                      {course?.Serial_key}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">author:</h4> {course?.author}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">fee:</h4> {course?.fee}
                    </div>
                    <div className=" flex flex-row gap-x-2">
                      <h4 className=" font-bold">author:</h4>
                      {course?.createdBy}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className=" relative top-10">
                <p>Edit Profile</p>
                <button onClick={() => setModalOpen({ editProfile: true })}>
                  <AiFillSetting />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section className=" relative top-0">
        <div className="overflow-hidden flex justify-center items-center flex-col gap-y-5 rounded-sm p-5 bg-whiteOpaque shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* <h2 className=" text-greenGraded1 text-2xl ">{`welcome  ${username}, please view your profile`}</h2> */}
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative mx-auto h-30 w-full max-w-30 rounded-full bg-greenGradedHov p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative flex flex-row top-10 justify-around item-center drop-shadow-2">
                <div className=" grid grid-cols-3 p-10 gap-x-20 gap-y-14 relative top-0">
                  <div className=" flex items-center justify-center overflow-hidden relative -top-14 h-28 w-32">
                    {file !== "" && updatedModule.image !== "" ? (
                      <Image width={200} height={200} src={file} alt="image" />
                    ) : (
                      <Image
                        src={Greendome}
                        width={200}
                        height={200}
                        alt="image"
                      />
                    )}
                  </div>
                  <h2 className="font-medium"> {updatedModule.id}</h2>
                  <h2 className=" font-medium"> {updatedModule.code}</h2>
                </div>
              </div>
            </div>
          </div>{" "}
          <PageTitle>edit module</PageTitle>
          <form
            onSubmit={handleSubmit}
            action=""
            className="px-4 py-3 mb-8 flex flex-col gap-y-4"
          >
            <FormRow
              type="file"
              accept="image/*"
              name="profile-image"
              // value={values.password}
              handleChange={handleImageFile}
              className=" p-2"
            />
            {img && (
              <small style={{ color: "red" }}>
                image exceeds 1mb, choose another inage
              </small>
            )}
            {file !== "" ? (
              <Image width={200} height={200} src={file} alt="image" />
            ) : (
              <Image src={Greendome} width={200} height={200} alt="image" />
            )}
            <Label>
              <FormRow
                type="text"
                name="title"
                value={updatedModule.title}
                handleChange={handleChange}
                className=" p-2"
              />
            </Label>
            <Label>
              <TextARea
                type="text"
                name="description"
                value={updatedModule.description}
                handleChange={handleChange}
                className=" w-72 p-2"
              />
            </Label>
            <Label>
              <TextARea
                type="text"
                name="content"
                value={updatedModule.content}
                handleChange={handleChange}
                className=" w-72 p-2"
              />
            </Label>
            <div>
              <h5>featured</h5>
              <Select
                components={makeAnimated()}
                name="featured"
                options={featuredOptions}
                onChange={handleSelectedFeat}
                id="feat"
                isSearchable
                className=" w-32"
                // noOptionsMessage={() => "level not available"}
                placeholder={_.toString(updatedModule.featured)}
              />
            </div>
            <div>
              <h5>Level</h5>
              <Select
                components={makeAnimated()}
                name="level"
                options={levelOptions}
                onChange={handleSelectedLevel}
                id="level"
                isSearchable
                className=" w-32"
                noOptionsMessage={() => "level not available"}
                placeholder={_.toString(updatedModule.level)}
              />
            </div>
            <div>
              <h5>Status</h5>
              <Select
                components={makeAnimated()}
                name="status"
                options={statusOptions}
                onChange={handleSelectedStatus}
                id="status"
                isSearchable
                className=" w-32"
                noOptionsMessage={() => "status not available"}
                placeholder={_.toString(updatedModule.status)}
              />
            </div>
            <button>update module</button>
          </form>
          {/* <Label className="mt-6" check>
          <Input type="checkbox" />
          <span className="ml-2">
            I agree to the <span className="underline">privacy policy</span>
          </span>
        </Label> */}
        </div>
      </section>
    </Modal>
  );
}

export default EditModule;
