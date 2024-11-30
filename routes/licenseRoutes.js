// routes/licenseRoutes.js
const express = require('express');
const { getLicenseByIdentityNumber } = require('../controllers/licenseController');
const {validateApiKeyMiddleware} = require('../middleware/validateApiKeyMiddleware');

const router = express.Router();

// Assuming 'license' is the type for license-related API requests
router.get('/:identityNumber', validateApiKeyMiddleware(2), getLicenseByIdentityNumber);

module.exports = router;
