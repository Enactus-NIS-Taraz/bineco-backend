const config = require("../config/config");
const auth = require("../controllers/auth");
const devices = require("../controllers/devices");
const hardware = require("../controllers/hardware");
const deviceHistory = require('../controllers/devicesHistory');

module.exports = (app) => {
  app.get("/", (req, res) => res.send("Hello from Express!"));
  app.use(config.prefix + "/auth", auth);
  app.use(config.prefix + "/devices", devices);
  app.use(config.prefix + "/hardware", hardware);
  app.use(config.prefix + "/devices-history", deviceHistory);
};
