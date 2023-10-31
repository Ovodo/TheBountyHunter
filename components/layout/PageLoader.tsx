import React from "react";
import { Metal_Mania } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "postcss";
import Image from "next/image";

const metal = Metal_Mania({ weight: "400", subsets: ["latin-ext"] });

interface Props {
  loading: boolean;
}

const dotVariants = {
  start: {
    x: -170,
    opacity: 0.5,
  },
  end: {
    x: 170,
    opacity: 1,
  },
};

const PageLoader: React.FC<Props> = ({ loading }) => {
  return (
    <div className='flex w-screen bg-gradient-conic from-slate-900 via-teal-200 to-slate-500 overflow-hidden relative  h-screen items-center justify-between'>
      <div className='w-[890px]'>
        <Image
          // fill={true}
          priority
          width={900}
          height={900}
          className='object-left object-scale-down'
          src='/assets/images/roof.jpg'
          alt='loader_image'
        />
      </div>
      <div className='flex w-[35%]  h-full justify-center space-y-20 flex-col'>
        <p
          style={{
            WebkitTextStroke: "1px #000000",
            backgroundImage:
              "linear-gradient(180deg, rgb(248,255,213) 16.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
          }}
          className={`${metal.className} w-[300px] text-center self-center bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-transparent text-[84px] animate-puls tracking-[0] leading-[normal]`}
        >
          the BOUntY HUNteR
        </p>
        <div className='mx-4 h-[40px] rounded-md bg-[rgba(13.63,20.14,12,0.72)] '>
          <AnimatePresence>
            {loading && (
              <motion.div
                initial='start'
                animate='end'
                transition={{
                  duration: 1,
                  staggerChildren: 0.5,
                  delayChildren: 0.3,
                }}
                className={`w-full h-[95%] rounded-md text-center ${metal.className} bg-[rgb(248,255,233)]`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    variants={dotVariants}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className={`inline-block w-3 h-3 m-2 rounded-full bg-black`}
                  ></motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <p
            style={{
              WebkitTextStroke: "1px #000000",
              backgroundImage:
                "linear-gradient(180deg, rgb(248,255,213) 16.3%, rgb(174,93,46) 58.56%, rgb(255,236,170) 76.24%, rgb(239,255,213) 100%)",
            }}
            className={`animate-pulse ${metal.className} text-[24px] bg-clip-text mx-auto mt-3 text-center text-appBrown`}
          >
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
