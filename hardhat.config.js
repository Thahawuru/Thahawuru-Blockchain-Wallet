require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
