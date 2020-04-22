const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const dbAdress = require('../config/config').DB_ADDRESS;
console.log(dbAdress);
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

module.exports = () => {
    mongoose
        .connect(dbAdress, options)
        .then(() => {
            console.log("MongoDB connected...");
        })
        .catch((err) => {
            console.log(err);
        });
};
