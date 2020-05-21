const express = require("express");
const cors = require("./cors");
const connectDB = require("./db");
const bodyParser = require("./bodyParser");
const auth = require("../middlewares/passport");
const router = require("../routes/index");

module.exports = () => {
  const app = express();
  cors(app);
  connectDB();
  bodyParser(app);
  auth.initialize();
  router(app);
  return app;
};
