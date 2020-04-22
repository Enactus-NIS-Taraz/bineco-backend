const express = require("express");
const connectDB = require('./db');
module.exports = () => {
    // Создание экземпляра приложения
    const app = express();
    // Подключения к базе данных
    connectDB();
    // Парсинг формы
    const bodyParser = require("../middlewares/body-parser");
    bodyParser(app);

    // Подключения маршрутизаторов
    const router = require("../routes/index");
    router(app);

    return app;
};
