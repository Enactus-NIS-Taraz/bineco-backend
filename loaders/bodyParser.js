const bodyParser = require("body-parser");

module.exports = (app) => {
    // Parsing form-data
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};
