const express = require('express');
const { getTotalAPICalls } = require('../controllers/adminDashboard');
const {APIBuyings} = require('../controllers/adminDashboard');
const {getDailyRequests} = require('../controllers/adminDashboard');

const router = express.Router();

router.get('/total-api-calls', getTotalAPICalls);
router.get('/api-data-types', APIBuyings);
router.get('/daily-requests', getDailyRequests);

module.exports = router;