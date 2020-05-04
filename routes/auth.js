const authController = require("../controller/auth");
const { check } = require("express-validator");
module.exports = (app) => {
    app.post(
        "/api/v1/login",
        [check("email").isEmail(), check("password").isLength({ min: 7 })],
        authController.login
    );
    app.post(
        "/api/v1/register",
        [
            check("email").trim().isEmail().normalizeEmail(),
            check("password").trim().isLength({ min: 7 }),
            check("firstName").trim().isLength({ min: 2 }),
            check("lastName").trim().isLength({ min: 2 }),
        ],
        authController.register
    );
};
