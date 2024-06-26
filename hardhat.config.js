require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [
        "0x649ff52003eba23cfbe700f6c2a07c68b2a78d5faa98a92866ac6fc202ad5aab",
        "0x57aec85fb245400998dc896c65b2e7459a91812bb0f1051902d2901b3abd4941",
      ],
    },
  },
};
