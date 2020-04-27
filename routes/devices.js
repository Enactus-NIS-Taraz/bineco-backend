module.exports = (app) => {
    app.get("/api/v1/devices", deviceController.show);
    app.post("/api/v1/devices/create", deviceController.create);
    app.patch("/api/v1/devices/update", deviceController.update);
    app.delete("/api/v1/devices/delete", deviceController.delete);
};
