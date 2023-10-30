"use client";

import { useState } from "react";
import React from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { set } from "mongoose";
import { useRouter } from "next/router";
import useSound from "use-sound";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decTries, setWinner } from "@/redux/features/gameSlice";
import useGameSounds from "@/hooks/useGameSounds";

const pop = Poppins({ weight: "700", subsets: ["latin-ext"] });

const GameBoard: React.FC = () => {
  const { timer, tries, hint, winner, level } = useAppSelector(
    (state) => state.App
  );
  const [board, setBoard] = useState<string[][]>(generateBoard(level));
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [hints, setHints] = useState<number>(hint);
  const [hintBoard, setHintBoard] = useState<string[][]>(
    generateHintBoard(board)
  );
  const [clickedSlot, setClickedSlot] = useState<[number, number] | null>(null);
  const slotWidth: String = (100 / (3 * level)) as unknown as string; // Calculate the width percentage
  const router = useRouter();
  const [play, { stop }] = useSound("/tony.mp3", { volume: 0.7 });
  const [play2] = useSound("/door.wav", { volume: 0.7 });
  const dispatch = useAppDispatch();
  const { Stop, Tony } = useGameSounds();

  //  ---------------------------------Functions and Effects

  function generateBoard(level: number): string[][] {
    let size = 3 * level;
    let newBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    newBoard[x][y] = "Criminal";

    for (let i = 0; i < level - 1; i++) {
      let decoyX: number, decoyY: number;
      do {
        decoyX = Math.floor(Math.random() * size);
        decoyY = Math.floor(Math.random() * size);
      } while (newBoard[decoyX][decoyY]);
      newBoard[decoyX][decoyY] = "Decoy";
    }

    return newBoard;
  }

  function generateHintBoard(gameBoard: string[][]): string[][] {
    const hintBoard = gameBoard.map((row) => row.map(() => ""));
    let criminalRow = -1;
    let criminalCol = -1;

    // Find the position where the criminal is located
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j] === "Criminal") {
          criminalRow = j;
          criminalCol = i;
          break; // Break out of the inner loop
        }
      }
      if (criminalRow !== -1) {
        break; // Break out of the outer loop
      }
    }
    let probability =
      level == 1 ? 0.6 : level == 2 ? 0.65 : level == 3 ? 0.7 : 0.95;

    // Scatter hints on the criminal's row
    if (criminalRow !== -1) {
      for (let j = 0; j < gameBoard[criminalRow].length; j++) {
        if (Math.random() < probability) {
          // 100% probability to scatter the hint
          hintBoard[j][criminalRow] =
            "Criminal's footprints were last seen on these roads";
        }
      }
    }

    // Scatter hints on the criminal's column
    if (criminalCol !== -1) {
      for (let i = 0; i < gameBoard.length; i++) {
        if (Math.random() < probability) {
          // 100% probability to scatter the hint
          hintBoard[criminalCol][i] =
            "Criminal's footprints were last seen on these roads";
        }
      }
    }

    return hintBoard;
  }

  function handleClick(x: number, y: number): void {
    // if (tries == 0) {
    //   setMessage("Game over! No tries left.");
    //   return;
    // }
    play2();
    setOpen(!open);
    setClickedSlot([x, y]);
    if (board[x][y] === "Criminal") {
      setMessage("You found the criminal!");
      dispatch(setWinner(true));
    } else if (hintBoard[x][y]) {
      setMessage(hintBoard[x][y]);
    } else if (board[x][y] === "Decoy") {
      setMessage("Decoy! Try again!");
    } else {
      setMessage("Empty! Keep searching.");
    }

    // if (board[x][y] === "Criminal") {
    //   setMessage("You found the criminal!");
    // } else if (board[x][y] === "Decoy") {
    //   setMessage("Decoy! Try again!");
    // } else {
    //   setMessage("Empty! Keep searching.");
    // }
    dispatch(decTries());
  }

  function giveHint(): void {
    if (hints <= 0) {
      setMessage("No hints left!");
      return;
    }
    // play();
    stop();
    setHints(hints - 1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -500 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex  ${
        tries == 0 || winner ? "bg-[#2C2C54]" : "bg-white"
      }  h-full flex-wrap mb-3 w-full`}
    >
      <div className='absolute flex flex-col items-start top-4  left-4 '>
        <div
          className={`text-center   text-[#C89933] text-2xl font-bold mb-4 mt-auto ${pop.className}`}
        >
          {`Tries : ${tries} left`}
        </div>
        {/* <div
          className={`text-center  text-[#C89933] text-2xl font-bold mb-4 mt-auto ${pop.className}`}
        >
          {`Hints : ${hints} left`}
        </div> */}
        <div
          className={`text-center  text-[#C89933] text-2xl font-bold mb-4 mt-auto ${pop.className}`}
        >
          {`Level : ${level}`}
        </div>
      </div>
      <div
        className={`w-[200px] text-left flex flex-wrap absolute left-8 bottom-36 text-[#C89933] text-lg font-bold mb-4 mt-auto ${pop.className}`}
      >
        {`${message}`}
      </div>
      {board.map((row, x) => (
        <div
          style={{ width: `${slotWidth}%`, height: `${slotWidth}%` }}
          className={`bg-white ${
            tries == 0 || winner ? "opacity-10" : ""
          } relative items-center justify-center`}
          key={x}
        >
          {" "}
          {row.map((cell, y) => (
            <div className={`relative w-full h-full`} key={y}>
              <div
                className={`w-[100%] ${
                  clickedSlot &&
                  clickedSlot[0] === x &&
                  clickedSlot[1] === y &&
                  tries == 0
                    ? "translate-y-[0%]"
                    : clickedSlot &&
                      clickedSlot[0] === x &&
                      clickedSlot[1] === y
                    ? //  && open
                      "-translate-y-[95%]"
                    : ""
                } bg-[#C89933] ${
                  tries == level * 4 ? "translate-y-[0%]" : ""
                } z-20 relative  duration-[3000ms] h-full border border-teal-950 flex justify-center items-center`}
              >
                <button
                  className='absolute right-2 mb-4 top-[45%]'
                  onClick={() => handleClick(x, y)}
                >
                  🔘
                </button>
              </div>
              <p
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600`}
              >
                {clickedSlot && clickedSlot[0] === x && clickedSlot[1] === y
                  ? message
                  : ""}
              </p>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default GameBoard;
