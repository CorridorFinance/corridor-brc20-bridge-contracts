import hre from "hardhat";
import BN from "bignumber.js";
import { ethers, formatEther, formatUnits } from "ethers";

// formatUnits  1000000000000000000 => 1
// parseUnits  1 => 1000000000000000000

const E18 = ethers.parseUnits("1", 18);

async function main() {
  console.log("network info:", hre.network);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Call contracts with the account:", deployer.address);

  const ethBls = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", formatEther(ethBls), "ETH");

  const Contract = await hre.ethers.getContractFactory("Brc20Token");
  const contract = Contract.attach(hre.network.config.oooi);

  const result = await contract.mintTo(deployer.address, new BN("0.128").times(E18.toString()).toString());
  console.log("mint result:", result);

  console.log("transaction see: %s/tx/%s", hre.network.config.explorer, result.hash);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const balance = await contract.balanceOf(deployer.address);
  console.log("%s(%s) balance:", name, symbol, formatUnits(balance, decimals.valueOf()));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
