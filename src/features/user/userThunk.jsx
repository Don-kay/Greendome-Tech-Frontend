import customFetch from "../../utilities/axios";
import { Fetch } from "../../utilities/axios";

// import { useSignIn } from "react-auth-kit";

export const registerUserThunk = async (url, user, thunkApi) => {
  //console.log(user);
  try {
    const resp = await Fetch.post(url, user);
    const response = { data: resp.data, stats: resp.status };
    return response.data;
  } catch (error) {
    //return error?.response.data;
    return thunkApi.rejectWithValue(error?.response.data);
  }
  //this fetches the the bass url and builds upp the rest domain
};
export const loginUserThunk = async (url, user, thunkApi) => {
  try {
    const resp = await Fetch.post(url, user, {
      withCredentials: true,
      credentials: "include",
    });
    const response = { data: resp.data, stats: resp.status };
    //console.log(response.data);

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({
      msg: error.response.data,
      stats: error.response.status,
    });
  }
  //this fetches the the bass url and builds upp the rest domain
};
