import { createSlice } from "@reduxjs/toolkit";

interface userState {
  user: string | null;
}

const initialState: userState = {
  user: process.browser && JSON.parse(localStorage.getItem("user") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.jwt;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export type userType = {
  user: string;
};
