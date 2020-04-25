// Инициализация приложения
const app = require("./loaders/express")();

// Порт сервера
const port = require("./config/config").PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
