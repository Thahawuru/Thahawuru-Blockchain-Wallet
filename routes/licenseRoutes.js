const express = require('express');
const { getLicense, setLicense, updateLicense } = require('../controllers/licenseController');

const router = express.Router();

router.get('/:address', getLicense);
router.post('/', setLicense);
router.put('/update', updateLicense);

module.exports = router;
