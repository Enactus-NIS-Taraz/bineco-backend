const mongoose = require("mongoose");

const workplaceSchema = new mongoose.Schema({
  name: String,
  users: [mongoose.ObjectId],
  devices: [mongoose.ObjectId],
  admins: [mongoose.ObjectId],
});

workplaceSchema.methods.isAdmin = function (user) {
  const admins = this.admins;

  if (admins.includes(user._id)) {
    return true;
  }
  
  return false;
};

module.exports = mongoose.model("Workplace", workplaceSchema);
