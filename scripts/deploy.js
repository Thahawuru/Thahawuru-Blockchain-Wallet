const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Read the private key from environment variable or hardcode it (not recommended in production)
  const privateKey = process.env.PRIVATE_KEY;

  // Connect to the network with the specified private key
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log("Deploying contracts with the account:", wallet.address);

  const balance = await wallet.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");

  // Replace "Wallet" with the actual contract name you want to deploy
  const YourContract = await ethers.getContractFactory("Wallet");
  const contract = await YourContract.deploy();

  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
