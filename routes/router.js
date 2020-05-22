const config = require("../config/config");
const auth = require("../controllers/auth");
const devices = require("../controllers/devices");
const hardware = require("../controllers/hardware");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("Hello from Express!"));
  app.use(config.prefix + "/auth", auth);
  app.use(config.prefix + "/devices", devices);
  app.use(config.prefix + "/hardware", hardware);
};
