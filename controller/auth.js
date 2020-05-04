const UserModel = require("../models/users");
const genToken = require("../helpers/token");
const { validationResult } = require("express-validator");
module.exports = {
    login: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ email });
            const isPasswordMatch = await user.comparePassword(password);

            if (!user || !isPasswordMatch) {
                return res.status(400).json({
                    error: true,
                    message: "Неверный логин или пороль",
                });
            }

            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            };

            const token = genToken(payload);

            res.status(200).json({ ...payload, ...token });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: true,
                message: error.message || "Произошла какая-та ошибка",
            });
        }
    },

    register: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, password, firstName, lastName } = req.body;

        try {
            const user = await UserModel.findOne({ email });

            if (user) {
                return res.status(400).json({
                    message:
                        "Такой пользователь существует, пожалуйста попробуйте ещё!",
                });
            }

            const newUser = new UserModel({
                email,
                firstName,
                lastName,
                passwordHash: password,
            });

            await newUser.save();

            res.status(201).json({ newUser });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: true,
                message: error.message || "Произошла какая-та ошибка",
            });
        }
    },
};
