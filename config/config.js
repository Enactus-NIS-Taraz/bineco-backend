require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY || "very secret key:)",
    dbUrl: process.env.DB_ADDRESS
};
