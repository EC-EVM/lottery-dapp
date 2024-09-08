import { task, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";

import * as dotenv from "dotenv";
dotenv.config();
const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.viem.getWalletClients();
  for (const account of accounts) {
    console.log(account.account.address);
  }
});

//const config: HardhatUserConfig = {
//  solidity: "0.8.24",
//};



const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    }
  },
  etherscan: {
    apiKey: "1N27T73S8HK43U482QKUDCATY8SS3D81CY",
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};


export default config;
