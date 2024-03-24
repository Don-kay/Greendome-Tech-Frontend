import customFetch from "../../../utilities/axios";
// import { cookies } from "next/headers";

export const getPercentageThunk = async (_, thunkApi) => {
  try {
    const res = await customFetch.get("/finance/company/view-percentage", {
      withCredentials: true,
      credentials: "includes",
    });
    const resp = { data: res.data.profitRatio, stats: res.status };
    return resp.data;
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
export const CreatepercentageThunk = async (percentage, thunkApi) => {
  console.log(percentage);

  try {
    const res = await customFetch.post(
      `finance/company/create-percentage-ratio`,
      {
        percentage: percentage,
      },
      {
        withCredentials: true,
        credentials: "includes",
      }
    );
    const resp = { data: res.data.profitRatio, stats: res.status };
    return resp.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error?.response.data);
    // return console.log(error?.response.data);
    // console.log({ stats: error?.response.status}),

    // stats: error?.response.status,
  }
};
export const updatePercentageThunk = async (percent, thunkApi) => {
  const param = percent.params;
  const percentage = percent.percentage;
  const party_type = percent.party_type;
  console.log(percentage);
  console.log(param);
  console.log(party_type);

  try {
    const res = await customFetch.put(
      `/finance/company/update-percentage/${param}`,
      {
        percentage: percentage,
        party_type: party_type,
      },
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
    const resp = { data: res.data.profitRatio, stats: res.status };
    return [resp.data];
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
