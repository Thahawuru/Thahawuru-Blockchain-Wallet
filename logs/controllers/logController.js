const Log = require('../model/logSchema');

// Controller function to retrieve all logs
const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve logs.',
      error: error.message,
    });
  }
};

module.exports = {
  getAllLogs,
};
