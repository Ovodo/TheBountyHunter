import { config as immutableConfig, blockchainData } from "@imtbl/sdk";
import { ERC721MintByIDClient } from "@imtbl/zkevm-contracts";
import usePassport from "./usePassport";

const CONTRACT_ADDRESS = "0x70a2E9284abec0Ed90F8Cd66C335b34eF28854b7"; // The address of the deployed collection contract
const TOKEN_ID = "1"; // The ID of the minted token

const contract = new ERC721MintByIDClient(CONTRACT_ADDRESS);

const useToken = async () => {
  const { passport, provider, address } = usePassport();
  // Give the wallet minter role access
  const populatedTransaction = await contract.populateGrantMinterRole(address);

  const nftS = getData();
  return {};
};

export default useToken;
