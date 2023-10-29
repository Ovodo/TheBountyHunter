"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSound } from "use-sound";

interface GameSoundsContextProps {
  playHome: () => void;
  stopHome: () => void;
  playSus: () => void;
  playSuss: undefined | (() => void);
  stopSus: () => void;
  stopSuss: undefined | (() => void);
  mainPlay: () => void;
  mainStop: () => void;
  playBeep: () => void;
  stopBeep: () => void;
}

const GameSoundsContext = createContext<GameSoundsContextProps>({
  playHome: () => {},
  stopHome: () => {},
  playSus: () => {},
  playSuss: () => {},
  stopSus: () => {},
  stopSuss: () => {},
  mainPlay: () => {},
  mainStop: () => {},
  playBeep: () => {},
  stopBeep: () => {},
});

export const GameSoundsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playHome, { stop: stopHome }] = useSound("/tony.mp3", { volume: 0.5 });
  const [playSus, { stop: stopSus }] = useSound("/suspense.mp3", {
    volume: 0.5,
    interrupt: true,
  });
  const [mainPlay, { stop: mainStop }] = useSound("/main.mp3", {
    volume: 0.65,
    interrupt: true,
  });
  const [playBeep, { stop: stopBeep }] = useSound("/neat_beep.mp3", {
    volume: 0.65,
  });

  useEffect(() => {
    setAudio(new Audio("suspense.mp3"));
  }, []);

  const playSuss = () => audio?.play();
  const stopSuss = () => audio?.pause();

  return (
    <GameSoundsContext.Provider
      value={{
        playHome,
        stopHome,
        playSus,
        playSuss,
        stopSus,
        stopSuss,
        mainPlay,
        mainStop,
        playBeep,
        stopBeep,
      }}
    >
      {children}
    </GameSoundsContext.Provider>
  );
};

export const useGameSounds = (): GameSoundsContextProps => {
  const context = useContext(GameSoundsContext);

  if (context === undefined) {
    throw new Error("useGameSounds must be used within a GameSoundsProvider");
  }

  return context;
};
