const deviceModel = require("../models/devices");

module.exports = {
    show: async () => {},
    create: async (req, res) => {
        const { x, y, fullness, active, owner } = req.body;
        const data = {
            location: { x, y },
            status: { fullness, active },
            owner,
        };
        const newDevice = new deviceModel(data);

        await newDevice.save();
        res.status(201).json({ success: true });
    },
    update: async () => {},
    delete: async () => {},
};
