const { validateApiKey } = require('../functions/validateAPI');

const validateApiKeyMiddleware = (apiDataType) => async (req, res, next) => {
  try {
    const apiKey = req.query.apikey;
    if (!apiKey) {
      return res.status(400).json({ message: 'API key is required' });
    }

    const { valid, message } = await validateApiKey(apiKey, apiDataType);
    if (!valid) {
      return res.status(403).json({ message });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {validateApiKeyMiddleware};
