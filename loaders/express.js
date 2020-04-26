const express = require("express");
const cors = require("./cors");
const connectDB = require("./db");
const bodyParser = require("./bodyParser");
const auth = require("../middlewares/passport");
const router = require("../routes/index");

module.exports = () => {
  // Создание экземпляра приложения
  const app = express();
  // Настройка CORS
  cors(app);
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
