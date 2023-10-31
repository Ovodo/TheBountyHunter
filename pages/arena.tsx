import GameBoard from "@/components/GameBoard";
import React, { useState, useEffect, useCallback } from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Spin from "@/components/layout/Spin";
import useSound from "use-sound";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTries, setWinner } from "@/redux/features/gameSlice";
import NotificationEvent from "@/components/alert/NotificationEvent";
import useGameSounds from "@/hooks/useGameSounds";
import Mute from "@/components/alert/Mute";
import { useRouter } from "next/router";
import { levelUp } from "@/utils/databaseMethods";

const pop = Poppins({ weight: "600", subsets: ["devanagari"] });

const Arena = () => {
  // Timer logic
  const { timer, winner, tries, stage } = useAppSelector((state) => state.App);
  const { level, Rewards } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const [timeup, setTimeup] = useState<boolean>(false);
  const [time, setTime] = useState<number>(timer);
  const [hunterMoney, setHunterMoney] = useState<number>(Rewards);
  const [bty, setBty] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { Main, Stop, Tony } = useGameSounds();
  const [over] = useSound("/over.mp3", { volume: 0.65 });

  const router = useRouter();

  const restartGame = () => {
    setIsLoading(true);
    setTimeup(false); // set timup to true
    setTimeout(() => {
      dispatch(setTries());
      dispatch(setWinner(false));
      setIsLoading(false);
    }, 300);

    Stop();
    setTimeout(() => {
      Main.stop();
      Main.play();
      Main.fade(0, 1, 7000);
    }, 3000);
    formattedTime = timer.toString();
    setTime(timer);
  };
  const nextLvl = () => {
    setIsLoading(true);
    setTimeup(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    dispatch(setWinner(false));
    router.push("/ready");

    Stop();
  };

  const advanceLvl = useCallback(async () => {
    if (level > stage) {
      console.log("Already passed this level");

      return;
    }
    try {
      const response = await levelUp(
        sessionStorage.getItem("address") as string
      );
      console.log(response);

      return response;
    } catch (error) {
      console.error("Error advancing level:", error);
    }
  }, [level, stage]);
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
  }, [time, winner]);

  let formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    let rewardBounty: number = 0;

    let incrementRate: number;

    switch (stage) {
      case 1:
        rewardBounty = 1000; // Set your reward amount here
        incrementRate = 10;
        break;

      case 2:
        rewardBounty = 5000; // Set your reward amount here
        incrementRate = 50;
        break;
      case 3:
        rewardBounty = 20000; // Set your reward amount here
        incrementRate = 200;
        break;
      case 4:
        rewardBounty = 50000; // Set your reward amount here
        incrementRate = 500;
        break;
      case 5:
        rewardBounty = 100000; // Set your reward amount here
        incrementRate = 100;
        break;

      default:
        0;
        break;
    }
    if (winner) {
      const interval = setInterval(() => {
        setHunterMoney((prev) => {
          if (prev + incrementRate >= rewardBounty + Rewards) {
            clearInterval(interval);
            return rewardBounty + Rewards;
          }
          return prev + incrementRate;
        });
      }, 55);
      advanceLvl();
    }

    if ((timeup && !winner) || tries == 0) {
      over();

      setTimeout(() => {
        Stop();
      }, 6000);
    }
  }, [timeup, tries, winner, Rewards]);

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
        <div className='absolute space-x-10 left-6 bottom-8'>
          {/* <button
            className={`px-6 active:scale-95 text-black duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${pop.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
            // onClick={giveHint}
          >
            Hint
          </button> */}
          <button
            className={`px-6 active:scale-95 text-black duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${pop.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
            onClick={() => {
              router.push("/");
              Stop();
              Tony.stop();
              Tony.play();
              Tony.fade(0, 1, 5000);
            }}
          >
            Back
          </button>
        </div>
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
                  Congratulations. You caught the Pirate. 🏆{" "}
                  <span>💲{hunterMoney}</span>
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
              nextLvl();
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
