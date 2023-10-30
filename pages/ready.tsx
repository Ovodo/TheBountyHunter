import GameBoard from "@/components/GameBoard";
import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Spin from "@/components/layout/Spin";
import useSound from "use-sound";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { reset, setLevel, setTimer, upLevel } from "@/redux/features/gameSlice";
import NotificationEvent from "@/components/alert/NotificationEvent";
import useFonts from "@/hooks/useFonts";
import { useRouter } from "next/router";
import useGameSounds from "@/hooks/useGameSounds";
import { set } from "mongoose";
import Mute from "@/components/alert/Mute";
import { baseUrl, getDetails } from "@/utils/databaseMethods";
import { UserState, newUser } from "@/redux/features/userSlice";

const pop = Poppins({ weight: "600", subsets: ["devanagari"] });
const boss = [
  { name: "Armadillo", level: 5, src: "/armadillo.jpg" },
  { name: "Vulture", level: 4, src: "/vulture.jpg" },
  { name: "Pedro", level: 3, src: "/pedro.jpg" },
  { name: "Mask", level: 2, src: "/mask.jpg" },
  { name: "Black", level: 1, src: "/roof.jpg" },
];

const Index = () => {
  const { level } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const [selectedBossIndex, setSelectedBossIndex] = useState<number>(4);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserState>();
  const router = useRouter();
  const { Move, playBeep, Tony, Stop, Write, Suspense, Main } = useGameSounds();
  // console.log("selected", selectedBossIndex, level, boss.length);

  const { metal, poppins } = useFonts();
  const readyPhrase = () => {
    switch (level) {
      case 1:
        return " Black was last seen on the roof tops, catch him and bring him in for a whooping sum of 💰 💲1000";
      case 2:
        return " Mask is a tricky fellow , bring him to the cops and recieve  💰 💲5000";
      case 3:
        return "Pedro is known to hide between nukes and crannies, but the prize of 💰 💲20000 is worth the catch";
      case 4:
        return "Vulture is known to eat his preys, going for 💰 💲50000 ";
      case 5:
        return "Armadillo the legend, going for 💰 💲100000 ";
      default:
        return "Congratulations 🎉.. go back to claim your BTY tokens and mint your NFT badge for a successful mission";
    }
  };

  // Calculate translateY percentage based on the index
  const translateYPercent = selectedBossIndex * (100 / boss.length) - 15;

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        setSelectedBossIndex((prevIndex) => {
          if (
            selectedBossIndex > 0 &&
            boss[selectedBossIndex - 1].level <= level
          ) {
            Move.play();
            console.log("upArr");
            console.log(prevIndex - 1);
            console.log("boss", boss.length - 1);
            console.log("sell", selectedBossIndex);

            return prevIndex - 1;
          } else {
            return prevIndex;
          }
        });
        break;
      case "ArrowDown":
        setSelectedBossIndex((prevIndex) => {
          if (selectedBossIndex < boss.length - 1) {
            console.log("downArr");
            Move.play();
            console.log("prev", prevIndex + 1);
            console.log("boss", boss.length - 1);
            console.log("sell", selectedBossIndex);
            return prevIndex + 1;
          } else {
            return prevIndex;
          }
        });
        break;

      case "Enter":
        Stop();
        playBeep();
        setTimeout(() => {
          Main.stop();
          Main.play();
          Main.fade(0, 1, 7000);
        }, 3000);

        setSelectedBossIndex((curr) => {
          dispatch(setLevel(boss[curr]?.level));
          return curr;
        });
        // if (level <= 5) {
        router.push("/arena");
        // } else {
        // alert("Go back to mint and claim");
        // }

        break;
    }
  }

  async function fetchDetails() {
    try {
      const response = await getDetails(
        sessionStorage.getItem("address") as string
      );
      console.log(response);
      setUserData(response.data);
      dispatch(newUser(response.data));
      dispatch(setLevel(response.data.level));

      return response;
    } catch (error) {
      console.error("Error posting address:", error);
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedBossIndex]);
  useEffect(() => {
    setTimeout(() => Write(), 500);
    Suspense.stop();
    Suspense.play();
    Suspense.fade(0, 1, 7000);

    return () => {
      Stop();
    };
  }, []);

  useEffect(() => {
    fetchDetails();
  }, []);
  useEffect(() => {
    if (level) {
      setSelectedBossIndex(boss.length - level);
    }
  }, [level]);

  return (
    <Spin>
      <div className='relative justify-between h-screen p-5 [background:linear-gradient(180deg,rgba(0,0,0,0.8)_1.46%,rgba(13.63,20.14,12,0.72)_13.34%,rgba(50.7,74.92,44.64,0.5)_27.53%,rgba(91.64,135.43,80.69,0.26)_50.29%,rgba(135.88,200.81,119.65,0.04)_56.65%,rgba(103.44,163.01,88.54,0.21)_63.93%,rgba(48.61,99.14,35.98,0.56)_73.16%,rgba(22.79,69.06,11.22,0.72)_83.68%)]   flex flex-row  w-full'>
        <Mute />
        <button
          className={`px-6 text-black  active:scale-95 absolute bottom-4 left-8 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${pop.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
          onClick={() => {
            Stop();
            router.push("/");
            Tony.stop();
            Tony.play();
            Tony.fade(0, 1, 5000);
          }}
        >
          Back
        </button>
        <h3
          className={` text-3xl absolute left-[50%] -translate-x-1/2 tracking-wider  text-appCream ${metal.className}`}
        >
          Ready ? ?
        </h3>
        <div
          className={`absolute bottom-20 left-[50%] -translate-x-1/2 ${poppins.className}`}
        >
          <div className='type-effect'>
            <motion.span
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 10, ease: "linear" }}
            >
              {readyPhrase()}
            </motion.span>
          </div>
        </div>
        <h3
          className={` text-3xl absolute animate-pulse bottom-5 left-[50%] -translate-x-1/2 tracking-wider  text-appCream ${metal.className}`}
        >
          Press the Enter key to access the Arena
        </h3>
        <div className='h-[85%] w-[40%] flex space-y-16 items-center justify-center flex-col'>
          {" "}
          <h2
            style={{
              WebkitTextStroke: "1px #000000",
              backgroundImage:
                "linear-gradient(180deg, rgb(248,255,213) 16.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
            }}
            className={`${metal.className} bg-clip-text text-[54px] text-transparent`}
          >
            Hunter
          </h2>
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: 720 }}
            className={`w-[250px] h-[250px] animate-pulse  rounded-full`}
            src='/assets/images/jing-sun.jpg'
            alt='hunter'
          />
          <h2 className={`${metal.className} text-[36px] text-appBrown`}>
            Jing-Sun
          </h2>
        </div>
        <div className='h-[95%]  relative scrollbar-hid overflow-scroll w-[40%]'>
          <div className='fixed w-full bottom-[50px] h-[15px] z-20 opacity-10   [background:linear-gradient(360deg,rgba(0,0,0,0.8)_1.46%,rgba(13.63,20.14,12,0.72)_13.34%,rgba(50.7,74.92,44.64,0.5)_27.53%,rgba(91.64,135.43,80.69,0.26)_50.29%,rgba(135.88,200.81,119.65,0.04)_56.65%,rgba(103.44,163.01,88.54,0.21)_63.93%,rgba(48.61,99.14,35.98,0.56)_73.16%,rgba(22.79,69.06,11.22,0.72)_83.68%)] ' />
          <motion.div
            className='max-h-max relative pt-[200px]'
            initial={{ translateY: "100%" }}
            animate={{ translateY: `-${translateYPercent}%` }} // Adjust translateY based on the boss's index using percentage
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 50,
              duration: 8,
            }}
          >
            {boss.map((item, i) => {
              return (
                <div
                  className={`flex  ${
                    level <= boss.length - i ? "opacity-30" : "opacity-100"
                  }  ${
                    selectedBossIndex === i
                      ? "border-4 border-appBrown p-2 opacity-90"
                      : ""
                  } items-center mb-10 justify-around space-between w-full flex-row-reverse`}
                >
                  <h2
                    className={`${metal.className} text-[36px] text-appBrown`}
                  >
                    lv {item.level}
                  </h2>
                  <motion.img
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 720 }}
                    className='w-[250px] object-cover h-[250px] rounded-full'
                    src={`/assets/images${item.src}`}
                    alt='hunter'
                  />
                  <h2
                    className={`${metal.className} text-[36px] text-appBrown`}
                  >
                    {item.name}
                  </h2>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Spin>
  );
};

export default Index;
