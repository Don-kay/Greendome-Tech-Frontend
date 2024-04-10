import customFetch from "../../utilities/axios";
import { Fetch } from "../../utilities/fetch";

export const AllCoursesThunk = async (axios, thunkApi) => {
  const token = axios.token;
  console.log(token);
  try {
    const res = await Fetch.get("/course/admin/view-all-course", axios.token, {
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
export const CreateCoursesThunk = async (course, thunkApi) => {
  // console.log(course);
  try {
    const res = await Fetch.post("course/create-course", course, {
      withCredentials: true,
      credentials: "includes",
    });
    console.log(res);
    const resp = { data: res.data, stats: res.status };
    return resp;
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
