const { authenticate } = require("../middlewares/passport");

module.exports = (app) => {
    app.get("/", (req, res) => res.send("Hello from Express!"));
    require("./auth")(app);
    require('./devices')(app);
    app.get("/secret", authenticate, (req, res) =>
        res.json({ message: "Secret page!" })
    );
};
