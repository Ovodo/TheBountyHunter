import GameBoard from "@/components/GameBoard";
import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Spin from "@/components/layout/Spin";
import useSound from "use-sound";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { reset, setTimer } from "@/redux/features/gameSlice";
import NotificationEvent from "@/components/alert/NotificationEvent";
import useFonts from "@/hooks/useFonts";
import { useRouter } from "next/router";

const pop = Poppins({ weight: "600", subsets: ["devanagari"] });

const Index = () => {
  const { timer, level } = useAppSelector((state) => state.App);
  const dispatch = useAppDispatch();
  const [timeup, setTimeup] = useState<boolean>(false);
  const [play, { stop }] = useSound("/suspense.mp3", {
    volume: 0.65,
    interrupt: true,
  });
  const [over] = useSound("/over.mp3", { volume: 0.65 });
  const [begin] = useSound("/neat_beep.mp3", { volume: 0.65 });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { metal, poppins } = useFonts();

  const boss = [
    { name: "Armadillo", src: "/armadillo.jpg" },
    { name: "Vulture", src: "/vulture.jpg" },
    { name: "Pedro", src: "/pedro.jpg" },
    { name: "Mask", src: "/mask.jpg" },
    { name: "Black", src: "/roof.jpg" },
  ];
  function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        begin();
        router.push("/arena");

        break;
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [begin]);

  return (
    <Spin>
      <div className='relative justify-between h-screen p-5 [background:linear-gradient(180deg,rgba(0,0,0,0.8)_1.46%,rgba(13.63,20.14,12,0.72)_13.34%,rgba(50.7,74.92,44.64,0.5)_27.53%,rgba(91.64,135.43,80.69,0.26)_50.29%,rgba(135.88,200.81,119.65,0.04)_56.65%,rgba(103.44,163.01,88.54,0.21)_63.93%,rgba(48.61,99.14,35.98,0.56)_73.16%,rgba(22.79,69.06,11.22,0.72)_83.68%)]   flex flex-row  w-full'>
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
              Black was last seen on the roof tops, catch him and bring him in
              for a whooping sum of 💰 💲10,0000
            </motion.span>
          </div>
        </div>
        <h3
          className={` text-3xl absolute animate-pulse bottom-5 left-[50%] -translate-x-1/2 tracking-wider  text-appCream ${metal.className}`}
        >
          Press the Enter key to access the Arena
        </h3>
        <div className='h-[85%] w-[40%] flex space-y-5 items-center justify-center flex-col'>
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
            className='w-[250px] h-[250px] rounded-full'
            src='/assets/images/jing-sun.jpg'
            alt='hunter'
          />
          <h2 className={`${metal.className} text-[36px] text-appBrown`}>
            Jing-Sun
          </h2>
        </div>
        <div className='h-[95%]  relative scrollbar-hide overflow-scroll w-[40%]'>
          <div className='fixed w-full bottom-[50px] h-[15px] z-20 opacity-10   [background:linear-gradient(360deg,rgba(0,0,0,0.8)_1.46%,rgba(13.63,20.14,12,0.72)_13.34%,rgba(50.7,74.92,44.64,0.5)_27.53%,rgba(91.64,135.43,80.69,0.26)_50.29%,rgba(135.88,200.81,119.65,0.04)_56.65%,rgba(103.44,163.01,88.54,0.21)_63.93%,rgba(48.61,99.14,35.98,0.56)_73.16%,rgba(22.79,69.06,11.22,0.72)_83.68%)] ' />
          <motion.div
            className='absolute'
            initial={{ translateY: "100%" }}
            animate={{ translateY: "-65%" }}
            transition={{
              //   type: "spring",
              //   stiffness: 50,
              //   damping: 50,
              duration: 8,
            }}
          >
            {boss.map((item, i) => {
              return (
                <div
                  className={`flex  ${
                    level !== boss.length - i ? "opacity-50" : "opacity-100"
                  } items-center mb-10 justify-around space-between w-full flex-row-reverse`}
                >
                  <h2
                    className={`${metal.className} text-[36px] text-appBrown`}
                  >
                    lv {boss.length - i}
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
