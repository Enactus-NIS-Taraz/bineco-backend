const UserModel = require("../models/users");
const genToken = require("../helpers/token");
const validate = require("../helpers/validate");

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            const isPasswordMatch = await user.comparePassword(password);

            if (!user || !isPasswordMatch) {
                return res
                    .status(400)
                    .json({ message: "Неверный email или пороль" });
            }

            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            };

            const token = genToken(payload);

            return res.status(200).json({ ...payload, ...token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    },

    register: async (req, res) => {
        const { email, password, firstName, lastName } = req.body;

        try {
            await validate.register(req.body);

            const newUser = new UserModel({
                email,
                firstName,
                lastName,
                passwordHash: password,
            });

            await newUser.save();

            res.status(201).json({
                data: newUser,
                message: "Пользователь создан",
            });
        } catch (error) {
            const status = error.errStatus || 500;
            const message = error.errMessage || "Ошибка сервера";

            res.status(status).json({ message: message });
        }
    },
};
