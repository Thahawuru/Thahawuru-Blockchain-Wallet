require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
