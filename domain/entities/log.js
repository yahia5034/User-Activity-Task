const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  action: { type: String, index: true },
  timestamp: { type: Date, index: true },
});

module.exports = mongoose.model("Log", LogSchema);