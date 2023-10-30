import React from "react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import useGameSounds from "../hooks/useGameSounds";
const poppins = Poppins({ weight: "500", subsets: ["devanagari"] });

const Index = () => {
  const { Tony, Stop } = useGameSounds();
  const router = useRouter();
  return (
    <div className='w-screen relative h-screen bg-[#2C2C54] flex flex-col items-center justify-center space-y-10'>
      <h3
        className={` text-3xl absolute top-[30px] left-[50%] -translate-x-1/2 tracking-wider  text-appCream ${poppins.className}`}
      >
        Instructions
      </h3>
      <button
        className={`px-6 active:scale-95 text-black duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${poppins.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
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
      <ul className='space-y-16 list-disc'>
        <li className={`${poppins.className} text-[20px] text-appCream`}>
          Use the UP and DOWN arrows to select level and menu options
        </li>
        <li className={`${poppins.className} text-[20px] text-appCream`}>
          Click on each door handle in the arena to open up a door and check for
          criminal
        </li>
        <li className={`${poppins.className} text-[20px] text-appCream`}>
          Click on the sound icon at the bottom right corner to mute and unmute
          game sounds
        </li>
      </ul>
    </div>
  );
};

export default Index;
