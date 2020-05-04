const deviceController = require("../controller/devices");
const { authenticate } = require("../middlewares/passport");
const { body, param } = require("express-validator");

module.exports = (app) => {
    app.get("/api/v1/devices", authenticate, deviceController.show);
    app.post(
        "/api/v1/devices/create",
        authenticate,
        [
            body("location.x").isNumeric(),
            body("location.y").isNumeric(),
            body("fullness").isNumeric(),
            body("isActive").isBoolean(),
            body("owner").isEmail(),
        ],
        deviceController.create
    );
    app.patch(
        "/api/v1/devices/update",
        authenticate,
        [
            body("location.x").isNumeric(),
            body("location.y").isNumeric(),
            body("fullness").isNumeric(),
            body("isActive").isBoolean(),
            body("_id").not().isEmpty(),
        ],
        deviceController.update
    );
    app.delete(
        "/api/v1/devices/:deviceId",
        authenticate,
        [param("deviceId").exists().not().isEmpty()],
        deviceController.delete
    );
};
