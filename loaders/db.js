const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const config = require('../config/config');

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
