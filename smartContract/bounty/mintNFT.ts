import { getDefaultProvider, Wallet } from "ethers"; // ethers v5
import { Provider, TransactionResponse } from "@ethersproject/providers"; // ethers v5
import { ERC721MintByIDClient } from "@imtbl/zkevm-contracts";

const CONTRACT_ADDRESS = "0x70a2E9284abec0Ed90F8Cd66C335b34eF28854b7";
const PRIVATE_KEY =
  "6cdaf7bb77c007f441796d66f881c0e3739bc7979a0fc86a5dd3c627ace9d378";

// Specify who we want to receive the minted token
const RECIPIENT = "0x509C4D93a58583A46f4B7f26637ef393F161Da12";

// Choose an ID for the new token
const TOKEN_ID = 2;

const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

const mint = async (provider: Provider): Promise<TransactionResponse> => {
  // Bound contract instance
  const contract = new ERC721MintByIDClient(CONTRACT_ADDRESS);
  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);
  // We can use the read function hasRole to check if the intended signer
  // has sufficient permissions to mint before we send the transaction
  const minterRole = await contract.MINTER_ROLE(provider);
  const hasMinterRole = await contract.hasRole(
    provider,
    minterRole,
    wallet.address
  );

  if (!hasMinterRole) {
    // Handle scenario without permissions...
    console.log("Account doesnt have permissions to mint.");
    return Promise.reject(
      new Error("Account doesnt have permissions to mint.")
    );
  }

  // Rather than be executed directly, contract write functions on the SDK client are returned
  // as populated transactions so that users can implement their own transaction signing logic.
  const populatedTransaction = await contract.populateMint(RECIPIENT, TOKEN_ID);
  const result = await wallet.sendTransaction(populatedTransaction);
  console.log(result); // To get the TransactionResponse value
  return result;
};

mint(provider);
