const controllerLogin = require("../controller/login");
// Routes
module.exports = (app) => {
    app.get("/", (req, res) => res.send("Hello from Express!"));
    app.post("/login", controllerLogin);
};
