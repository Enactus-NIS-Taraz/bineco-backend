const express = require("express");

module.exports = () => {
    // Создание экземпляра приложения
    const app = express();

    // Парсинг формы
    const bodyParser = require("../middlewares/body-parser");
    bodyParser(app);

    // Подключения маршрутизаторов
    const router = require("../routes/index");
    router(app);

    return app;
};
