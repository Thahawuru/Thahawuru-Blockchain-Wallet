const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    apiKey: { type: String, required: false },
    route: { type: String, required: true },
    responseTime: { type: Number, required: true },
    statusCode: { type: Number, required: true },
    statusMessage: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;

