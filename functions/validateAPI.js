const { pool } = require("../database/db");

// Function to check if the API key exists in the database
async function checkApiKeyExists(apiKey) {
  try {
    const res = await pool.query("SELECT 1 FROM api_keys WHERE api_key = $1", [
      apiKey,
    ]);
    return res.rowCount > 0;
  } catch (err) {
    console.error("Error checking if API key exists:", err.message);
    throw err;
  }
}

// Function to check if the API key exists with the correct data type (apiData_Type)
async function checkApiKeyAndTypeExists(apiKey, apiDataType) {
  try {
    const res = await pool.query(
      "SELECT apidata_type FROM api_keys WHERE api_key = $1",
      [apiKey]
    );
    if (res.rowCount > 0) {
      return res.rows[0].apidata_type >= apiDataType;
    }
    return false;
  } catch (err) {
    console.error("Error checking if API key and type exist:", err.message);
    throw err;
  }
}

// Function to validate the API key and check its type
async function validateApiKey(apiKey, apiDataType) {
  try {
    const keyExists = await checkApiKeyExists(apiKey);
    if (!keyExists) {
      return { valid: false, message: "API Key does not exist" };
    }

    const keyAndTypeExists = await checkApiKeyAndTypeExists(
      apiKey,
      apiDataType
    );
    console.log("KEY", keyAndTypeExists);
    if (!keyAndTypeExists) {
      return {
        valid: false,
        message: "API Key exists but type does not match",
      };
    }

    return { valid: true, message: "API Key is valid" };
  } catch (err) {
    console.error("Error during API key validation:", err.message);
    throw err;
  }
}

module.exports = {
  validateApiKey,
};
