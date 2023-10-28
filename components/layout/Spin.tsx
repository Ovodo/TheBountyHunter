// components/Layout/index.js

import { motion } from "framer-motion";

const Spin = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ y: 400, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 400, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 2.5,
    }}
  >
    {children}
  </motion.div>
);
export default Spin;
