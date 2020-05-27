const express = require("express");
const cors = require("./cors");
const connectDB = require("./db");
const bodyParser = require("./bodyParser");
const auth = require("./passport");
const router = require("../routes/router");

module.exports = () => {
  const app = express();
  cors(app);
  connectDB();
  bodyParser(app);
  auth();
  router(app);
  return app;
};
