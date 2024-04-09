import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  CreatepercentageThunk,
  getPercentageThunk,
  updatePercentageThunk,
} from "./percentageThunk";
import _ from "lodash";

const initialState = {
  percentage: "",
  allpercentage: "",
  isLoading: false,
  updateMsg: false,
};

export const getPercentage = createAsyncThunk(
  "course/getpercentage",
  getPercentageThunk
);
// export const GetAllModules = createAsyncThunk(
//
// );
export const createPercentage = createAsyncThunk(
  "course/createpercentage",
  CreatepercentageThunk
);
export const updatePercentage = createAsyncThunk(
  "course/updatepercentage",
  updatePercentageThunk
);
// export const getQuestions = createAsyncThunk(
//   "course/getquestions",
//   async (question, thunkApi) => {
//     return getQuestionThunk(question, thunkApi);
//   }
// );

const percentageSlice = createSlice({
  name: "percentage",
  initialState,

  reducers: {
    setPercentage: (state, action) => {
      state.percentage = action.payload;
    },
    resetPercentage: (state) => {
      state.percentage = 0;
    },
    resetUpdateMsg: (state) => {
      state.updateMsg = "";
    },
    UpdateMsg: (state, action) => {
      state.updateMsg = action.payload;
    },
  },

  extraReducers: {
    [getPercentage.pending]: (state) => {
      state.isLoading = true;
    },
    [getPercentage.fulfilled]: (state, action) => {
      const { payload } = action;
      //console.log(payload);
      state.allpercentage = payload;
      const data = _.toString(payload.map((i) => i.percentage));
      if (data === "") {
        state.percentage = 0;
      } else {
        state.percentage = _.toString(payload.map((i) => i.percentage));
      }
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
    },
    [getPercentage.rejected]: (state, action) => {
      const { payload } = action;
      //console.log(payload);
      state.isLoading = true;
    },
    [createPercentage.pending]: (state, action) => {
      const { payload } = action;
      //console.log(payload);
      state.isLoading = true;
    },
    [createPercentage.fulfilled]: (state, action) => {
      const { payload } = action;
      state.percentage = payload.percentage;
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
      // state.successMsg = payload;
    },
    [createPercentage.rejected]: (state, action) => {
      const { payload } = action;
      //console.log(payload);
      state.isLoading = true;
      // state.errorMsg = payload;
    },
    [updatePercentage.pending]: (state, action) => {
      const { payload } = action;
      //console.log(payload);
      state.isLoading = true;
    },
    [updatePercentage.fulfilled]: (state, action) => {
      const { payload } = action;
      state.allpercentage = payload;
      const data = _.toString(payload.map((i) => i.percentage));
      if (data === "") {
        state.percentage = 0;
        state.updateMsg = "percentage failed to update";
      } else {
        state.percentage = _.toString(payload.map((i) => i.percentage));
        state.updateMsg = "percentage successfully updated";
      }
      state.isLoading = false;
      // state.successMsg = payload;
    },
    [updatePercentage.rejected]: (state, action) => {
      const { payload } = action;
      //console.log(payload);
      state.isLoading = true;
      // state.errorMsg = payload;
    },
    // [getQuestions.pending]: (state, action) => {
    //   const { payload } = action;
    //   console.log(payload);
    //   state.isLoading = true;
    // },
    // [getQuestions.fulfilled]: (state, action) => {
    //   const { payload } = action;
    //   console.log(payload);
    //   state.allQuestions = payload?.data.question;
    //   // state.TotalCourse = payload.data.count;
    //   state.isLoading = false;
    // },
    // [getQuestions.rejected]: (state, action) => {
    //   const { payload } = action;
    //   console.log(payload);
    //   state.isLoading = true;
    // },
  },
});

export const { resetPercentage, setPercentage, resetUpdateMsg, UpdateMsg } =
  percentageSlice.actions;

export default percentageSlice.reducer;
