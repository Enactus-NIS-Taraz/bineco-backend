const UserModel = require("../models/users");
const genToken = require("../helpers/token");
module.exports = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const isPasswordMatch = UserModel.comparePassword(password);

    if (!user || !isPasswordMatch) {
        return res.status(400).json({ message: "Неверный email или пороль" });
    }

    const token = genToken(req.body);

    return res.status(200).json({ user, ...token });
};
