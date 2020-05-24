const express = require("express");
const router = express.Router();
const Workplace = require("../models/Workplace");

router.get("/", async (req, res) => {
  try {
    const workplace = await Workplace.find({});

    res.status(200).json({ workplace });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const workplace = new Workplace({ name });
    await workplace.save();

    res.status(201).json({ workplace });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
