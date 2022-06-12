import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import reducer from "./modules";

const makeStore = (context: any) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  });

export const wrapper = createWrapper(makeStore, {
  debug: false,
});
