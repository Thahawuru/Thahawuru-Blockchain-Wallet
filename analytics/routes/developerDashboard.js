// routes/requestRoutes.js
const express = require('express');
const { getTotalRequests } = require('../controllers/developerDashboard');
const { getRequestToday } = require('../controllers/developerDashboard');
const { getAverageResponseTime } = require('../controllers/developerDashboard');
const { getMonthlyResponseTime } = require('../controllers/developerDashboard');

const router = express.Router();

// Route to get total requests per developer
router.get('/total-requests/:email', getTotalRequests);

router.get('/today-requests/:email', getRequestToday);

router.get('/average-response-time/:email', getAverageResponseTime);

router.get('/monthly-response-time/:email', getMonthlyResponseTime);

module.exports = router;
