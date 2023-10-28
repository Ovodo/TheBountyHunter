import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/gameSlice";

export const store = configureStore({
  reducer: { App: appReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
