const UserModel = require("../models/users");
const genToken = require("../helpers/token");
module.exports = async (req, res) => {
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
};
