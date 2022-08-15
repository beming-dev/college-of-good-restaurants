import { createSlice } from "@reduxjs/toolkit";
import { kakaoStoreType } from "../../lib/types";

interface selectedState {
  selectedCollege: null | collegeInfoType;
  selectedSearchResult: null | kakaoStoreType;
}

const initialState: selectedState = {
  selectedCollege: null,
  selectedSearchResult: null,
};

const userSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelectedCollege: (state, action) => {
      state.selectedCollege = action.payload;
    },
    setSelectedSearchResult: (state, action) => {
      state.selectedSearchResult = action.payload;
    },
  },
});

export const { setSelectedCollege, setSelectedSearchResult } =
  userSlice.actions;
export default userSlice.reducer;

export type collegeInfoType = {
  college_id: Number;
  college_mail_domain: String;
  college_name: String;
  distance_limit_km: Number;
  latitude: Number;
  longitude: Number;
};
