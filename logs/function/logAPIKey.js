const Log = require('../model/logSchema');
const logRequest = async (apiKey, route, responseTime, statusCode, statusMessage) => {
  try {
    const logEntry = new Log({
      apiKey,
      route,
      responseTime,
      statusCode,
      statusMessage,
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
