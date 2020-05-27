const mongoose = require("mongoose");

const workplaceSchema = new mongoose.Schema({
  name: String,
  users: [mongoose.ObjectId],
  devices: [mongoose.ObjectId],
});

module.exports = mongoose.model("Workplace", workplaceSchema);
