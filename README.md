## Run Blockchain and deploy scripts
 
 ganache-cli -p 7545

 npx hardhat run scripts/deploy.js --network ganache

## CMD for kill process

netstat -ano | findstr :7545

taskkill /PID 29628 /F


## Sample .env

PRIVATE_KEY = 0xf12e95b514a138670171ddffc9282cb878a6440b6ee2c2f07972df8ca65f1aa2

GANACHE_URL=http://127.0.0.1:7545

CONTRACT_ADDRESS=0x2769ba737f7B67ecC2C196065A1F5D3A7af23208

GAS_LIMIT=1
