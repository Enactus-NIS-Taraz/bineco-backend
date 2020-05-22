const express = require("express");
const router = express.Router();
const Device = require("../models/Device");

router.patch("/set-fullness/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const fullness = req.body.fullness;
    const updatedDevice = await Device.findByIdAndUpdate(
      deviceId,
      { fullness },
      {
        new: true,
      }
    );
    res.status(200).json({ updatedDevice });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message || "Произошла какая-та ошибка",
    });
  }
});

module.exports = router;
