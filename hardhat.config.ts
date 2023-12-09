import { HardhatUserConfig } from "hardhat/config";
import { config as dotConfig } from "dotenv"
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"
dotConfig()

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/ZPG4ZM3lIzQubp0v9-kGBtiRcLJ2oX2L",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: true
  },
  etherscan: {
    apiKey: {
      scrollSepolia: process.env.SCROLL_API!,
      polygonMumbai: process.env.POLYGON_API!
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
    ],
  },
  sourcify: {
    enabled: true
  }
};

export default config;