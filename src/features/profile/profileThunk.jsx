import customFetch from "../../utilities/axios";
import { Fetch } from "../../utilities/axios";

export const getAllUsersThunk = async (_, thunkApi) => {
  //   const { page, search, searchStatus, searchType, sort } =
  //     thunkApi.getState().profiles;
  // console.log(axios);
  //   let url = `/users?status=${searchStatus}&userType=${searchType}&sort=${sort}&page=${page}`;
  //   if (search) {
  //     url = url + `&search=${search}`;
  //   }
  try {
    const res = await Fetch.get("/auth/users", {
      withCredentials: true,
      credentials: "include",
    });
    const resp = { data: res.data, stats: res.status };
    //console.log(resp);
    return resp;
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
export const updateAdminThunk = async (user, thunkApi) => {
  //   const { page, search, searchStatus, searchType, sort } =
  //     thunkApi.getState().profiles;

  //   let url = `/users?status=${searchStatus}&userType=${searchType}&sort=${sort}&page=${page}`;
  //   if (search) {
  //     url = url + `&search=${search}`;

  //   }
  const param = user.params;
  const roles = user.roles;
  // console.log(param);
  // console.log(roles);

  // const {
  //   firstname,
  //   lastname,
  //   certificate,
  //   mobilenumber,
  //   biography,
  //   roles,
  //   country,
  // } = user;

  // console.log(user);

  try {
    const res = await Fetch.put(
      `/auth/users/update/${param}`,

      roles,
      {
        withCredentials: true,
        credentials: "include",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
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
