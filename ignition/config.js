module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network id
        },
        testnet: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "4", // Rinkeby test network
        },
    },
    compilers: {
        solc: {
            version: "0.8.24", // Fetch exact version from solc-bin (default: truffle's version)
        },
    },
};
