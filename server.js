const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");
const { setIdentitiesToBlockchain, setLicensesToBlockchain } = require("./functions/functions");

const identityRoutes = require("./routes/identityRoutes");
const licenseRoutes = require("./routes/licenseRoutes");

const app = express();
const port = 3010;

app.use(bodyParser.json());

app.use("/api/identity", identityRoutes);
app.use("/api/license", licenseRoutes);

async function fetchDataAndSetToBlockchain() {
  const token = process.env.DEP_TOKEN;

  try {
    const [identityResponse, licenseResponse] = await Promise.all([
      axios.get("http://localhost:9000/api/v1/identities/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get("http://localhost:9000/api/v1/licenses/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const identities = identityResponse.data;
    const licenses = licenseResponse.data;

    await setIdentitiesToBlockchain(identities);
    await setLicensesToBlockchain(licenses);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await fetchDataAndSetToBlockchain();
});
