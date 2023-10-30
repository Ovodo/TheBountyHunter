// `use Client`;
import React, { useEffect, useState } from "react";
import usePassport from "@/hooks/usePassport";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import PageLoader from "@/components/layout/PageLoader";
import {
  getData,
  mint,
  getBalance,
  transferTokens,
} from "@/utils/contractMethods";
import useGameSounds from "@/hooks/useGameSounds";
import Mute from "@/components/alert/Mute";
import { postAddress } from "@/utils/databaseMethods";
import useFonts from "@/hooks/useFonts";

const { metal, poppins } = useFonts();
const menuItems = [
  "Start",
  "Hunter",
  "Shop",
  "Instructions",
  "Rewards",
  "Instructions",
  "Leave",
];

export default function Home() {
  const [user, setUser] = React.useState<string | null>(null);
  const [address, setAddress] = React.useState<string | null>(null);
  const [selectedMenuIndex, setSelectedMenuIndex] = React.useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { Stop, Move, Crash } = useGameSounds();
  const router = useRouter();

  const Login = async () => {
    setIsLoading(true);
    console.log("tesst");

    const { passports, provider } = usePassport();
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    let user = await passports.getUserInfo();
    sessionStorage.setItem("name", user?.email?.split("@")[0] as string);
    setUser(sessionStorage.getItem("name"));

    sessionStorage.setItem("address", accounts[0] as string);
    setAddress(sessionStorage.getItem("address"));
    try {
      const response = await postAddress(accounts[0] as string);
      console.log(response);
    } catch (error) {
      console.error("Error posting address:", error);
    }
    setIsLoading(false);
  };

  const Logout = async () => {
    console.log("logging out");

    sessionStorage.removeItem("name");
    sessionStorage.removeItem("address");
    const { passports, provider } = usePassport();
    await passports.logout();
  };

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        setSelectedMenuIndex((prev) => {
          if (prev - 1 < 0) {
            return 0;
          } else {
            Move.play();
            return prev - 1;
          }
        });
        break;
      case "ArrowDown":
        setSelectedMenuIndex((prev) => {
          if (prev + 1 >= menuItems.length) {
            return menuItems.length - 1;
          } else {
            Move.play();
            return prev + 1;
          }
        });
        break;
      case "Enter":
        Stop();
        Crash.play();
        setSelectedMenuIndex((currentSelectedIndex) => {
          handleMenuAction(currentSelectedIndex);
          return currentSelectedIndex;
        });
        break;
    }
  }

  function handleMenuAction(x: number) {
    let routeToNavigate = menuItems[x].toLowerCase();
    if (routeToNavigate === "start") {
      routeToNavigate = "/ready";
    } else if (routeToNavigate === "leave") {
      Logout();
      routeToNavigate = "/logout";
    }
    router.push(routeToNavigate);
    // playSus();
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMenuIndex]);

  useEffect(() => {
    setUser(sessionStorage.getItem("name"));
    setAddress(sessionStorage.getItem("address"));
  }, []);
  if (isLoading) {
    return <PageLoader loading={isLoading} />;
  }
  return (
    <Layout>
      <div className='relative overflow-hidden [background:linear-gradient(90deg,rgba(0,0,0,0.8)_1.46%,rgba(13.63,20.14,12,0.72)_13.34%,rgba(50.7,74.92,44.64,0.5)_27.53%,rgba(91.64,135.43,80.69,0.26)_50.29%,rgba(135.88,200.81,119.65,0.04)_56.65%,rgba(103.44,163.01,88.54,0.21)_63.93%,rgba(48.61,99.14,35.98,0.56)_73.16%,rgba(22.79,69.06,11.22,0.72)_83.68%)]   flex flex-row justify-between w-screen'>
        <Mute />
        <div className='w-[25%] ml-4 h-screen space-y-16 relative'>
          <p
            style={{
              WebkitTextStroke: "1px #000000",
              backgroundImage:
                "linear-gradient(180deg, rgb(248,255,213) 16.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
            }}
            className={` ${metal.className} w-[300px] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-transparent text-[84px] animate-puls tracking-[0] leading-[normal]`}
          >
            the BOUntY HUNteR
          </p>
          <p
            style={{
              WebkitTextStroke: "1px #000000",
              backgroundImage:
                "linear-gradient(180deg, rgb(248,255,213) 86.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
            }}
            className={`animate-bounce ${address !== null ? "hidden" : ""} ${
              metal.className
            } w-[300px] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-transparent text-[20px]  tracking-[0] leading-[normal]`}
          >
            Connect your passport to begin
          </p>
          <button
            disabled={address ? true : false}
            onClick={Login}
            className={`px-6 ${user} text-black disabled:text-[rgb(174,93,46)] disabled:opacity-50 disabled:scale-100 disabled:bg-[rgb(248,255,233)] disabled:text-base   hover:scale-110  active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${metal.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
          >
            {address !== null ? "Connected" : "Connect"}
          </button>
          <p
            className={`capitalize   ${poppins.className} w-[300px]  text-[rgb(248,255,213)] text-lg  tracking-[1] leading-[normal]`}
          >
            {user ? user : ""}
          </p>
        </div>
        <img
          className='cover  -z-[5] absolute'
          src='/assets/images/hunter-1.png'
          alt=''
        />
        <div
          className={`flex flex-col h-screen z-20  px-4 w-[20%] space-y-10 pt-8  ${poppins.className} justify-start items-center text-lg  tracking-[1] leading-[normal]`}
        >
          {menuItems.map((item, index) => (
            <button
              disabled={item === "Shop" || item === "Hunter" ? true : false}
              key={index.toString()}
              onMouseEnter={() => {
                setSelectedMenuIndex(index);
                Move.play();
              }}
              onClick={() => {
                handleMenuAction(index);
                Stop();
                Crash.play();
              }}
              className={`px-6 ${
                selectedMenuIndex === index ? "highlighted" : ""
              }  active:scale-95 duration-200 hover:scale-110 ${
                metal.className
              } py-2 rounded-md disabled:opacity-30 text-black bg-[rgb(248,255,213)]`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
