const express = require("express");
const router = express.Router();
const DeviceHistory = require("../models/DeviceHistory");
const { authenticate } = require("../middlewares/passport");

router.get("/:deviceId", authenticate, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const history = await DeviceHistory.find({ deviceId });
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.delete("/:deviceHistory", async (req, res) => {
  try {
    const { deviceHistory } = req.params;
    const deletedHistory = await DeviceHistory.findByIdAndDelete(deviceHistory);
    res.status(200).json({ deletedHistory });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
