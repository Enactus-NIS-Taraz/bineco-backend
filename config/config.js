// Подключения dotenv файла
require("dotenv").config();

// Config
module.exports = {
    // PORT Server
    PORT: process.env.PORT || 3000,

    // Secret key
    SECRET_KEY: process.env.SECRET_KEY || "very secret key:)",

    // Database url
    DB_ADDRESS: process.env.DB_ADDRESS
};
