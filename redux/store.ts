import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/gameSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: { App: appReducer, User: userReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
