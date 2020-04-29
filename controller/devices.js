const deviceModel = require("../models/devices");

module.exports = {
    show: async (req, res) => {
        try {
            const { email } = req.body;

            const devices = await deviceModel.find({ owner: email });

            res.status(200).json(devices);
        } catch (error) {
            res.status(error.status || 500).json({ message: "Ошибка сервера" });
        }
    },
    create: async (req, res) => {
        try {
            const { x, y, fullness, active, owner } = req.body;
            const data = {
                location: { x, y },
                status: { fullness, active },
                owner,
            };
            const newDevice = new deviceModel(data);

            await newDevice.save();
            res.status(201).json({ success: true });
        } catch (error) {
            res.status(error.status || 500).json({ message: "Ошибка сервера" });
        }
    },
    update: async () => {},
    delete: async () => {},
};
