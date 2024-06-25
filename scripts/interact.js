const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const walletAddress = "YOUR_DEPLOYED_WALLET_CONTRACT_ADDRESS";
  const Wallet = await ethers.getContractFactory("Wallet");
  const wallet = Wallet.attach(walletAddress);

  // Example interaction: Adding an identity
  await wallet.setIdentity(
    "2023-01-01",
    "ID12345",
    "John Doe",
    "Johnny",
    "1990-01-01",
    "New York",
    "Engineer",
    "123 Main St",
    "DocumentHash"
  );

  console.log("Identity added");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
