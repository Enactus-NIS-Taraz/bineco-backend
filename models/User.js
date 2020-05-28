const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, minlength: 7 },
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.pre("save", function (next) {
  bcrypt.hash(this.passwordHash, 10, (err, hash) => {
    this.passwordHash = hash;
    next();
  });
});

userSchema.pre("update", function (next) {
  bcrypt.hash(this.passwordHash, 10, (err, hash) => {
    this.passwordHash = hash;
    next(this.passwordHash);
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const password = this.passwordHash;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

module.exports = model("User", userSchema);
