const { Schema, model } = require("mongoose");

const devicesSchema = new Schema({
    location: { type: Object, required: true },
    status: { type: Object, required: true },
    owner: { type: String, required: true },
});

module.exports = model("Device", devicesSchema);
