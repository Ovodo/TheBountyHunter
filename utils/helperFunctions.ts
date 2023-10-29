import { ethers } from "ethers";

export function hexToDecimalBigNumber(hexString: string) {
  const bigNum = ethers.BigNumber.from(hexString);
  return bigNum.toString();
}
