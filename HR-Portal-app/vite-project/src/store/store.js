import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../slice/emloyeeSlice";

const store = configureStore({
  reducer: {
    employeeKey: employeeSlice,
  },
});

export default store;