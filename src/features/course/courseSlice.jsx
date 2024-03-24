import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllCoursesThunk, CreateCoursesThunk } from "./courseThunk";

const initialState = {
  course: "",
  isLoading: false,
  TotalCourse: 0,
  ratedCourse: "",
  stats: null,
};

export const GetAllCourse = createAsyncThunk(
  "course/allcourse",
  async (axios, thunkApi) => {
    return AllCoursesThunk(axios, thunkApi);
  }
);
export const createCourse = createAsyncThunk(
  "course/createcourse",
  CreateCoursesThunk
);

const courseSlice = createSlice({
  name: "course",
  initialState,

  reducers: {
    setTotalCourse: (state, action) => {
      state.TotalCourse = action.payload;
    },
    setRatedCourse: (state, action) => {
      state.ratedCourse = action.payload;
    },
    resetStats: (state) => {
      state.stats = null;
    },
    resetCourse: (state) => {
      state.course = undefined;
    },
  },

  extraReducers: {
    [GetAllCourse.pending]: (state) => {
      state.isLoading = true;
    },
    [GetAllCourse.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      // state.course = payload.data.classes;
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
    },
    [GetAllCourse.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [createCourse.pending]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [createCourse.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.course = payload?.data.course;
      // state.TotalCourse = payload.data.count;
      state.stats = payload?.stats;
      state.isLoading = false;
    },
    [createCourse.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
  },
});

export const { setTotalCourse, setRatedCourse, resetStats, resetCourse } =
  courseSlice.actions;

export default courseSlice.reducer;
