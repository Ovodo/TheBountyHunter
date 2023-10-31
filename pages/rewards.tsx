"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useFonts from "@/hooks/useFonts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { claimRewards, getDetails, mintToken } from "@/utils/databaseMethods";
import { newUser } from "@/redux/features/userSlice";
import {
  getBalance,
  getData,
  mintRandom,
  transferTokens,
} from "@/utils/contractMethods";
import useGameSounds from "@/hooks/useGameSounds";
import { useRouter } from "next/router";
import usePassport from "@/hooks/usePassport";
import NotificationEvent from "@/components/alert/NotificationEvent";
import Image from "next/image";
import BountyImage from "@/public/assets/images/bounty.jpg";

const Index = () => {
  const { metal, poppins } = useFonts();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { level, Rewards, address, Nft } = useAppSelector(
    (state) => state.User
  );
  const [balance, SetBalance] = useState<number | string>("⏳");
  const [isLoading, setIsLoading] = useState(true);
  const { Tony, Stop } = useGameSounds();
  const { provider } = usePassport();

  const fetchDetails = useCallback(async () => {
    try {
      const response = await getDetails(
        sessionStorage.getItem("address") as string
      );
      dispatch(newUser(response.data));

      console.log(response);
      // const balance = await getBalance();

      // SetBalance(balance);

      return response;
    } catch (error) {
      console.error("Error posting address:", error);
    }
  }, [dispatch]);

  const Claim = async () => {
    setIsLoading(true);

    try {
      if (Rewards == 0) {
        alert("You have no Rewards 💲 to claim");
        return;
      }

      const balance = await transferTokens(provider, Rewards.toString());
      await claimRewards(address, Rewards.toString());
      // const balance = await getBalance();

      SetBalance(balance);
    } catch (error) {
      console.log(error);
      alert(error);
    }
    setIsLoading(false);
  };

  const mintNFT = async () => {
    setIsLoading(true);
    // await getBalance(provider);
    const nftData = await mintRandom(provider);
    await mintToken(address, nftData);

    // fetchDetails();
    setIsLoading(false);
  };

  useEffect(() => {
    // fetchDetails();
    setIsLoading(false);
  }, []);
  return (
    <div className='flex w-screen bg-gradient-radial to-slate-900 via-teal-200 from-slate-500 overflow-hidden relative  h-screen items-center justify-between'>
      <div>{isLoading && <NotificationEvent title='Loading...⏳ ' />}</div>
      <div className='absolute top-4 right-4'>
        <span className={`text-[#70F8BA] mr-4 ${poppins.className}`}>
          💎: BTY {balance}
        </span>
        <span className={`text-[#70F8BA] mr-4 ${poppins.className}`}>
          💼: 💲{Rewards}
        </span>
      </div>
      <button
        className={`px-6 text-black  active:scale-95 absolute bottom-4 left-8 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${poppins.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
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
        className={` text-3xl absolute top-[30px] left-[50%] -translate-x-1/2 tracking-wider  text-appBrown ${metal.className}`}
      >
        Rewards
      </h3>
      <section className='h-[85%] w-[40%] flex space-y-16 items-center justify-center flex-col'>
        {" "}
        <h2
          style={{
            WebkitTextStroke: "1px #000000",
            backgroundImage:
              "linear-gradient(180deg, rgb(248,255,213) 16.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
          }}
          className={`${metal.className} bg-clip-text text-[54px] text-transparent`}
        >
          $BTY
        </h2>
        <div className='max-h-max max-w-max  relative items-center justify-center flex '>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 720 }}
            className={`w-[250px] h-[250px] relative animate-bounce bg-slate-500 rounded-full`}
          >
            <Image className={`rounded-full`} src={BountyImage} alt='hunter' />
          </motion.div>
        </div>
        <button
          onClick={Claim}
          className={`px-6 text-black disabled:text-[rgb(174,93,46)] disabled:opacity-50 disabled:scale-100 disabled:bg-[rgb(248,255,233)] disabled:text-base   hover:scale-110  active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${metal.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
        >
          {"Claim $BTY"}
        </button>
      </section>
      <section className='h-[85%] w-[40%] flex space-y-16 items-center justify-center flex-col'>
        {" "}
        <h2
          style={{
            WebkitTextStroke: "1px #000000",
            backgroundImage:
              "linear-gradient(180deg, rgb(248,255,213) 16.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
          }}
          className={`${metal.className} bg-clip-text text-[54px] text-transparent`}
        >
          NFT
        </h2>
        <div className='max-h-max max-w-max  relative items-center justify-center flex '>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 720 }}
            className={`w-[250px] h-[250px] items-center justify-center flex bg-slate-500 rounded-full`}
          >
            {typeof Nft?.image == "string" && (
              <Image width={250} height={250} src={Nft?.image} alt='Nft' />
            )}
          </motion.div>
          <h1
            className={`${metal.className} text-appCream text-[100px] absolute`}
          >
            ?
          </h1>
        </div>
        <button
          // disabled={level <= 5}
          onClick={mintNFT}
          className={`px-6 text-black disabled:text-[rgb(174,93,46)] disabled:opacity-30 disabled:scale-100 disabled:bg-[rgb(248,255,233)] disabled:text-base   hover:scale-110  active:scale-95 duration-200 hover:bg-[rgb(174,93,46)] hover:text-[rgb(248,255,213)] ${metal.className} py-2 rounded-md bg-[rgb(248,255,213)]`}
        >
          {level <= 5 ? "Not Enabled" : "Mint"}
        </button>
      </section>
    </div>
  );
};

export default Index;
