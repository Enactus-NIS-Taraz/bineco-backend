const controllerLogin = require("../controller/login");
const controllerRegister = require('../controller/register');
// Routes
module.exports = (app) => {
    app.get("/", (req, res) => res.send("Hello from Express!"));
    app.post("/login", controllerLogin);
    app.post("/register", controllerRegister);
};
