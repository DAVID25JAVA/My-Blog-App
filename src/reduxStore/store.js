import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reduxStore/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
