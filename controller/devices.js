const deviceModel = require("../models/devices");

module.exports = {
    show: async (req, res) => {
        try {
            const { email } = req.user;

            const devices = await deviceModel.find({ owner: email });

            res.status(200).json({
                data: devices,
                message: "Успешно загрузились все устройства BinEco!",
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: "Произошла какая-та ошибка",
            });
        }
    },

    create: async (req, res) => {
        try {
            const { x, y, fullness, isActive, owner } = req.body;
            console.log(req.body);
            const data = {
                location: { x, y },
                fullness,
                isActive,
                owner,
            };

            const newDevice = new deviceModel(data);

            await newDevice.save();
            res.status(201).json({
                success: true,
                message: "BinEco успешно создан!",
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: "Произошла какая-та ошибка",
            });
        }
    },

    update: async (req, res) => {
        try {
            const { x, y, fullness, isActive, _id } = req.body;

            const data = {
                location: { x, y },
                fullness,
                isActive,
            };

            const updatedDevice = await deviceModel.findByIdAndUpdate(
                _id,
                data,
                {
                    new: true,
                }
            );

            res.status(201).json({
                data: updatedDevice,
                message: "Данные BinEco успешно обновлены!",
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: "Произошла какая-та ошибка",
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { _id } = req.body;

            const deletedDevice = await deviceModel.findByIdAndDelete(_id);

            res.status(200).json({
                data: deletedDevice,
                message: "Успешно удалено!",
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: "Произошла какая-та ошибка",
            });
        }
    },
};
