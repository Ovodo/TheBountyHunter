import React from "react";
import { useSound } from "use-sound";
import { Howl, Howler } from "howler";

const useGameSounds = () => {
  const [playHome, { stopHome }] = useSound("/tony.mp3", { volume: 0.5 });
  let [playSus, data] = useSound("/suspense.mp3", {
    volume: 1,
    interrupt: true,
  });
  const [mainPlay, { mainStop }] = useSound("/main.mp3", {
    volume: 0.65,
    interrupt: true,
  });
  const [playBeep] = useSound("/neat_beep.mp3", { volume: 0.65 });
  const [Write] = useSound("/write.mp3", { volume: 0.65, playbackRate: 1.86 });

  var Suspense = new Howl({
    src: ["suspense.mp3"],
  });

  const Move = new Howl({ src: ["click.wav"], volume: 0.5 });
  const Tony = new Howl({ src: ["tony.mp3"], volume: 0.6 });
  const Crash = new Howl({ src: ["soft.mp3"], volume: 0.75 });
  const Main = new Howl({ src: ["main.mp3"], volume: 1 });

  const Stop = () => Howler.stop();

  const Mute = () => {
    if (Howler.volume() == 0) {
      Howler.volume(1);
    } else {
      Howler.volume(0);
    }
  };

  return {
    Mute,
    Main,
    Write,
    Stop,
    Tony,
    Crash,
    Suspense,
    Move,
    playSus,
    mainPlay,
    mainStop,
    playBeep,
  };
};

export default useGameSounds;
