const express = require("express");
const router = express.Router();
const DeviceHistory = require("../models/DeviceHistory");
const { authenticate } = require("../middlewares/passport");

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await DeviceHistory.find({ deviceId: userId });
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
