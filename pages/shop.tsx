import Spin from "@/components/layout/Spin";
import useFonts from "@/hooks/useFonts";
import useGameSounds from "@/hooks/useGameSounds";
import { useRouter } from "next/router";
import React from "react";

const { metal, poppins } = useFonts();

const Index = () => {
  const { Tony, Stop } = useGameSounds();
  const router = useRouter();
  return (
    <Spin>
      <div className='w-screen relative h-screen bg-[#2C2C54] flex flex-col items-center justify-center'>
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
        <h1 className={`${metal.className} text-[100px] text-appBrown`}>
          Coming Soon!!
        </h1>
      </div>
    </Spin>
  );
};

export default Index;
