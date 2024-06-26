### ganache-cli -p 7545

### npx hardhat run scripts/deploy.js --network ganache

## CMD for kill process

netstat -ano | findstr :7545

taskkill /PID 29628 /F
