"use client";
import React, { useState, useEffect } from "react";
import Loading from "../layout_constructs/loading";
import { setLoading } from "../../../features/user/userSlice";
import customFetch from "../../../utilities/axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { createModules } from "../../../features/course/module/moduleSlice";
import CreateQuestionId from "./createQuestionId";
import { useSelector, useDispatch } from "react-redux";
import { Input, HelperText, Label, Textarea } from "@roketid/windmill-react-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextARea from "../../TextArea";
import { resetErrorMsg } from "../../../features/course/module/moduleSlice";
import { resetModule } from "../../../features/course/module/moduleSlice";
import Greendome from "../../asset/greendome.jpg";
import PageTitle from "../../typography/PageTitle";
import Image from "next/image";
import FormRow from "../../FormRow";
import _, { divide } from "lodash";

const initialStates = {
  title: "",
  description: "",
  content: "",
  code: "",
};

const CreateModule = ({
  paramsName,
  isOpen,
  course,
  courseid,
  questions,
  // moduleid,
  retrieve,
  moduleRetrieved,
  setQuestions,
  onClosed,
  modules,
  setModule,
  setTrigger,
  trigger,
}) => {
  const paramName = paramsName;
  //const paramId = paramsId;
  const [values, setValues] = useState(initialStates);
  const [error, setError] = useState({
    duplicateCode: false,
    maxlength: false,
  });
  const [levelCont, setLevelCont] = useState();
  const [modal, setModal] = useState({ show: false, msg: "", type: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [statusCont, setStatusCont] = useState();
  const [file, setFile] = useState();
  const [img, setImg] = useState(false);
  const [moduler, setModuler] = useState(false);
  const [trigged, setTrigged] = useState(false);
  const [loader, setLoader] = useState(false);
  const [onclosetrigger, setOnclosedTrigger] = useState(false);
  const { isLoading } = useSelector((strore) => strore.user);
  const [featured, setFeatured] = useState(false);
  const [module, setObjModule] = useState();
  const [moduleid, setModuleid] = useState();
  const url = "/panel/admin_dashboard/create-module";

  const disPatch = useDispatch();
  const router = useRouter();
  //console.log(modules);
  // console.log(paramId);

  const statusOptions = [
    { value: "1", label: "visible" },
    { value: "2", label: "not visible" },
  ];
  // const categoryOptions = [
  //   { value: "1", label: "none" },
  //   { value: "2", label: "machine learning" },
  //   { value: "3", label: "html" },
  //   { value: "4", label: "css" },
  //   { value: "4", label: "node js" },
  //   { value: "4", label: "react js" },
  //   { value: "4", label: "full stack development" },
  //   { value: "4", label: "UI/UX" },
  // ];
  const levelOptions = [
    { value: "1", label: "beginner" },
    { value: "2", label: "intermediate" },
    { value: "3", label: "advanced" },
  ];
  //console.log(isLoading);
  const moduleQuestion = questions?.filter((i) => i.moduleId === moduleid);

  const showModal = (show = false, msg = "", type = "") => {
    setModal(show, msg, type);
  };
  useEffect(() => {
    showModal({ show: false });
    disPatch(resetErrorMsg(""));
    disPatch(resetModule(""));
  }, []);
  useEffect(() => {
    onClosed();
  }, [onclosetrigger]);

  // const completedOptions = [
  //   { value: "1", label: true },
  //   { value: "2", label: false },
  // ];
  // const featuredOptions = [
  //   { value: "1", label: true },
  //   { value: "2", label: false },
  // ];

  // useEffect(()=> {
  //   const
  // })
  // const { module, moduleStats, errorMsg } = useSelector(
  //   (strore) => strore.module
  // );
  // const moduleid = module?._id;
  //rerender a module useeeffect
  // if (moduleid !== undefined) {
  //   setModule([...modules, module]);
  //   // setTrigger(true);
  // } else {
  //   null;
  // }

  //console.log(moduleid);

  // useEffect(() => {
  //   if (errorMsg?.msg !== undefined) {
  //     showModal({ show: true });
  //   }
  //   const timeout = setTimeout(() => {
  //     showModal({ show: false });
  //     disPatch(resetErrorMsg(""));
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, [errorMsg]);

  // console.log(errorMsg?.msg);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleFeatured = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked === true) {
      setFeatured(true);
    } else {
      setFeatured(false);
    }

    // console.log(checked);
  };

  // console.log(module === "");

  // const handleSelectedcategory = (selectedOptions) => {
  //   const label = selectedOptions.label;
  //   setCategoryCont(label);
  // };
  useEffect(() => {
    const error = setTimeout(() => {
      setError({ duplicateCode: false });
      setError({ maxlength: false });
      // console.log(true);
    }, 5000);

    return () => clearTimeout(error);
  }, [trigged]);

  const customStyles = {
    content: {
      position: "relative",
      top: "20vh",
      left: "18.5%",
      maxWidth: "80%",
      padding: "2%",
      overflow: "auto",
      maxHeight: "70vh",
      backgroundColor: "hsl(112, 42%, 86%)",
      //   transform: "translate(-50%, -50%)",
      zIndex: 0,
    },
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

  const handleSelectedLevel = (selectedOptions) => {
    const label = selectedOptions.label;
    setLevelCont(label);
  };
  const handleSelectedStatus = (selectedOptions) => {
    const label = selectedOptions.label;
    setStatusCont(label);
  };

  const handleCreateQuestion = () => {
    setFile(undefined);
    setModalOpen(true);
    setTrigger(false);
  };
  // const handleSelectedFeatured = (selectedOptions) => {
  //   const label = selectedOptions.label;
  //   setFeaturedCont(label);
  // };
  const handleSubmitt = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { title, description, content, code } = values;
    if (!title || !description || !content || !code) {
      toast.error("please fill out all details");
      return;
    }

    const fileType = file === undefined ? "" : file;

    try {
      const res = await customFetch.post(
        `module/create-module/${paramName}/${courseid}`,
        {
          title: title,
          description: description,
          content: content,
          code: code,
          level: levelCont,
          status: statusCont,
          featured: featured,
          image: fileType,
        },
        {
          withCredentials: true,
          credentials: "includes",
        }
      );
      const resp = { data: res.data, stats: res.status };
      const singleModule = resp.data.modules;
      //console.log(singleModule);
      if (singleModule._id !== "" || singleModule._id !== undefined) {
        setModule([...modules, singleModule]);
        setObjModule(singleModule);
        setModuleid(singleModule._id);
        setValues({ title: "", description: "", content: "", code: "" });
        setFeatured(false);
        setModuler(true);
        setLevelCont("");
        setStatusCont("");
        setFile("");
        setTrigger(true);
        setLoader(false);
      }

      // return console.log(resp);
    } catch (error) {
      // return error?.response.data;
      if (
        error?.response.data.msg ===
        "Duplicate value entered for code field, please choose another value"
      ) {
        setError({ duplicateCode: true });
        setTrigged(!trigged);
        // console.log(true);
      }
      if (
        error?.response.data.msg ===
        "module validation failed: description: Path `description` (`guiuj`) is shorter than the minimum allowed length (10)."
      ) {
        setError({ maxlength: true });
        setTrigged(!trigged);
        // console.log(true);
      }
      return error?.response.data;
      // console.log({ stats: error?.response.status}),

      // stats: error?.response.status,
    }

    // disPatch(
    //   createModules({
    //     title: title,
    //     description: description,
    //     content: content,
    //     code: code,
    //     level: levelCont,
    //     status: statusCont,
    //     featured: featured,
    //     image: fileType,
    //     paramName: paramName,
    //     paramId: courseid,
    //   })
    // );
    // const modules = await axios.get();
  };

  useEffect(() => {
    if (statusCont === "") {
      setStatusCont("visible");
    }
    if (levelCont === "") {
      setLevelCont("beginner");
    }
  }, [handleSelectedLevel, handleSelectedStatus, handleSubmitt]);

  // console.log(moduleid);
  // setTrigger;
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (moduleStats === 201 && module !== "") {

  //     } else {
  //       return;
  //     }
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, [handleSubmitt]);

  return (
    <Modal
      className={
        " flex flex-col justify-center items-center rounded-sm p-5 bg-whiteOpaque shadow-default border-y-greenui overflow-y-scroll scrollbar-thin scrollbar-track-metal scrollbar-thumb-dark scroll-p-10 dark:border-strokedark dark:bg-boxdark"
      }
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClosed}
    >
      <button onClick={() => onClosed()}>Go Back</button>
      {loader && (
        <div className=" flex items-center  min-w-innerlay3 h-96 top-36 left-0 z-20 absolute ">
          <Loading />
        </div>
      )}

      {trigger ? (
        <div className=" relative top-0">
          <h1>module successsfully created, would you like to set questions</h1>
          <div className=" relative flex my-5 justify-center items-center gap-12 flex-row">
            <button onClick={() => onClosed()}>no</button>
            <button onClick={() => handleCreateQuestion()}>yes</button>
          </div>
        </div>
      ) : (
        <section className=" relative top-10 px-4 py-3 mb-8 flex flex-col gap-y-5 w-2/4 justify-center items-center bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1>set module for {paramName}</h1>
          {modal.show && <h2>{errorMsg.msg}</h2>}
          <form className="px-4 py-3 mb-8 flex flex-col gap-y-4" action="">
            <PageTitle>Create Module</PageTitle>

            <Label>
              <FormRow
                type="text"
                name="title"
                value={values.title}
                handleChange={handleChange}
                className=" p-2"
              />
            </Label>
            <Label>
              <FormRow
                type="text"
                name="content"
                value={values.content}
                handleChange={handleChange}
                className=" p-2"
              />
            </Label>
            <Label>
              {error.maxlength && (
                <p className=" text-red">text must not be less than 10</p>
              )}
              <TextARea
                type="text"
                name="description"
                value={values.description}
                handleChange={handleChange}
                className=" p-2"
              />
            </Label>
            <Label>
              {error.duplicateCode && (
                <p className=" text-red">
                  code is already in use, choose a unique code related to your
                  course
                </p>
              )}

              <small>exampe: XYZ/CFS/112</small>
              <FormRow
                type="text"
                maxLength={11}
                name="code"
                value={values.code}
                handleChange={handleChange}
              />
            </Label>
            <Label>
              <FormRow
                type="checkbox"
                name="featured"
                value={featured}
                //   check={featured}
                handleChange={handleFeatured}
              />
            </Label>

            <FormRow
              type="file"
              accept="image/*"
              name="profile-image"
              // value={values.password}
              handleChange={handleImageFile}
              className=" p-2"
            />
            <div>
              {img && (
                <small style={{ color: "red" }}>
                  image exceeds 1mb, choose another inage
                </small>
              )}
              {file === undefined || file === "" ? (
                <Image width={100} height={100} src={Greendome} alt="image" />
              ) : (
                <Image width={100} height={100} src={file} alt="image" />
              )}
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
                noOptionsMessage={() => "status not available"}
                placeholder="status"
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
                noOptionsMessage={() => "level not available"}
                placeholder="level"
              />
            </div>
            <button onClick={handleSubmitt} type="submit">
              create
            </button>
          </form>
        </section>
      )}
      <CreateQuestionId
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        moduleid={moduleid}
        courseid={courseid}
        paramsName={paramName}
        module1={module}
        moduler={moduler}
        setOnclosed={setOnclosedTrigger}
        Questions1={moduleQuestion}
        setQuestions={setQuestions}
      />
    </Modal>
  );
};

export default CreateModule;

// router.push(`${url}/${paramName}/${courseid}/${moduleid}`);
