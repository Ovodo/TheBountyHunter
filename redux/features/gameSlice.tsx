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
  tries: 5,
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
      state.tries = state.level * 5;
      switch (state.level) {
        case 2:
          state.timer = 45;
          break;
        case 3:
          state.timer = 60;
          break;
        case 4:
          state.timer = 75;
          break;
        case 5:
          state.timer = 90;
          break;
        default:
          state.timer = 30;
          break;
      }
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
      state.tries = state.level * 5;
      switch (state.level) {
        case 2:
          state.timer = 45;
          break;
        case 3:
          state.timer = 60;
          break;
        case 4:
          state.timer = 75;
          break;
        case 5:
          state.timer = 90;
          break;
        default:
          state.timer = 30;
          break;
      }
    },
    upHint: (state) => {
      state.hint += 1;
    },
    setWinner: (state, action: PayloadAction<boolean>) => {
      state.winner = action.payload;
    },
    setTries: (state) => {
      state.tries = state.level * 5;
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
  setTries,
  decTries,
  setWinner,
} = counter.actions;
export default counter.reducer;
