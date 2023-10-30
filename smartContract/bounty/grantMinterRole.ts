import { getDefaultProvider, Wallet } from "ethers"; // ethers v5
import { Provider, TransactionResponse } from "@ethersproject/providers"; // ethers v5
import { ERC721Client } from "@imtbl/zkevm-contracts";

const CONTRACT_ADDRESS = "0x70a2E9284abec0Ed90F8Cd66C335b34eF28854b7";
const PRIVATE_KEY =
  "e5e64494b158e36e946fdd36ba78e29eb78d418c6719c095b05b4f2cc3b9376c";
const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

const grantMinterRole = async (
  provider: Provider
): Promise<TransactionResponse> => {
  // Bound contract instance
  const contract = new ERC721Client(CONTRACT_ADDRESS);
  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);

  // Give the wallet minter role access
  const populatedTransaction = await contract.populateGrantMinterRole(
    "0x509C4D93a58583A46f4B7f26637ef393F161Da12"
  );
  const result = await wallet.sendTransaction(populatedTransaction);
  return result;
};

grantMinterRole(provider);
