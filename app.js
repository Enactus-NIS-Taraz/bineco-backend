const app = require("./loaders/app")();

const port = require("./config/config").PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
