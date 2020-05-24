const mongoose = require("mongoose");

const deviceHistorySchema = new mongoose.Schema(
  {
    deviceId: mongoose.ObjectId,
    fullness: Number,
    isActive: { from: Date, to: Date },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("DeviceHistory", deviceHistorySchema);
