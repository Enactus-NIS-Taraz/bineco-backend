const config = require("../config/config");
const auth = require("../controllers/auth");
const devices = require("../controllers/devices");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("Hello from Express!"));
  app.use(config.prefix + "/auth", auth);
  app.use(config.prefix + "/devices", devices);
};
