const mongoose = require("mongoose");

const workplaceSchema = new mongoose.Schema({
  name: String,
  users: Array,
  devices: Array,
});

module.exports = mongoose.model("Workplace", workplaceSchema);
