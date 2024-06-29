const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3('http://127.0.0.1:7545');
const { abi } = require('../artifacts/contracts/Wallet.sol/Wallet.json');

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, contractAddress);

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

module.exports = { web3, contract, account };
