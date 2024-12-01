const { web3, contract, account } = require("../utils/web3");
const { logRequest } = require("../logs/function/logAPIKey");
const getLicenseByIdentityNumber = async (req, res) => {
  const startTime = Date.now();
  try {
    const identityNumber = req.params.identityNumber;
    const license = await contract.methods
      .getLicenseByIdentityNumber(identityNumber)
      .call();
    const statusMessage = "Successfully get License";
    const url = new URL(req.originalUrl, `http://${req.headers.host}`);
    const apiKey = url.searchParams.get("apikey");
    const ipAddr =
      req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress;
    const responseTime = Date.now() - startTime;
    await logRequest(apiKey, url, responseTime, 200, statusMessage, ipAddr);
    res.status(200).json(license);
  } catch (error) {
    const url = new URL(req.originalUrl, `http://${req.headers.host}`);
    const apiKey = url.searchParams.get("apikey");
    const statusMessage = "Couldnt get License";
    const ipAddr =
      req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress;
    await logRequest(apiKey, url, 0, 500, statusMessage, ipAddr);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLicenseByIdentityNumber,
};
