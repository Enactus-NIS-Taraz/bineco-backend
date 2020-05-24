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

router.patch("/:workplaceId", async (req, res) => {
  try {
    const { workplaceId } = req.params;

    const updatedWorkplace = await Workplace.findByIdAndUpdate(
      workplaceId,
      req.body,
      { new: true }
    );

    res.status(200).json({ updatedWorkplace });
  } catch (error) {}
});
module.exports = router;
