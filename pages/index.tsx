// `use Client`;
import { Inter } from "next/font/google";
import { Metal_Mania } from "next/font/google";
import { Poppins } from "next/font/google";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

import usePassport from "@/hooks/usePassport";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import PageLoader from "@/components/layout/PageLoader";
import {
  getData,
  mint,
  signerAddress,
  transferTokens,
} from "@/utils/contractMethods";

const inter = Inter({ subsets: ["latin"] });
const metal = Metal_Mania({ weight: "400", subsets: ["latin-ext"] });
const poppins = Poppins({ weight: "500", subsets: ["devanagari"] });

type User = {
  email: String | undefined;
  nickname: String | undefined;
};

export default function Home() {
  const [user, setUser] = React.useState<string | null>(null);
  const [address, setAddress] = React.useState<string | null>(null);
  const [selectedMenuIndex, setSelectedMenuIndex] = React.useState<number>(0);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [home, setHome] = useState<HTMLAudioElement>();
  const [enterAudio, setEnterAudio] = useState<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const menuItems = [
    "Start",
    "Options",
    "Shop",
    "Difficulty",
    "Hunter",
    "Instructions",
    "Leave",
  ];
  const route = [
    "/ready",
    "Options",
    "Shop",
    "Difficulty",
    "Hunter",
    "ins",
    "/logout",
  ];
  const router = useRouter();
  const [play] = useSound("/suspense.mp3", { volume: 0.5 });

  const Login = async () => {
    setIsLoading(true);
    const { passports, provider } = usePassport();
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    let user = await passports.getUserInfo();
    sessionStorage.setItem("name", user?.email?.split("@")[0] as string);
    setUser(sessionStorage.getItem("name"));

    sessionStorage.setItem("address", accounts[0] as string);
    setAddress(sessionStorage.getItem("address"));
    setIsLoading(false);
  };

  const Test = async () => {
    const { passports, provider } = usePassport();
    await provider.request({ method: "eth_requestAccounts" });
    const nice = await transferTokens(provider);
    console.log("nice", nice);
  };

  const Logout = async () => {
    console.log("logging out");

    sessionStorage.removeItem("name");
    sessionStorage.removeItem("address");
    const { passports, provider } = usePassport();
    await passports.logout();
  };
  console.log(user, address);

  useEffect(() => {
    setUser(sessionStorage.getItem("name"));
    setAddress(sessionStorage.getItem("address"));
  }, []);
  function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        setSelectedMenuIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
        if (audio) {
          audio.currentTime = 0;
          audio.volume = 0.5;
          audio
            .play()
            .catch((error) => console.error("Audio play failed:", error));

          setIsPlaying(true);
          audio.addEventListener("ended", () => setIsPlaying(false));
        }

        break;
      case "ArrowDown":
        setSelectedMenuIndex((prev) =>
          prev + 1 >= menuItems.length ? menuItems.length - 1 : prev + 1
        );
        if (audio) {
          audio.currentTime = 0;
          audio
            .play()
            .catch((error) => console.error("Audio play failed:", error));

          setIsPlaying(true);
          audio.addEventListener("ended", () => setIsPlaying(false));
        }
        break;
      case "Enter":
        if (enterAudio) {
          enterAudio.currentTime = 0;
          enterAudio.volume = 1;
          enterAudio
            .play()
            .catch((error) => console.error("Audio play failed:", error));

          setIsPlaying(true);
          enterAudio.addEventListener("ended", () => setIsPlaying(false));
        }
        setSelectedMenuIndex((currentSelectedIndex) => {
          handleMenuAction(currentSelectedIndex);
          return currentSelectedIndex;
        });
        break;
    }
  }

  function handleMenuAction(x: number) {
    console.log(route[x]);

    if (route[x] == "/logout") {
      Logout();
      return;
    }
    router.push(route[x]);
    play();
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMenuIndex]);
  useEffect(() => {
    let audiosToLoad = 3; // Since we have 3 audio files to load
    let loadedAudios = 0;

    function handleAudioLoaded() {
      loadedAudios++;
      if (loadedAudios === audiosToLoad) {
        setAudioLoaded(true);
      }
    }

    const audio1 = new Audio("soft.mp3");
    audio1.addEventListener("canplaythrough", handleAudioLoaded, false);

    const audio2 = new Audio("click.wav");
    audio2.addEventListener("canplaythrough", handleAudioLoaded, false);

    const audio3 = new Audio("tony.mp3");
    audio3.addEventListener("canplaythrough", handleAudioLoaded, false);

    setEnterAudio(audio1);
    setAudio(audio2);
    setHome(audio3);
  }, []);

  if (!audioLoaded) {
    return <PageLoader loading={true} />;
  }

  if (isLoading) {
    return <PageLoader loading={isLoading} />;
  }

  return (
    <Layout>
      <div className='relative overflow-hidden [background:linear-gradient(90deg,rgba(0,0,0,0.8)_1.46%,rgba(13.63,20.14,12,0.72)_13.34%,rgba(50.7,74.92,44.64,0.5)_27.53%,rgba(91.64,135.43,80.69,0.26)_50.29%,rgba(135.88,200.81,119.65,0.04)_56.65%,rgba(103.44,163.01,88.54,0.21)_63.93%,rgba(48.61,99.14,35.98,0.56)_73.16%,rgba(22.79,69.06,11.22,0.72)_83.68%)]   flex flex-row justify-between w-screen'>
        <div className='w-[25%]  h-screen relative'>
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
            Connect your passport to begin
          </p>
          <button
            // disabled={address ? true : false}
            onClick={Test}
            className={`px-6 ${user} text-black disabled:text-[rgb(174,93,46)] disabled:opacity-50 disabled:scale-100 disabled:bg-[rgb(248,255,233)] disabled:text-base  absolute hover:text-lg left-2 top-[500px] active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${metal.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
          >
            {address !== null ? "Connected" : "Connect"}
          </button>
          <p
            className={`absolute capitalize  left-7 bottom-[150px]  ${poppins.className} w-[300px]  text-[rgb(248,255,213)] text-lg  tracking-[1] leading-[normal]`}
          >
            {user ? user : "Unknown"}
          </p>
        </div>
        <img
          className='cover   absolute'
          src='/assets/images/hunter-1.png'
          alt=''
        />
        <div
          className={` flex flex-col h-screen   px-4 w-[21%] space-y-8  ${poppins.className} justify-center items-start text-lg  tracking-[1] leading-[normal]`}
        >
          {menuItems.map((item, index) => (
            <button
              key={index.toString()}
              onClick={Login}
              className={`px-6 ${
                selectedMenuIndex === index ? "highlighted" : ""
              }  active:scale-95 duration-200 hover:bg-[rgb(174,93,46)]248,255,213)] ${
                metal.className
              } py-2 rounded-md text-black bg-[rgb(248,255,213)]`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
