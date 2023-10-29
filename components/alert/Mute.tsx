import useGameSounds from "@/hooks/useGameSounds";
import React from "react";
import { Howler } from "howler";

const Mute = () => {
  const { Mute } = useGameSounds();
  return (
    <button
      className='absolute  z-50  cursor-pointer w-5 h-5 bottom-4 right-4'
      onClick={() => {
        console.log("muting");
        Mute();
      }}
    >
      {Howler.volume() === 1 ? "🔇" : "🔊"}
    </button>
  );
};

export default Mute;
