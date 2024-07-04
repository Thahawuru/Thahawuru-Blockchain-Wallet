const express = require('express');
const { getIdentity, setIdentity, updateIdentity } = require('../controllers/identityController');

const router = express.Router();

router.get('/:identityNumber', getIdentity);
router.post('/', setIdentity);
router.put('/update', updateIdentity);

module.exports = router;
