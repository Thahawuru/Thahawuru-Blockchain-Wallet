const express = require('express');
const { getLicense, setLicense, updateLicense } = require('../controllers/licenseController');

const router = express.Router();

router.get('/:address', getLicense);
router.put('/', setLicense);
router.post('/update', updateLicense);

module.exports = router;
