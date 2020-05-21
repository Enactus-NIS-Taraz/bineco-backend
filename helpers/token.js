const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (payload) => {
    const token = jwt.sign(payload, config.secretKey, { expiresIn: "20m" });
    const verifyToken = jwt.verify(token, config.secretKey);

    return {
        accessToken: "Bearer " + token,
        accessTokenExpiredAt: verifyToken.exp * 1000,
    };
};
