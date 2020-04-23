const controllerLogin = require("../controller/login");
const controllerRegister = require("../controller/register");
const { authenticate } = require("../middlewares/passport");
// Routes
module.exports = (app) => {
    app.get("/", (req, res) => res.send("Hello from Express!"));
    app.post("/login", controllerLogin);
    app.post("/register", controllerRegister);
    app.get("/secret", authenticate, (req, res) => res.json({message: "Secret page!"}));
};
