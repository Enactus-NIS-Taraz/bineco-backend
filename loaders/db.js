const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Database url
const dbAdress = require('../config/config').DB_ADDRESS;

// Database options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

module.exports = () => {
    // Connecting to database
    mongoose
        .connect(dbAdress, options)
        .then(() => {
            console.log("MongoDB connected...");
        })
        .catch((err) => {
            console.log(err);
        });
};
