const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const identityRoutes = require('./routes/identityRoutes');
const licenseRoutes = require('./routes/licenseRoutes');

const app = express();
const port = 3010;

app.use(bodyParser.json());

app.use('/api/identity', identityRoutes);
app.use('/api/license', licenseRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
