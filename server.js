const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const identityRoutes = require("./routes/identityRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const setupRoutes = require("./routes/setupRoutes");
require("./schedule/shedule");

const app = express();
const port = 3010;

app.use(bodyParser.json());

app.use("/api/identity", identityRoutes);
app.use("/api/license", licenseRoutes);
app.use("/api/setup", setupRoutes);

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
});
