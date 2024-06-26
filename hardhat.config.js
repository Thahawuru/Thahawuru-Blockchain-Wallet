require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://rpc-sepolia.sepolia.io`,
      accounts: [`0x${process.env.SE_POLIA_PRIVATE_KEY}`],
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
