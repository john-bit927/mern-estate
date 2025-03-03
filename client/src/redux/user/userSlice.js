import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
    },
    SignInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    SignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { SignInStart, SignInSuccess, SignInFailure } = userSlice.actions;
export default userSlice.reducer;

