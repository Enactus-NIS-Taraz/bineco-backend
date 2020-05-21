const app = require("./loaders/app")();
const config = require("./config/config");

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
