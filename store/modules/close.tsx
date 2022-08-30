import { createSlice } from "@reduxjs/toolkit";

interface closeState {
  resultClose: boolean;
  menuClose: boolean;
  registerClose: boolean;
  enrollReviewClose: boolean;
  updateReviewClose: boolean;
}

// @edit 타입 나머지 상관없음
interface actionType {
  payload: boolean;
}

const initialState: closeState = {
  resultClose: true,
  menuClose: true,
  registerClose: true,
  enrollReviewClose: true,
  updateReviewClose: true,
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
    setEnrollReviewClose: (state, action) => {
      state.enrollReviewClose = action.payload;
    },
    setUpdateReviewClose: (state, action) => {
      state.updateReviewClose = action.payload;
    },
  },
});

export const {
  setRegisterClose,
  setResultClose,
  setMenuClose,
  setEnrollReviewClose,
  setUpdateReviewClose,
} = userSlice.actions;
export default userSlice.reducer;
