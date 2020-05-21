const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  owner: mongoose.ObjectId,
  location: [Number, Number],
  placeName: String,
  fullness: Number,
  isActive: Boolean,
});

module.exports = mongoose.model("Device", deviceSchema);
