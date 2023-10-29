import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameState = {
  level: number;
  tries: number;
  hint: number;
  timer: number;
  winner: boolean;
};

const initialState = {
  level: 4,
  tries: 4,
  hint: 0,
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
      state.tries = state.level * 4;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
      state.tries = state.level * 4;
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
    decTries: (state) => {
      state.tries -= 1;
    },
  },
});

export const {
  upLevel,
  upHint,
  setLevel,
  reset,
  setTimer,
  decTries,
  setWinner,
} = counter.actions;
export default counter.reducer;
