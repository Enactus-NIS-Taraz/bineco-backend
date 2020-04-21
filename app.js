// Инициализация приложения
const app = require("./loaders/express")();

// Создание экземпляра сервера
const http = require("http").createServer(app);

// Порт сервера
const port = require("./config/config").PORT;

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
