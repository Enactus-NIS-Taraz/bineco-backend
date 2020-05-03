const deviceController = require("../controller/devices");
const { authenticate } = require("../middlewares/passport");

module.exports = (app) => {
    app.get("/api/v1/devices", authenticate, deviceController.show);
    app.post("/api/v1/devices/create", authenticate, deviceController.create);
    app.patch(
        "/api/v1/devices/:deviceId",
        authenticate,
        deviceController.update
    );
    app.delete(
        "/api/v1/devices/:deviceId",
        authenticate,
        deviceController.delete
    );
};
