import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import languageReducer from "./languageSlice";
import dummyReducer from "./dummySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    dummy: dummyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
