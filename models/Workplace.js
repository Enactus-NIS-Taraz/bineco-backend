const mongoose = require("mongoose");

const workplaceSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    users: [mongoose.ObjectId],
    devices: [mongoose.ObjectId],
    admins: [mongoose.ObjectId],
    author: mongoose.ObjectId,
  },
  { timestamps: { createdAt: "created_at" } }
);

workplaceSchema.methods.isAdmin = function (user) {
  const admins = this.admins;

  if (admins.includes(user._id)) {
    return true;
  }

  return false;
};

workplaceSchema.methods.isAuthor = function (user) {
  const author = this.author;

  if (author === user) {
    return true;
  }

  return false;
};

module.exports = mongoose.model("Workplace", workplaceSchema);
