const express = require('express');
const { getLicenseByIdentityNumber} = require('../controllers/licenseController');

const router = express.Router();

router.get('/:identityNumber', getLicenseByIdentityNumber);

module.exports = router;
 