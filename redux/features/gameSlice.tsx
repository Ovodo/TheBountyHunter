import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameState = {
  level: number;
  tries: number;
  hint: number;
  timer: number;
  winner: boolean;
};

const initialState = {
  level: 1,
  tries: 4,
  hint: 1,
  timer: 30,
  winner: false,
} as GameState;

export const counter = createSlice({
  name: "App",
  initialState,
  reducers: {
    reset: () => initialState,
    upLevel: (state) => {
      state.level += 1;
    },
    upHint: (state) => {
      state.hint += 1;
    },
    setWinner: (state, action: PayloadAction<boolean>) => {
      state.winner = action.payload;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
    decTries: (state, action: PayloadAction<number>) => {
      state.tries -= 1;
    },
  },
});

export const { upLevel, upHint, reset, setTimer, decTries, setWinner } =
  counter.actions;
export default counter.reducer;
