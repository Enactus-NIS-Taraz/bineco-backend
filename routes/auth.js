const authController = require("../controller/auth");

module.exports = (app) => {
    app.post("/api/v1/login", authController.login);
    app.post("/api/v1/register", authController.register);
};
