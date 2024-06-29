const express = require('express');
const { getIdentity, setIdentity, updateIdentity } = require('../controllers/identityController');

const router = express.Router();

router.get('/:address', getIdentity);
router.put('/', setIdentity);
router.post('/update', updateIdentity);

module.exports = router;
