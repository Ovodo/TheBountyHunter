import { Metal_Mania } from "next/font/google";
import { Poppins } from "next/font/google";
const metal = Metal_Mania({ weight: "400", subsets: ["latin-ext"] });
const poppins = Poppins({ weight: "500", subsets: ["devanagari"] });

const useFonts = () => {
  return { metal, poppins };
};

export default useFonts;
