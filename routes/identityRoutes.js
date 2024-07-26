const express = require('express');
const { getIdentity, setIdentity, updateIdentity } = require('../controllers/identityController');

const router = express.Router();

router.get('/:identityNumber', getIdentity);

module.exports = router;
