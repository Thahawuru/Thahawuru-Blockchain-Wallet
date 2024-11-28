I understand, you want all of the provided steps, commands, and configurations neatly documented in a `README.md` file. Here's what it should look like:

---

# Blockchain Project Setup

This guide will help you set up the blockchain environment, run Ganache, deploy smart contracts, and configure your development environment.

## 1. Installation

Run the following command to install the required packages:

```bash
npm install --legacy-peer-deps
```

## 2. Command to Kill Existing Process on Port 7545

If there is an existing process running on port `7545`, use the following commands:

1. Find the process using port `7545`:
   ```bash
   netstat -ano | findstr :7545
   ```

2. Once you have the Process ID (PID), use this command to kill it:
   ```bash
   taskkill /PID 29628 /F
   ```

## 3. Run Blockchain and Deploy Scripts

### 3.1 Start Ganache

Run the following command to start the local Ethereum blockchain using Ganache:

```bash
ganache-cli -p 7545
```

### 3.2 Deploy Smart Contracts

Deploy your smart contracts to the local Ganache network by running:
```bash
npx hardhat run scripts/deploy.js --network ganache
```

### 3.3 Start the Server

Run this command to start your server:
```bash
npm run start-server
```

## 4. Sample `.env` File

Create a `.env` file in your project root with the following content:

```ini
PRIVATE_KEY=0xf12e95b514a138670171ddffc9282cb878a6440b6ee2c2f07972df8ca65f1aa2
GANACHE_URL=http://127.0.0.1:7545
CONTRACT_ADDRESS=0x2769ba737f7B67ecC2C196065A1F5D3A7af23208
GAS_LIMIT=1
```

### Explanation of `.env` Variables:
- `PRIVATE_KEY` - Your Ethereum private key.
- `GANACHE_URL` - The URL of your local Ganache instance.
- `CONTRACT_ADDRESS` - The address where your smart contract is deployed.
- `GAS_LIMIT` - The gas limit used for transactions.

## Conclusion

With this setup, your local blockchain environment (using Ganache) will be ready, smart contracts deployed, and your backend server running. Make sure the `.env` file is correctly configured and contains accurate information. You can now interact with the deployed smart contract using your backend server.

---

This `README.md` file includes every command and configuration step that was given in your initial message, organized and properly formatted. Let me know if there's anything more to adjust!
