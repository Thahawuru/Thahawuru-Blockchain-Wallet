//get all requests from all users
const Log = require("../../logs/model/logSchema");
const { pool } = require("../../database/db");
const getTotalAPICalls = async (req, res) => {
    try {
        const totalRequests = await Log.countDocuments();
        res.status(200).json({ totalRequests });
    } catch (error) {
        console.error("Error fetching Total ApI Calls:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//get All API Buyings due to API_Data_Type in PostgreSql
const APIBuyings = async (req, res) => {
    const query = `SELECT apidata_type, COUNT(apidata_type) AS count FROM api_keys WHERE apistatus = 'ACTIVE'
     GROUP BY apidata_type ORDER BY count DESC;`;
    try {
        const result = await pool.query(query);
        
        if (result.rows.length === 0) {
            throw new Error("No API keys types found for this user");
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching Total ApI Calls:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getDailyRequests = async (req, res) => {
    try {
        const dailyRequests = await Log.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    request_count: { $count: {} }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);

        if (!dailyRequests || dailyRequests.length === 0) {
            return res.status(404).json({ message: "No API requests found." });
        }
        const formattedResults = dailyRequests.map(item => ({
            date: item._id,
            request_count: item.request_count
        }));

        res.status(200).json({
            message: "Daily API requests fetched successfully.",
            dailyRequests: formattedResults,
        });
    } catch (error) {
        console.error("Error fetching daily requests:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    getTotalAPICalls,
    APIBuyings,
    getDailyRequests
};
