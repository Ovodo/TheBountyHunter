import { Inter } from "next/font/google";
import { Metal_Mania } from "next/font/google";
import { Poppins } from "next/font/google";
import React, { useEffect, useState } from "react";
import usePassport from "@/hooks/usePassport";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import useGameSounds from "@/hooks/useGameSounds";

const inter = Inter({ subsets: ["latin"] });
const metal = Metal_Mania({ weight: "400", subsets: ["latin-ext"] });
const poppins = Poppins({ weight: "500", subsets: ["devanagari"] });

type User = {
  email: String | undefined;
  nickname: String | undefined;
};

export default function Index() {
  const [user, setUser] = React.useState<string | null>(null);
  const [address, setAddress] = React.useState<string | null>(null);
  const [selectedMenuIndex, setSelectedMenuIndex] = React.useState<number>(0);
  const [enterAudio, setEnterAudio] = useState<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);

  const menuItems = ["Start", "Options", "Shop", "Difficulty", "Hunter"];
  const route = ["/arena", "Options", "Shop", "Difficulty", "Hunter"];
  const router = useRouter();
  const { Tony } = useGameSounds();

  const Login = async () => {
    Tony.play();
    router.push("/");
  };

  React.useEffect(() => {
    setEnterAudio(new Audio("soft.mp3"));
  }, []);

  return (
    <Layout>
      <div className='relative [background:linear-gradient(90deg,rgba(0,0,0,0.8)_1.46%,rgba(13.63,20.14,12,0.72)_13.34%,rgba(50.7,74.92,44.64,0.5)_27.53%,rgba(91.64,135.43,80.69,0.26)_50.29%,rgba(135.88,200.81,119.65,0.04)_56.65%,rgba(103.44,163.01,88.54,0.21)_63.93%,rgba(48.61,99.14,35.98,0.56)_73.16%,rgba(22.79,69.06,11.22,0.72)_83.68%)]   flex flex-row justify-center w-full'>
        <div className='flex overflow-hidden items-center justify-center  h-screen'>
          <img className='cover' src='/assets/images/two.jpg' alt='' />
          <p
            style={{
              WebkitTextStroke: "1px #000000",
              backgroundImage:
                "linear-gradient(180deg, rgb(248,255,213) 16.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
            }}
            className={`absolute left-2 top-6 ${metal.className} w-[300px]    bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-transparent text-[84px] animate-puls tracking-[0] leading-[normal]`}
          >
            the BOUntY HUNteR
          </p>
          <p
            style={{
              WebkitTextStroke: "1px #000000",
              backgroundImage:
                "linear-gradient(180deg, rgb(248,255,213) 86.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
            }}
            className={`absolute left-2 top-[400px] animate-bounce ${metal.className} w-[300px] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-transparent text-[20px]  tracking-[0] leading-[normal]`}
          >
            {/* Connect your passport to begin */}
          </p>
          <button
            disabled={address ? true : false}
            onClick={Login}
            className={`px-6 ${user} text-black disabled:text-[rgb(174,93,46)] disabled:opacity-50 disabled:scale-100 disabled:bg-[rgb(248,255,233)] disabled:text-base  absolute hover:text-lg left-2 top-[500px] active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${metal.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
          >
            {"Home"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
