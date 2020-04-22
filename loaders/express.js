const express = require("express");
const connectDB = require("./db");
const auth= require("../middlewares/passport");
module.exports = () => {
    // Создание экземпляра приложения
    const app = express();
    // Подключения к базе данных
    connectDB();
    // Парсинг формы
    const bodyParser = require("../middlewares/body-parser");
    bodyParser(app);
    // Инициализация passport
    auth.initialize();
    // Подключения маршрутизаторов
    const router = require("../routes/index");
    router(app);

    return app;
};
