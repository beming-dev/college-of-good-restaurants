import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import map from "./map";
import selected from "./selected";

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    user,
    map,
    selected,
  })(state, action);
};

export default reducer;
export type rootState = ReturnType<typeof reducer>;
