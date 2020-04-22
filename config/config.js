// Подключения dotenv файла
require("dotenv").config();

// Config
module.exports = {
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "very secret key:)",
    DB_ADDRESS: process.env.DB_ADDRESS
};
