const UserModel = require("../models/users");
const genToken = require("../helpers/token");

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
            const candidateUser = await UserModel.findOne({ email });

            if (candidateUser) {
                res.status(400).json({
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

            res.status(200).json({
                data: newUser,
                message: "Пользователь создан",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    },
};
