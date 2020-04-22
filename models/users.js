const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    permission: {
        chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
        news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
        settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
    },
});

// Сравнить пороли
userSchema.methods.comparePassword = function (candidatePassword) {
    const password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};

module.exports = model("User", userSchema);
