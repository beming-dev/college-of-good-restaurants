import { createSlice } from "@reduxjs/toolkit";

interface selectedState {
  selectedCollege: null | collegeInfoType;
}

const initialState: selectedState = {
  selectedCollege: null,
};

const userSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelectedCollege: (state, action) => {
      state.selectedCollege = action.payload;
    },
  },
});

export const { setSelectedCollege } = userSlice.actions;
export default userSlice.reducer;

export type collegeInfoType = {
  college_id: Number;
  college_mail_domain: String;
  college_name: String;
  distance_limit_km: Number;
  latitude: Number;
  longitude: Number;
};
