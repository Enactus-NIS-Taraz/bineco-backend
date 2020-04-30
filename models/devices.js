const { Schema, model } = require("mongoose");

const devicesSchema = new Schema({
    deviceId: String,
    location: {
        x: String,
        y: String,
    },
    status: {
        fullness: String,
        active: Boolean,
    },
    owner: { type: String },
});

module.exports = model("Device", devicesSchema);
