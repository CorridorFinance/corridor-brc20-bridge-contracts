import hre from "hardhat";
import { ethers, formatEther, formatUnits } from "ethers";

async function main() {
  console.log("network info:", hre.network);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ethBls = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", formatEther(ethBls), "ETH");

  const deployedContract = await hre.ethers.deployContract("Brc20Token", [
    "Ordinals Oooi",
    "oooi",
    18,
    30,
    "100000000000000000",
    "0xe8bf950aab48e437b7b74c8d337519f2e08b9c5f",
  ]);

  await deployedContract.waitForDeployment();

  console.log(`Storage contract deployed to ${hre.network.config.explorer}/address/${deployedContract.target}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
