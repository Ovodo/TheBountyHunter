import { ethers } from "ethers";

export function hexToDecimalBigNumber(hexString: string) {
  const bigNum = ethers.BigNumber.from(hexString);
  return bigNum.toString();
}

// Example Usage:
const hex = "0x1a";
console.log(hexToDecimalBigNumber(hex)); // Outputs: 26
