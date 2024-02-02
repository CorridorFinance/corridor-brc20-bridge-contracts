import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    b2Testnet: {
      url: `https://haven-rpc.bsquared.network`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      chainId: 1102,
      explorer: "https://haven-explorer.bsquared.network/",
      oooi: "0xD990405b7dF89D19473528d3FF2968acA77083Df",
    },
    bobTestnet: {
      url: `https://testnet.rpc.gobob.xyz/`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      chainId: 111,
      explorer: "https://testnet-explorer.gobob.xyz",
      timeout: 60 * 1000,
      oooi: "0xF0454C456dA504FaE3Ff588f0A29638615059D93",
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      explorer: "https://sepolia.etherscan.io",
      timeout: 60 * 1000,
    },
  },
};

export default config;
