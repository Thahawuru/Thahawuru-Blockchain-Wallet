const express = require('express');
const { getAllLogs } = require('../controllers/logController');

const router = express.Router();

router.get('/get-all-logs', getAllLogs);

module.exports = router;
