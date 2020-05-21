const express = require("express");
const router = express.Router();
const deviceModel = require("../models/devices");
const { validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const { email } = req.user;

    const devices = await deviceModel.find({ owner: email });

    res.status(200).json({ devices });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { location, fullness, isActive, owner } = req.body;

    const data = {
      location,
      fullness,
      isActive,
      owner,
    };

    const newDevice = new deviceModel(data);
    await newDevice.save();

    res.status(201).json({ newDevice });
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
    const { location, fullness, isActive, _id } = req.body;

    const data = {
      location,
      fullness,
      isActive,
    };

    const updatedDevice = await deviceModel.findByIdAndUpdate(_id, data, {
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

    const deletedDevice = await deviceModel.findByIdAndDelete(deviceId);

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
