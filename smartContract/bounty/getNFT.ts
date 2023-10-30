import { config as immutableConfig, blockchainData } from "@imtbl/sdk";

const CONTRACT_ADDRESS = "0x70a2E9284abec0Ed90F8Cd66C335b34eF28854b7"; // The address of the deployed collection contract
const TOKEN_ID = "2"; // The ID of the minted token

const config: blockchainData.BlockchainDataModuleConfiguration = {
  baseConfig: new immutableConfig.ImmutableConfiguration({
    environment: immutableConfig.Environment.SANDBOX,
  }),
};

const client = new blockchainData.BlockchainData(config);

async function getData() {
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

getData();
