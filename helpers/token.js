const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

// Генерация токенов
module.exports = (payload) => {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20m" });
    const verifyToken = jwt.verify(token, SECRET_KEY);

    return {
        accessToken: "Bearer " + token,
        accessTokenExpiredAt: verifyToken.exp * 1000,
    };
};
