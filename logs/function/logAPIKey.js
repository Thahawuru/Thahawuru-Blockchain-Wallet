const Log = require('../model/logSchema');
const logRequest = async (apiKey, route, responseTime, statusCode, statusMessage,ipAddress) => {
  try {
    const logEntry = new Log({
      apiKey,
      route,
      responseTime,
      statusCode,
      statusMessage,
      ipAddress
    });
    await logEntry.save();
    console.log('Log entry saved successfully');
  } catch (err) {
    console.error('Error logging request:', err.message);
  }
};

module.exports = {
  logRequest,
};
