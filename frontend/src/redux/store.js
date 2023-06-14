import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import destinationReducer from "../redux/features/destination/destinationSlice";
import filterReducer from "../redux/features/destination/filterSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    destination: destinationReducer,
    filter: filterReducer
  },
});