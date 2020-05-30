const { accessibleRecordsPlugin } = require("@casl/mongoose");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.plugin(accessibleRecordsPlugin);

const config = require("../config/config");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = () => {
  mongoose
    .connect(config.dbUrl, options)
    .then(() => {
      console.log("MongoDB connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};
