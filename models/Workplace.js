const mongoose = require("mongoose");

const workplaceSchema = new mongoose.Schema({
  name: String,
  users: [String],
  devices: [String],
});

module.exports = mongoose.model("Workplace", workplaceSchema);
