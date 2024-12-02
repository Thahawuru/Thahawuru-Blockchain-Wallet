const { pool } = require("../../database/db");
const Log = require("../../logs/model/logSchema");

const getApiKeysForUser = async (email) => {
  const query = `
      SELECT api_keys.api_key
      FROM users
      INNER JOIN api_users ON users.user_id = api_users.user_id
      INNER JOIN api_keys ON api_users.api_user_id = api_keys.api_user_id
      WHERE users.email = $1;
    `;

  try {
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) {
      throw new Error("No API keys found for this user");
    }
    return result.rows.map((row) => row.api_key);
  } catch (error) {
    throw new Error("Error fetching API keys for the user: " + error.message);
  }
};

const getTotalRequests = async (req, res) => {
  try {
    const { email } = req.params;

    const apiKeys = await getApiKeysForUser(email);

    const apiKeysWithRequests = [];
    let total_requests = 0;
    for (let apiKey of apiKeys) {
      const requestCount = await Log.countDocuments({ apiKey });
      apiKeysWithRequests.push({
        api_key: apiKey,
        request_count: requestCount,
      });
      total_requests += requestCount;
    }

    res.status(200).json({
      message: "Total request number fetched successfully",
      total_requests: total_requests,
    });
  } catch (error) {
    console.error("Error fetching API keys for user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRequestToday = async (req, res) => {
  try {
    const { email } = req.params;
    const apiKeys = await getApiKeysForUser(email);

    if (!apiKeys || apiKeys.length === 0) {
      return res.status(404).json({
        message: "No API keys found for the given email",
        total_requests: 0,
        apiKeysWithRequests: [],
      });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
    const logs = await Log.aggregate([
      {
        $match: {
          apiKey: { $in: apiKeys },
          timestamp: { $gte: startOfToday, $lt: startOfTomorrow },
        },
      },
      {
        $group: {
          _id: "$apiKey",
          requestCount: { $sum: 1 },
        },
      },
    ]);
    const apiKeysWithRequests = apiKeys.map((apiKey) => {
      const log = logs.find((entry) => entry._id === apiKey);
      return {
        api_key: apiKey,
        today_Requests: log ? log.requestCount : 0,
      };
    });
    const total_requests = apiKeysWithRequests.reduce(
      (sum, apiKeyData) => sum + apiKeyData.today_Requests,
      0
    );
    res.status(200).json({
      message: "Requests for today fetched successfully",
      total_requests,
      apiKeysWithRequests,
    });
  } catch (error) {
    console.error("Error fetching today's requests:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAverageResponseTime = async (req, res) => {
  try {
    const { email } = req.params;

    const apiKeys = await getApiKeysForUser(email);

    const apiKeysWithResponseTime = [];
    let total_response_time = 0;
    let total_requests = 0;
    for (let apiKey of apiKeys) {
      const requests = await Log.find({ apiKey });
      let response_time = 0;
      for (let request of requests) {
        response_time += request.responseTime;
      }
      apiKeysWithResponseTime.push({
        api_key: apiKey,
        average_response_time: response_time / requests.length,
      });
      total_response_time += response_time;
      total_requests += requests.length;
    }

    res.status(200).json({
      message: "Average response time fetched successfully",
      average_response_time: total_response_time / total_requests,
    });
  } catch (error) {
    console.error("Error fetching API keys for user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getMonthlyResponseTime = async (req, res) => {
    try {
      const { email } = req.params;
      const apiKeys = await getApiKeysForUser(email);
  
      if (apiKeys.length === 0) {
        return res.status(404).json({ error: 'No API keys found for this user' });
      } 
      // Step 2: Fetch response times for all keys and combine results
    const responseTimes = await Log.aggregate([
        {
          $match: {
            apiKey: { $in: apiKeys },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$timestamp" },
              month: { $month: "$timestamp" },
            },
            averageResponseTime: { $avg: "$responseTime" },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);
      const formattedResponse = responseTimes.map((item) => ({
        year: item._id.year,
        month: item._id.month,
        responseTime: item.averageResponseTime,
      }));
      res.status(200).json({
        message: "Monthly response times fetched successfully",
        formattedResponse,
      });
    } catch (error) {
      console.error("Error fetching monthly response times:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const getMonthlyUsageOfRequests = async (req, res) => {
    try {
      const { email } = req.params;
      const apiKeys = await getApiKeysForUser(email);
  
      if (apiKeys.length === 0) {
        return res.status(404).json({ error: 'No API keys found for this user' });
      }
      const usage = await Log.aggregate([
        { $match: { apiKey: { $in: apiKeys } } },
        {
          $group: {
            _id: { year: { $year: "$timestamp" }, month: { $month: "$timestamp" } },
            total_requests: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);
      const monthlyUsage = usage.map((entry) => ({
        year: entry._id.year,
        month: entry._id.month,
        total_requests: entry.total_requests,
      }));
  
      res.status(200).json({
        message: 'Monthly usage of requests fetched successfully',
        monthly_usage: monthlyUsage,
      });
    } catch (error) {
      console.error("Error fetching monthly usage of requests:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  

module.exports = {
  getTotalRequests,
  getRequestToday,
  getAverageResponseTime,
  getMonthlyResponseTime,
  getMonthlyUsageOfRequests,
};
