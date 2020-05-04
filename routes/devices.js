const deviceController = require("../controller/devices");
const { authenticate } = require("../middlewares/passport");
const { check } = require("express-validator");

module.exports = (app) => {
    app.get("/api/v1/devices", authenticate, deviceController.show);
    app.post(
        "/api/v1/devices/create",
        authenticate,
        [
            check("x").isNumeric(),
            check("y").isNumeric(),
            check("fullness").isNumeric(),
            check("isActive").isBoolean(),
            check("owner").isEmail(),
        ],
        deviceController.create
    );
    app.patch(
        "/api/v1/devices/update",
        authenticate,
        [
            check("x").isNumeric(),
            check("y").isNumeric(),
            check("fullness").isNumeric(),
            check("isActive").isBoolean(),
            check("owner").isEmail(),
            check("_id").exists().not().isEmpty(),
        ],
        deviceController.update
    );
    app.delete(
        "/api/v1/devices/:deviceId",
        authenticate,
        [check("deviceId").exists().not().isEmpty()],
        deviceController.delete
    );
};
