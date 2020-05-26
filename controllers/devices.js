const express = require("express");
const router = express.Router();
const Device = require("../models/Device");
const { validationResult } = require("express-validator");
const { authenticate } = require("../middlewares/passport");

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const devices = await Device.find({ ownerId: userId });
    res.status(200).json({ devices });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.post("/", authenticate, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { location, placeName, fullness, isActive } = req.body;
    const ownerId = req.user._id;

    const data = {
      location,
      placeName,
      fullness,
      isActive,
      ownerId,
    };

    const device = new Device(data);
    await device.save();

    res.status(201).json({ device });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message || "Произошла какая-та ошибка",
    });
  }
});

router.patch("/:deviceId", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { deviceId } = req.params;
    const { location, isActive, placeName } = req.body;

    const data = {
      location,
      isActive,
      placeName,
    };

    const updatedDevice = await Device.findByIdAndUpdate(deviceId, data, {
      new: true,
    });

    res.status(200).json({ updatedDevice });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message || "Произошла какая-та ошибка",
    });
  }
});

router.delete("/:deviceId", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { deviceId } = req.params;

    const deletedDevice = await Device.findByIdAndDelete(deviceId);

    res.status(200).json({ deletedDevice });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message || "Произошла какая-та ошибка",
    });
  }
});

module.exports = router;
