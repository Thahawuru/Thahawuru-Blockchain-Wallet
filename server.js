const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const identityRoutes = require("./routes/identityRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const setupRoutes = require("./routes/setupRoutes");

const developerDashboardRoutes = require('./analytics/routes/developerDashboard');
const adminDashboardRoutes = require('./analytics/routes/adminDashboard');

const logRoutes =require('./logs/routes/logRoutes');

const { connectToDatabase } = require('./database/db');
connectToDatabase();

const connectDB = require('./database/logs');
connectDB();

require("./schedule/shedule");

const app = express();
const port = process.env.PORT || 3010;

app.use(bodyParser.json());

app.use("/api/identity", identityRoutes);
app.use("/api/license", licenseRoutes);
app.use("/api/setup", setupRoutes);

app.use('/developer/developer-dashboard', developerDashboardRoutes);
app.use('/admin/admin-dashboard', adminDashboardRoutes);

app.use('/logs', logRoutes);



app.listen(port, '127.0.0.1', async () => {
  console.log(`Server running on http://localhost:${port}`);
});
