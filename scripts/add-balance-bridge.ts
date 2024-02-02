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

  // const ethBls = await hre.ethers.provider.getBalance(deployer.address);
  // console.log("Account balance:", formatEther(ethBls));

  const Contract = await hre.ethers.getContractFactory("Brc20Token");
  const contract = Contract.attach(process.env.CONTRACT_ADDRESS);

  const amount = new BN(process.env.BRIDGE_AMOUNT).times(E18.toString()).toFixed(0, BN.ROUND_DOWN);
  console.log(amount);
  const result = await contract.mintTo(process.env.RECEIVER_ADDRESS, amount);
  console.log("mint result:", result);

  console.log("transaction see: %s/tx/%s", hre.network.config.explorer, result.hash);

  const name = await contract.name();
  console.log("name:", name);
  const symbol = await contract.symbol();
  console.log("symbol:", symbol);
  const decimals = await contract.decimals();
  console.log("decimals:", decimals);
  const balance = await contract.balanceOf(process.env.RECEIVER_ADDRESS);
  console.log("balance:", balance);

  console.log("%s(%s) balance:", name, symbol, formatUnits(balance, decimals.valueOf()));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
