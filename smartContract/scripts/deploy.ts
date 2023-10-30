import { ethers } from "hardhat";
import {
  ERC20,
  ERC20__factory,
  MyERC721,
  MyERC721__factory,
} from "../typechain-types";

async function deploy() {
  // get deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // check account balance
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance())
  );

  const operatorAllowlist = process.env.OPERATOR_ALLOWLIST;
  if (operatorAllowlist === undefined) {
    throw new Error("Please set your OPERATOR_ALLOWLIST in a .env file");
  }

  // deploy MyERC721 contract
  const factory: MyERC721__factory = await ethers.getContractFactory(
    "RewardNft"
  );
  const contract: MyERC721 = await factory.connect(deployer).deploy(
    deployer.address, // owner
    "The Bounty Hunter Collection", // name
    "BTY", // symbol
    "https://magenta-quiet-pike-706.mypinata.cloud/ipfs/QmTePPF2EXwmh4gUrMeDQy7N6wigown4y5Cv9cYKVqRijd", // baseURI
    "https://magenta-quiet-pike-706.mypinata.cloud/ipfs/QmQGYJLgdjyk3ydFAa15H12AnYjRXKYZ2N9DoGYYEkcyai", // contractURI
    operatorAllowlist, // operator allowlist
    deployer.address, // royalty recipient
    ethers.BigNumber.from("2000") // fee numerator
  );
  await contract.deployed();

  // log deployed contract address
  console.log(`MyERC721 contract deployed to ${contract.address}`);

  // //deploy In game currencies contract
  // const factory2: ERC20__factory = await ethers.getContractFactory("BTY");
  // const contract2: ERC20 = await factory2
  //   .connect(deployer)
  //   .deploy("Bounty", "BTY");

  // await contract2.deployed();
  // console.log(`Bounty contract deployed to ${contract2.address}`);

  // log deployed contract2 address
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
