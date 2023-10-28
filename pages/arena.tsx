import GameBoard from "@/components/GameBoard";
import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Spin from "@/components/layout/Spin";
import useSound from "use-sound";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { reset, setTimer, setWinner } from "@/redux/features/gameSlice";
import NotificationEvent from "@/components/alert/NotificationEvent";

const pop = Poppins({ weight: "600", subsets: ["devanagari"] });

const Arena = () => {
  // Timer logic
  const { timer, winner, tries } = useAppSelector((state) => state.App);
  const dispatch = useAppDispatch();
  const [timeup, setTimeup] = useState<boolean>(false);
  const [play, { stop }] = useSound("/suspense.mp3", {
    volume: 0.65,
    interrupt: true,
  });
  const [mainplay, { mainstop }] = useSound("/main.mp3", {
    volume: 0.65,
    interrupt: true,
  });
  const [over] = useSound("/over.mp3", { volume: 0.65 });
  const [isLoading, setIsLoading] = useState(false);

  const restartGame = () => {
    setIsLoading(true);
    setTimeup(false); // set timup to true
    setTimeout(() => {
      dispatch(reset());
      setIsLoading(false);
    }, 300);
    dispatch(setWinner(false));

    mainplay();
    formattedTime = timer;
  };

  useEffect(() => {
    if (timer <= 0) {
      setTimeup(true); // set timup to true
      return; // Stop the countdown when it reaches 0
    }

    const timerId = setTimeout(() => {
      dispatch(setTimer(timer - 1));
    }, 1000); // decrease every second

    if (winner) {
      clearTimeout(timerId);
    }

    return () => clearTimeout(timerId); // clear the timeout if the component is unmounted or if it re-renders
  }, [timer]);

  let formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    if (timeup && !winner) {
      stop();
      over();
    }
  }, [timeup]);

  return (
    <Spin>
      <div className='w-screen relative h-screen bg-[#2C2C54] flex flex-col items-center justify-end'>
        <div
          className={`text-center text-[#C89933] text-2xl font-bold mb-4 mt-auto ${pop.className}`}
        >
          {timer > 0 || winner ? formattedTime : "Time's Up!"}
        </div>
        <div className='w-[65%] h-[90%] flex items-center justify-center'>
          {timeup && !winner && (
            <NotificationEvent title='Game Over!!!... The Capon has escaped.' />
          )}
          {tries == 0 && !winner && (
            <div
              className={`z-50 ${pop.className} absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[35vw] h-[35vw] flex items-center justify-center `}
            >
              <motion.div
                className='bg-white rounded-md flex items-center justify-center  w-full h-full'
                initial={{ scale: 0 }}
                animate={{ scale: 0.75, rotate: 720 * 2 }}
              >
                <p className='animate-bounce text-2xl text-[#2c2c54]'>
                  Game Over!!!.. Restart
                </p>
              </motion.div>
            </div>
          )}
          {winner && (
            <div
              className={`z-50 ${pop.className} absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[35vw] h-[35vw] flex items-center justify-center `}
            >
              <motion.div
                className='bg-white rounded-md flex items-center justify-center  w-full h-full'
                initial={{ scale: 0 }}
                animate={{ scale: 0.75, rotate: 720 * 2 }}
              >
                <p className='animate-bounce flex flex-col space-y-4 text-center text-2xl text-[#2c2c54]'>
                  Congratulations. You caught the Pirate. 🏆{" "}
                  <span>$10,000 reward bounty</span>
                  💰
                </p>
              </motion.div>
            </div>
          )}
          {!timeup && !isLoading && <GameBoard stops={stop} level={1} />}
        </div>
        <button
          onClick={restartGame}
          className={`px-6 absolute hover:text-lg right-12 bottom-8 active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${pop.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
        >
          Restart
        </button>
      </div>
    </Spin>
  );
};

export default Arena;
