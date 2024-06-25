import { ethers } from "hardhat";

async function main() {
    const Wallet = await ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy();
  
    await wallet.deployed();
    console.log("Wallet contract deployed to:", wallet.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  