import * as dotenv from 'dotenv'
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";

const MNEMONIC = process.env.MNEMONIC;
const AMOY_RPC_URL = process.env.AMOY_RPC_URL;
const MATIC_RPC_URL = process.env.MATIC_RPC_URL;
const POLYGONSCANAPIKEY = process.env.POLYGONSCANAPIKEY;

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    hardhat: {
      chainId: 31337
    },
    polygonAmoy: {
      url: AMOY_RPC_URL !== undefined ? AMOY_RPC_URL : '',
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 80002
    },
    polygon: {
      url: MATIC_RPC_URL !== undefined ? MATIC_RPC_URL : '',
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 137
    }
  },
  etherscan: {
    apiKey: {
      polygonAmoy: POLYGONSCANAPIKEY !== undefined ? POLYGONSCANAPIKEY : '',
      polygon: POLYGONSCANAPIKEY !== undefined ? POLYGONSCANAPIKEY : '',
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com"
        }
      }
    ]
  },
};

export default config;