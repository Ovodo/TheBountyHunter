import { ethers } from "hardhat";
import { expect } from "chai";
import { ERC20, ERC20__factory } from "../typechain-types";

describe("Bounty", function () {
  let contract;

  beforeEach(async function () {
    // get owner (first account)
    const [owner] = await ethers.getSigners();

    // deploy OperatorAllowlist contract
    const OperatorAllowlist = await ethers.getContractFactory(
      "OperatorAllowlist"
    );
    const operatorAllowlist = await OperatorAllowlist.deploy(owner.address);

    // deploy ERC20 contract
    const ERC20 = await ethers.getContractFactory("Bounty");
    contract = await ERC20.deploy("Bounty", "BTY");
    await contract.deployed();

    // grant owner the minter role
  });

  it("Should be deployed with the correct arguments", async function () {
    expect(await contract.name()).to.equal("Imaginary Immutable Iguanas");
    expect(await contract.symbol()).to.equal("III");
  });
});
