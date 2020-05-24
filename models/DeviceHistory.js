const mongoose = require("mongoose");

const deviceHistorySchema = new mongoose.Schema(
  {
    deviceId: mongoose.ObjectId,
    fullness: Number,
    isActive: Boolean,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("DeviceHistory", deviceHistorySchema);
