import { createSlice } from "@reduxjs/toolkit";

interface mapState {
  map: any;
}

const initialState: mapState = {
  map: "",
};

const userSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
  },
});

export const { setMap } = userSlice.actions;
export default userSlice.reducer;
