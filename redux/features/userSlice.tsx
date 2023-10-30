import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  id?: number;
  level: number;
  address: string;
  Nft: string;
  Rewards: number;
  //   winner: boolean;
};

const initialState = {
  id: 0,
  level: 1,
  address: "",
  Nft: "",
  Rewards: 0,
  //   winner: false,
} as UserState;

export const counter = createSlice({
  name: "User",
  initialState,
  reducers: {
    newUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    upLevel: (state) => {
      state.level += 1;
    },
  },
});

export const { upLevel, newUser } = counter.actions;
export default counter.reducer;
