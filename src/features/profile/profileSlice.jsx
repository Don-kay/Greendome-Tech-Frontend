import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersThunk, updateAdminThunk } from "./profileThunk";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  isUpdated: false,
  users: [],
  totalUsers: 0,
  totalStudents: 0,
  totalTutors: 0,
  totalAdmin: 0,
  activeStudent: 0,
  page: 1,
  profileParams: "",
  status: "",
  updatedProfiles: "",
  updated: "",
  msg: "",
  updatedStatus: "",
  stats: {},
  ...initialFilterState,
};

export const GetAllUsers = createAsyncThunk(
  "profiles/allprofiles",
  getAllUsersThunk
);
export const adminUpdateUsers = createAsyncThunk(
  "profiles/updateallprofiles",
  async (user, thunkApi) => {
    return updateAdminThunk(user, thunkApi);
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState,

  reducers: {
    setStudents: (state, action) => {
      state.totalStudents = action.payload;
    },
    setTutors: (state, action) => {
      state.totalTutors = action.payload;
    },
    setAdmin: (state, action) => {
      state.totalAdmin = action.payload;
    },
    setActiveStudent: (state, action) => {
      state.activeStudent = action.payload;
    },
    setActiveParams: (state, action) => {
      state.profileParams = action.payload;
    },
    setIsupdated: () => {
      state.isUpdated = !state.isUpdated;
    },
  },

  extraReducers: {
    [GetAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [GetAllUsers.fulfilled]: (state, action) => {
      const { payload } = action;
      // console.log(action);
      state.isLoading = true;
      //console.log(payload);
      state.users = payload?.data.user;
      state.totalUsers = payload?.data.count;
      state.status = payload?.stats;
    },
    [GetAllUsers.rejected]: (state, action) => {
      const { payload } = action;
      state.isLoading = true;
      state.msg = payload?.msg;
      state.status = payload?.stats;
    },
    [adminUpdateUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [adminUpdateUsers.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      // console.log(payload);
      state.msg = payload?.msg;
      state.updatedStatus = payload?.stats;
    },
    [adminUpdateUsers.rejected]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.msg = payload?.msg;
      state.updatedStatus = payload?.stats;
    },
  },
});

export const {
  setStudents,
  setTutors,
  setAdmin,
  setActiveStudent,
  setActiveParams,
} = profileSlice.actions;

export default profileSlice.reducer;
