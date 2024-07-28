const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();
const {
  setIdentitiesToBlockchain,
  setLicensesToBlockchain,
  updateIdentityOnBlockchain,
  updateLicenseOnBlockchain,
} = require("../functions/functions");

const token = process.env.DEP_TOKEN;

const fetchNewIdentities = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    const identities = response.data;
    await setIdentitiesToBlockchain(identities);
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
  }
};

const fetchNewLicenses = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    const licenses = response.data;
    await setLicensesToBlockchain(licenses);
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
  }
};

const fetchUpdatedLicenses = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const licenses = response.data;
    await updateLicenseOnBlockchain(licenses);
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
  }
};

const fetchUpdatedIdentities = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const identities = response.data;
    await updateIdentityOnBlockchain(identities);
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
  }
};

cron.schedule("08 17 * * *", () => {
  fetchNewLicenses("http://localhost:9000/api/v1/licenses/new");
});

cron.schedule("09 17 * * *", () => {
  fetchNewIdentities("http://localhost:9000/api/v1/identities/new");
});

// cron.schedule("07 23 * * *", () => {
//   fetchUpdatedLicenses("http://localhost:9000/api/v1/licenses/updated");
// });

// cron.schedule("08 23 * * *", () => {
//   fetchUpdatedIdentities("http://localhost:9000/api/v1/identities/updated");
// });