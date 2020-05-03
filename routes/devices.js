const deviceController = require("../controller/devices");

module.exports = (app) => {
    app.get("/api/v1/devices", deviceController.show);
    app.post("/api/v1/devices/create", deviceController.create);
    app.patch("/api/v1/devices/:deviceId", deviceController.update);
    app.delete("/api/v1/devices/:deviceId", deviceController.delete);
};
