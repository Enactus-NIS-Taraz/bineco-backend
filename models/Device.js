const { Schema, model } = require("mongoose");

const devicesSchema = new Schema({
    location: {
        x: Number,
        y: Number,
    },
    fullness: String,
    isActive: Boolean,
    owner: String,
});

module.exports = model("Device", devicesSchema);
