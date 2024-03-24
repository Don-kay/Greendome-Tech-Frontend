import customFetch from "../../../utilities/axios";
// import { cookies } from "next/headers";

export const AllModulesThunk = async (_, thunkApi) => {
  try {
    const res = await customFetch.get("/classes/admin/view-all-classes", {
      withCredentials: true,
      credentials: "includes",
    });
    const resp = { data: res.data, stats: res.status };
    return resp;
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
export const CreateModulesThunk = async (modules, thunkApi) => {
  console.log(modules);
  const {
    title,
    description,
    code,
    featured,
    status,
    level,
    image,
    content,
    paramId,
    paramName,
  } = modules;
  try {
    const res = await customFetch.post(
      `module/create-module/${paramName}/${paramId}`,
      {
        title: title,
        description: description,
        code: code,
        featured: featured,
        status: status,
        level: level,
        image: image,
        content: content,
      },
      {
        withCredentials: true,
        credentials: "includes",
      }
    );
    const resp = { data: res.data, stats: res.status };
    return resp;
  } catch (error) {
    return thunkApi.rejectWithValue(error?.response.data);
    // return console.log(error?.response.data);
    // console.log({ stats: error?.response.status}),

    // stats: error?.response.status,
  }
};
export const getQuestionThunk = async (question, thunkApi) => {
  // const cookiesStore = cookies();
  // const cookie = cookiesStore.get("myToken")?.value;
  console.log(question);
  const { questionId } = question;
  try {
    const res = await customFetch.get(
      `module/assessment/all-questions/${questionId}`,
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    const resp = { data: res.data, stats: res.status };
    return resp;
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
export const CreateQuestionThunk = async (questions, thunkApi) => {
  console.log(questions);
  const { question, moduleId, option1, option2, option3, option4, answer } =
    questions;
  try {
    const res = await customFetch.post(
      `module/assessment/create_question/${moduleId}`,
      {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
      },
      {
        withCredentials: true,
        credentials: "includes",
      }
    );
    const resp = { data: res.data, stats: res.status };
    return resp;
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
