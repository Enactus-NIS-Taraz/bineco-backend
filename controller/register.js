const UserModel = require("../models/users");
module.exports = async (req, res) => {
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

        res.status(500).json({
            data: newUser,
            message: "Пользователь создан",
        });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
