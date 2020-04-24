const authController = require("../controller/auth");

module.exports = (app) => {
    app.post("/login", authController.login);
    app.post("/register", authController.register);
};
