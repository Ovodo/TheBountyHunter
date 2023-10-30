import { config as immutableConfig, blockchainData } from "@imtbl/sdk";

const CONTRACT_ADDRESS = "0x70a2E9284abec0Ed90F8Cd66C335b34eF28854b7"; // The address of the contract you deployed

const config: blockchainData.BlockchainDataModuleConfiguration = {
  baseConfig: new immutableConfig.ImmutableConfiguration({
    environment: immutableConfig.Environment.SANDBOX,
  }),
};

const client = new blockchainData.BlockchainData(config);

async function getData() {
  try {
    const response = await client.listActivities({
      chainName: "imtbl-zkevm-testnet",
      contractAddress: CONTRACT_ADDRESS,
    });

    for (const result in response.result) {
      console.log(result);
    }
    return response.result;
  } catch (error) {
    console.error(error);
  }
}

getData();
