import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"; // Ensure correct file path

const store = configureStore({
  reducer: {
    user: userReducer, // Use the correct reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;