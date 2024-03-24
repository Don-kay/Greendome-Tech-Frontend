import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
  isSubmenuOpen: 0,
  studentView: true,
  tutorView: false,
  adminView: false,
  profileView: false,
  modalId: "",
  ishover: false,
  triggers: false,
  triggers2: false,
  isdelete: false,
};

const functionSlice = createSlice({
  name: "functions",
  initialState,

  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    toggleSubmenu: (state, action) => {
      state.isSubmenuOpen = action.payload;
    },
    displayTutor: (state) => {
      state.tutorView = true;
      state.studentView = false;
    },
    displayAdmin: (state) => {
      state.adminView = true;
      state.studentView = false;
      state.tutorView = false;
    },
    displayStudents: (state) => {
      state.adminView = false;
      state.studentView = true;
      state.tutorView = false;
    },
    ProfileModal: (state, action) => {
      state.profileView = action.payload.bool;
      state.modalId = action.payload.id;
    },
    HoverModal: (state, action) => {
      state.ishover = action.payload;
    },
    HoverDelete: (state, action) => {
      state.isdelete = action.payload;
    },
    ToggleTrigger: (state) => {
      state.triggers = !state.triggers;
    },
    ToggleTrigger2: (state) => {
      state.triggers2 = !state.triggers2;
    },
  },
});

export const {
  toggleSideBar,
  toggleSubmenu,
  displayTutor,
  displayAdmin,
  displayStudents,
  ProfileModal,
  HoverModal,
  HoverDelete,
  ToggleTrigger,
  ToggleTrigger2,
} = functionSlice.actions;

export default functionSlice.reducer;
