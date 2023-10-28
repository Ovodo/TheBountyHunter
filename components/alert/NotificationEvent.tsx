import React from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { AnimatePresence } from "framer-motion";

const pop = Poppins({ weight: "600", subsets: ["devanagari"] });
interface Props {
  title: string;
}

const NotificationEvent: React.FC<Props> = ({ title }) => {
  return (
    <AnimatePresence>
      <div
        className={`z-50 ${pop.className} absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[35vw] h-[35vw] flex items-center justify-center `}
      >
        <motion.div
          className='bg-white rounded-md flex items-center justify-center  w-full h-full'
          initial={{ scale: 0 }}
          exit={{ scale: 0, rotate: 720 }}
          animate={{ scale: 0.75, rotate: 720 * 2 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 3 }}
            className='animate-bounce text-center text-2xl text-[#2c2c54]'
          >
            {title}
          </motion.p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationEvent;
