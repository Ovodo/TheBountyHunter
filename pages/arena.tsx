import GameBoard from "@/components/GameBoard";
import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const pop = Poppins({ weight: "600", subsets: ["devanagari"] });

const Arena = () => {
  // Timer logic
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [timeup, setTimeup] = useState<boolean>(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setTimeup(!timeup); // set timup to true
      return; // Stop the countdown when it reaches 0
    }

    const timerId = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000); // decrease every second

    return () => clearTimeout(timerId); // clear the timeout if the component is unmounted or if it re-renders
  }, [secondsLeft]);

  const formattedTime = `${Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0")}:${(secondsLeft % 60).toString().padStart(2, "0")}`;

  return (
    <div className='w-screen relative h-screen bg-[#2C2C54] flex flex-col items-center justify-end'>
      <div
        className={`text-center text-[#C89933] text-2xl font-bold mb-4 mt-auto ${pop.className}`}
      >
        {secondsLeft > 0 ? formattedTime : "Time's Up!"}
      </div>
      <div className='w-[65%] h-[90%] flex items-center justify-center'>
        {timeup && (
          <div
            className={`z-50 ${pop.className} absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[35vw] h-[35vw] flex items-center justify-center `}
          >
            <motion.div
              className='bg-white rounded-md flex items-center justify-center  w-full h-full'
              initial={{ scale: 0 }}
              animate={{ scale: 0.75, rotate: 720 * 2 }}
            >
              <p className='animate-bounce text-center text-2xl text-[#2c2c54]'>
                Game Over!!!... The Capon has escaped.
              </p>
            </motion.div>
          </div>
        )}
        {!timeup && <GameBoard level={1} />}
      </div>
      <button
        onClick={() => window.location.reload()}
        className={`px-6 absolute hover:text-lg right-12 bottom-8 active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${pop.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
      >
        Restart
      </button>
    </div>
  );
};

export default Arena;
