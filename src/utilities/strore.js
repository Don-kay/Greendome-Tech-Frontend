import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import functionSlice from "../features/functions/functionSlice";
import courseSlice from "../features/course/courseSlice";
import profileSlice from "../features/profile/profileSlice";
import moduleSlice from "../features/course/module/moduleSlice";
import percentageSlice from "../features/course/percentage/percentageSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  timeout: 1000,
  key: "root",
  storage,
};

// const persistedState = loadState();
const reducer = combineReducers({
  user: userSlice,
  functions: functionSlice,
  profiles: profileSlice,
  course: courseSlice,
  module: moduleSlice,
  percentage: percentageSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        // ignoredActions: ["user/loginUser/rejected"],
        // ignoredActions: ["persist/PERSIST"],
      },
    }),
});
