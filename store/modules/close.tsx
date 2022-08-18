import { createSlice } from "@reduxjs/toolkit";

interface closeState {
  resultClose: boolean;
  menuClose: boolean;
  registerClose: boolean;
}

// @edit 타입 나머지 상관없음
interface actionType {
  payload: boolean;
}

const initialState: closeState = {
  resultClose: true,
  menuClose: true,
  registerClose: true,
};

const userSlice = createSlice({
  name: "close",
  initialState,
  reducers: {
    setResultClose: (state, action) => {
      state.resultClose = action.payload;
    },
    setMenuClose: (state, action) => {
      state.menuClose = action.payload;
    },
    setRegisterClose: (state, action) => {
      state.registerClose = action.payload;
    },
  },
});

export const { setRegisterClose, setResultClose, setMenuClose } =
  userSlice.actions;
export default userSlice.reducer;
