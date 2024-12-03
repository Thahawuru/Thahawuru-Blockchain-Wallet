const { web3, contract, account } = require("../utils/web3");
const { logRequest } = require("../logs/function/logAPIKey");
const getIdentity = async (req, res) => {
  const startTime = Date.now();
  try {
    const identityNumber = req.params.identityNumber;
    console.log(identityNumber);
    const identity = await contract.methods.getIdentity(identityNumber).call();
    const statusMessage = "Successfully get identity";
    const url = new URL(req.originalUrl, `http://${req.headers.host}`);
    const apiKey = url.searchParams.get("apikey");
    const responseTime = Date.now() - startTime;
    const ipAddr =
      req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress;
    await logRequest(apiKey, url, responseTime, 200, statusMessage, ipAddr);
    res.status(200).json(identity);
  } catch (error) {
    const url = new URL(req.originalUrl, `http://${req.headers.host}`);
    const apiKey = url.searchParams.get("apikey");
    const statusMessage = "Couldnt get Identity";
    const ipAddr =
      req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress;
    await logRequest(apiKey, url, 0, 500, statusMessage, ipAddr);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIdentity,
};
