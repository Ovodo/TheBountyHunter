import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  id?: number;
  level: number;
  address: string;
  Nft: any;
  Rewards: number;
  //   winner: boolean;
};

const initialState = {
  id: 0,
  level: 1,
  address: "",
  Nft: {},
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
    newToken: (state, action: PayloadAction<any>) => {
      state.Nft = action.payload;
    },
  },
});

export const { newToken, newUser } = counter.actions;
export default counter.reducer;
