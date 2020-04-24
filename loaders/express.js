const express = require("express");
const connectDB = require("./db");
const auth = require("../middlewares/passport");
const bodyParser = require("./body-parser");
const router = require("../routes/index");

module.exports = () => {
    // Создание экземпляра приложения
    const app = express();
    // Подключения к базе данных
    connectDB();
    // Парсинг формы
    bodyParser(app);
    // Инициализация passport
    auth.initialize();
    // Подключения маршрутизаторов
    router(app);

    return app;
};
