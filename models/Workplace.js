const mongoose = require("mongoose");

const workplaceSchema = new mongoose.Schema({
  name: String,
  users: [mongoose.ObjectId],
  devices: [String],
});

module.exports = mongoose.model("Workplace", workplaceSchema);
