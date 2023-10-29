`use client`;

import GameBoard from "@/components/GameBoard";
import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Spin from "@/components/layout/Spin";
import useSound from "use-sound";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  reset,
  setTimer,
  setWinner,
  upLevel,
} from "@/redux/features/gameSlice";
import NotificationEvent from "@/components/alert/NotificationEvent";
import useGameSounds from "@/hooks/useGameSounds";
import Mute from "@/components/alert/Mute";
import usePassport from "@/hooks/usePassport";
import { getBalance, transferTokens } from "@/utils/contractMethods";
import { useRouter } from "next/router";

const pop = Poppins({ weight: "600", subsets: ["devanagari"] });

const Arena = () => {
  // Timer logic
  const { timer, winner, tries, level } = useAppSelector((state) => state.App);
  const dispatch = useAppDispatch();
  const [timeup, setTimeup] = useState<boolean>(false);
  const [time, setTime] = useState<number>(timer);
  const [hunterMoney, setHunterMoney] = useState<number>(0);
  const [bty, setBty] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { Main, Stop } = useGameSounds();
  const [over] = useSound("/over.mp3", { volume: 0.65 });
  const [cheer] = useSound("/cheer.mp3", { volume: 0.7 });
  const [coins] = useSound("/coins.mp3", { volume: 0.7 });
  const router = useRouter();

  const restartGame = () => {
    setIsLoading(true);
    setTimeup(false); // set timup to true
    setTimeout(() => {
      dispatch(reset());
      setIsLoading(false);
    }, 300);
    dispatch(setWinner(false));

    Stop();
    setTimeout(() => {
      Main.stop();
      Main.play();
      Main.fade(0, 1, 7000);
    }, 3000);
    formattedTime = timer.toString();
    setTime(timer);
  };

  const Claim = async () => {
    const { provider } = usePassport();

    await transferTokens(provider, hunterMoney.toString());
    const incrementRate = 10; // How much to increment by each interval
    const interval = setInterval(() => {
      setHunterMoney((prev) => {
        if (prev - incrementRate <= 0) {
          clearInterval(interval);
          return prev - incrementRate ?? 0;
        }
        // You can play a coin sound effect here as the money increases
        return prev - incrementRate;
      });
    }, 55);
    const b = await getBalance();

    const interval2 = setInterval(() => {
      setBty((prev) => {
        if (prev + incrementRate >= b) {
          clearInterval(interval2);
          return b;
        }
        // You can play a coin sound effect here as the money increases
        return prev + incrementRate;
      });
    }, 55);
  };

  useEffect(() => {
    if (time <= 0) {
      setTimeup(true); // set timup to true
      return; // Stop the countdown when it reaches 0
    }

    const timerId = setTimeout(() => {
      setTime(time - 1);
    }, 1000); // decrease every second

    if (winner) {
      clearTimeout(timerId);
    }

    return () => clearTimeout(timerId); // clear the timeout if the component is unmounted or if it re-renders
  }, [time]);

  let formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  let rewardBounty: number;

  useEffect(() => {
    if (winner) {
      switch (level) {
        case 1:
          rewardBounty = 1000; // Set your reward amount here
          break;

        case 2:
          rewardBounty = 5000; // Set your reward amount here
          break;

        default:
          0;
          break;
      }
      const incrementRate = 10; // How much to increment by each interval
      const interval = setInterval(() => {
        setHunterMoney((prev) => {
          if (prev + incrementRate >= rewardBounty) {
            clearInterval(interval);
            return rewardBounty;
          }
          // You can play a coin sound effect here as the money increases
          return prev + incrementRate;
        });
      }, 55);
      // Adjust this time to speed up or slow down the increment

      coins();
      cheer();

      dispatch(upLevel());
    }

    if ((timeup && !winner) || tries == 0) {
      over();

      setTimeout(() => {
        Stop();
      }, 6000);
    }
  }, [timeup, tries, winner]);
  React.useEffect(() => {}, [winner]);

  return (
    <Spin>
      <div className='w-screen relative h-screen bg-[#2C2C54] flex flex-col items-center justify-end'>
        <div className='absolute top-4 right-4'>
          <span className={`text-[#70F8BA] mr-4 ${pop.className}`}>
            💎: BTY {bty}
          </span>
          <span className={`text-[#70F8BA] mr-4 ${pop.className}`}>
            💼: 💲{hunterMoney}
          </span>
        </div>
        <Mute />
        <div
          className={`text-center text-[#C89933] text-2xl font-bold mb-4 mt-auto ${pop.className}`}
        >
          {time > 0 || winner ? formattedTime : "Time's Up!"}
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
                className='bg-white relative rounded-md flex items-center justify-center  w-full h-full'
                initial={{ scale: 0 }}
                animate={{ scale: 0.75, rotate: 720 * 2 }}
              >
                <p className='animate-bounce flex flex-col space-y-4 text-center text-2xl text-[#2c2c54]'>
                  Congratulations. You caught the Pirate. 🏆 <span>💲1000</span>
                  💰
                </p>
                {/* <button
                  onClick={Claim}
                  className={`px-6 absolute text-black left-2 bottom-2 active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${pop.className} py-2 rounded-md bg-[rgb(100,255,212)]`}
                >
                  {"Claim"}
                </button> */}
              </motion.div>
            </div>
          )}
          {!timeup && !isLoading && <GameBoard />}
        </div>
        <button
          onClick={() => {
            if (!winner) {
              restartGame();
            } else {
              router.push("/ready");
            }
          }}
          className={`px-6 text-black absolute hover:text-lg right-12 bottom-8 active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${pop.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
        >
          {!winner ? "Restart" : "Continue  "}
        </button>
      </div>
    </Spin>
  );
};

export default Arena;
