import { passport } from "@imtbl/sdk";
import { baseConfig } from "../passport.config";
import { ethers } from "ethers";
import { config as immutableConfig, blockchainData } from "@imtbl/sdk";
import { RewardNft } from "@/types/ethers-contracts/RewardNft";
import { BTY } from "@/types/ethers-contracts/BTY";
import { RewardNft__factory } from "@/types/ethers-contracts/factories/RewardNft__factory";
import { BTY__factory } from "@/types/ethers-contracts/factories/BTY__factory";
import { Provider } from "@/types/Provider";
import { hexToDecimalBigNumber } from "./helperFunctions";
import { MyERC721, MyERC721__factory } from "@/types/ethers-contracts";
import usePassport from "@/hooks/usePassport";

const CONTRACT_ADDRESS = "0xC567F9776545b4Cc8634d91E146E264712d96E49"; // The address of the deployed collection contract
const CONTRACT_ADDRESS2 = "0x70a2E9284abec0Ed90F8Cd66C335b34eF28854b7"; // The address of the deployed collection contract
const ERC20_CONTRACT = "0x90c55d3c06Df183CA3DAbb30f9E744bE60628FB8";
const TOKEN_ID = "2";
const config: blockchainData.BlockchainDataModuleConfiguration = {
  baseConfig: new immutableConfig.ImmutableConfiguration({
    environment: immutableConfig.Environment.SANDBOX,
  }),
};
const client = new blockchainData.BlockchainData(config);

export async function getData() {
  try {
    const response = await client.getNFT({
      chainName: "imtbl-zkevm-testnet",
      contractAddress: CONTRACT_ADDRESS,
      tokenId: TOKEN_ID,
    });

    console.log(response.result);
    return response.result;
  } catch (error) {
    console.error(error);
  }
}

export const getBalance = async (): Promise<number> => {
  const { provider } = usePassport();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const providers = new ethers.providers.Web3Provider(provider);
  const signer = providers.getSigner();
  const userAddress = await signer.getAddress();

  // // Create a new instance of the contract
  const contract: BTY = BTY__factory.connect(ERC20_CONTRACT, signer);
  const balance = await contract.balanceOf(userAddress);
  const balance2 = hexToDecimalBigNumber(balance._hex);
  const ball = parseInt(balance2) / 10 ** 18;
  console.log("Contract Bals", ball);

  return ball;
};

export const transferTokens = async (provider: Provider, amount: string) => {
  await provider.request({
    method: "eth_requestAccounts",
  });
  const providers = new ethers.providers.Web3Provider(provider);
  const signer = providers.getSigner();
  const userAddress = await signer.getAddress();

  // // Create a new instance of the contract
  const contract: BTY = BTY__factory.connect(ERC20_CONTRACT, signer);
  const amountToSend = ethers.utils.parseUnits(amount, 18); // Again, assuming 18 decimals
  try {
    const trans = await contract.withdrawTokens(userAddress, amountToSend);
    console.log("trans", trans);
  } catch (error) {
    alert("Try disabling Pop up blocker");
  }
  const balance = await contract.balanceOf(userAddress);
  const balance2 = hexToDecimalBigNumber(balance._hex);
  console.log(parseInt(balance2) / 10 ** 18);
};

export const mint = async (token_id: number, provider: Provider) => {
  const providers = new ethers.providers.Web3Provider(provider);
  const signer = providers.getSigner();
  const userAddress = await signer.getAddress();
  console.log("address", userAddress);

  const contract: RewardNft = RewardNft__factory.connect(
    CONTRACT_ADDRESS,
    signer
  );

  const overrides: ethers.PayableOverrides = {
    gasLimit: ethers.utils.hexlify(200000), // adjust this value as needed
  };

  const hash = await contract.primarySale(token_id);
  await hash.wait();
  console.log(hash);
};
